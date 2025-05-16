import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {
  ClaimTopicsRegistry,
  TrustedIssuersRegistry,
  IdentityRegistryStorage,
  IdentityRegistry,
  Compliance,
  ERC3643Token,
  MockUSDC,
  VestingManager,
  DividendManager,
  SecondaryMarket,
  RealEstateSecurityManager,
  MockIdentity,
  MockForteRulesEngine,
  MockFortePayKYC,
  PrimaryMarketDistribution,
} from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

// Constants for testing
const KYC_CLAIM_TOPIC = 42;
const COUNTRY_US = 840; // US country code (ISO 3166-1 numeric)
const COUNTRY_UK = 826; // UK country code
const DIVIDEND_RATE = 500; // 5%
const PROPERTY_VALUE = ethers.parseEther("1000000"); // $1M property value
const TOKEN_AMOUNT = ethers.parseEther("1000"); // 1000 tokens
const STABLECOIN_DECIMALS = 6; // USDC has 6 decimals
const BASIS_POINTS_DENOMINATOR = 10000;

// Time constants
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

// Distribution constants
const DISTRIBUTION_START_DELAY = 3600; // 1 hour from now
const DISTRIBUTION_DURATION = 604800; // 1 week
const TOKEN_PRICE = ethers.parseUnits("1000", STABLECOIN_DECIMALS); // $1000 per token
const MIN_INVESTMENT = ethers.parseUnits("5000", STABLECOIN_DECIMALS); // $5000 min investment
const MAX_INVESTMENT = ethers.parseUnits("100000", STABLECOIN_DECIMALS); // $100k max investment

// FortePay KYC Levels (matching enum values)
const KYC_LEVEL_NONE = 0;
const KYC_LEVEL_BASIC = 1;
const KYC_LEVEL_ADVANCED = 2;
const KYC_LEVEL_ACCREDITED = 3;

describe("Primary Market Distribution", function () {
  // Contract instances
  let claimTopicsRegistry: ClaimTopicsRegistry;
  let trustedIssuersRegistry: TrustedIssuersRegistry;
  let identityRegistryStorage: IdentityRegistryStorage;
  let identityRegistry: IdentityRegistry;
  let compliance: Compliance;
  let token: ERC3643Token;
  let mockUSDC: MockUSDC;
  let vestingManager: VestingManager;
  let dividendManager: DividendManager;
  let secondaryMarket: SecondaryMarket;
  let realEstateManager: RealEstateSecurityManager;
  let mockRulesEngine: MockForteRulesEngine;
  let mockFortePayKYC: MockFortePayKYC;
  let primaryMarket: PrimaryMarketDistribution;

  // Identity contracts
  let issuerIdentity: MockIdentity;
  let investor1Identity: MockIdentity;
  let investor2Identity: MockIdentity;
  let investor3Identity: MockIdentity;

  // Signers
  let deployer: HardhatEthersSigner;
  let issuer: HardhatEthersSigner;
  let investor1: HardhatEthersSigner;
  let investor2: HardhatEthersSigner;
  let investor3: HardhatEthersSigner;
  let platformOperator: HardhatEthersSigner;

  async function deployForteIntegrationFixture() {
    // First deploy the base real estate token system
    console.log("📋 DEPLOYING REAL ESTATE TOKEN SYSTEM WITH FORTE INTEGRATION");
    console.log("================================================");

    // Get signers
    [deployer, issuer, investor1, investor2, investor3, platformOperator] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log(`🔑 Using deployer address: ${deployerAddress}`);

    // 1. Deploy ClaimTopicsRegistry
    console.log("🔨 Deploying ClaimTopicsRegistry...");
    const ClaimTopicsRegistryFactory = await ethers.getContractFactory("ClaimTopicsRegistry");
    claimTopicsRegistry = await ClaimTopicsRegistryFactory.connect(deployer).deploy();
    await claimTopicsRegistry.waitForDeployment();
    const claimTopicsRegistryAddress = await claimTopicsRegistry.getAddress();
    console.log(`✅ ClaimTopicsRegistry deployed at: ${claimTopicsRegistryAddress}`);

    // Add KYC claim topic
    await claimTopicsRegistry.addClaimTopic(KYC_CLAIM_TOPIC);
    console.log(`✅ Added KYC claim topic (${KYC_CLAIM_TOPIC}) to ClaimTopicsRegistry`);

    // 2. Deploy TrustedIssuersRegistry
    console.log("🔨 Deploying TrustedIssuersRegistry...");
    const TrustedIssuersRegistryFactory = await ethers.getContractFactory("TrustedIssuersRegistry");
    trustedIssuersRegistry = await TrustedIssuersRegistryFactory.connect(deployer).deploy();
    await trustedIssuersRegistry.waitForDeployment();
    const trustedIssuersRegistryAddress = await trustedIssuersRegistry.getAddress();
    console.log(`✅ TrustedIssuersRegistry deployed at: ${trustedIssuersRegistryAddress}`);

    // 3. Deploy IdentityRegistryStorage
    console.log("🔨 Deploying IdentityRegistryStorage...");
    const IdentityRegistryStorageFactory = await ethers.getContractFactory("IdentityRegistryStorage");
    identityRegistryStorage = await IdentityRegistryStorageFactory.connect(deployer).deploy();
    await identityRegistryStorage.waitForDeployment();
    const identityRegistryStorageAddress = await identityRegistryStorage.getAddress();
    console.log(`✅ IdentityRegistryStorage deployed at: ${identityRegistryStorageAddress}`);

    // 4. Deploy IdentityRegistry
    console.log("🔨 Deploying IdentityRegistry...");
    const IdentityRegistryFactory = await ethers.getContractFactory("IdentityRegistry");
    identityRegistry = await IdentityRegistryFactory.connect(deployer).deploy(
      trustedIssuersRegistryAddress,
      claimTopicsRegistryAddress,
      identityRegistryStorageAddress,
    );
    await identityRegistry.waitForDeployment();
    const identityRegistryAddress = await identityRegistry.getAddress();
    console.log(`✅ IdentityRegistry deployed at: ${identityRegistryAddress}`);

    // Authorize the Identity Registry in the storage
    await identityRegistryStorage.authorizeRegistry(identityRegistryAddress);
    console.log("✅ Authorized IdentityRegistry in IdentityRegistryStorage");

    // 5. Deploy Compliance
    console.log("🔨 Deploying Compliance...");
    const ComplianceFactory = await ethers.getContractFactory("Compliance");
    compliance = await ComplianceFactory.connect(deployer).deploy(identityRegistryAddress);
    await compliance.waitForDeployment();
    const complianceAddress = await compliance.getAddress();
    console.log(`✅ Compliance deployed at: ${complianceAddress}`);

    // 6. Deploy MockUSDC
    console.log("🔨 Deploying MockUSDC...");
    const MockUSDCFactory = await ethers.getContractFactory("MockUSDC");
    mockUSDC = await MockUSDCFactory.connect(deployer).deploy("Mock USDC", "USDC", STABLECOIN_DECIMALS);
    await mockUSDC.waitForDeployment();
    const mockUSDCAddress = await mockUSDC.getAddress();
    console.log(`✅ MockUSDC deployed at: ${mockUSDCAddress}`);

    // Mint 10M MockUSDC to deployer for testing
    const usdcAmount = ethers.parseUnits("10000000", STABLECOIN_DECIMALS);
    await mockUSDC.mint(deployerAddress, usdcAmount);
    console.log(`💰 Minted ${ethers.formatUnits(usdcAmount, STABLECOIN_DECIMALS)} USDC to deployer`);

    // Transfer some USDC to investors for testing
    const investor1Address = await investor1.getAddress();
    const investor2Address = await investor2.getAddress();
    const investor3Address = await investor3.getAddress();
    await mockUSDC.transfer(investor1Address, ethers.parseUnits("1000000", STABLECOIN_DECIMALS));
    await mockUSDC.transfer(investor2Address, ethers.parseUnits("1000000", STABLECOIN_DECIMALS));
    await mockUSDC.transfer(investor3Address, ethers.parseUnits("1000000", STABLECOIN_DECIMALS));
    console.log("💰 Transferred USDC to investors for testing");

    // 7. Deploy ERC3643Token
    console.log("🔨 Deploying ERC3643Token...");
    const tokenName = "Real Estate Token";
    const tokenSymbol = "RET";
    const propertyAddress = "123 Blockchain Blvd, Cryptoville";

    const ERC3643TokenFactory = await ethers.getContractFactory("ERC3643Token");
    token = await ERC3643TokenFactory.connect(deployer).deploy(
      tokenName,
      tokenSymbol,
      identityRegistryAddress,
      complianceAddress,
      propertyAddress,
      PROPERTY_VALUE,
    );
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log(`✅ ERC3643Token deployed at: ${tokenAddress}`);

    // 8. Deploy VestingManager
    console.log("🔨 Deploying VestingManager...");
    const VestingManagerFactory = await ethers.getContractFactory("VestingManager");
    vestingManager = await VestingManagerFactory.connect(deployer).deploy(
      tokenAddress,
      mockUSDCAddress,
      PROPERTY_VALUE,
    );
    await vestingManager.waitForDeployment();
    const vestingManagerAddress = await vestingManager.getAddress();
    console.log(`✅ VestingManager deployed at: ${vestingManagerAddress}`);

    // 9. Deploy DividendManager
    console.log("🔨 Deploying DividendManager...");
    const DividendManagerFactory = await ethers.getContractFactory("DividendManager");
    dividendManager = await DividendManagerFactory.connect(deployer).deploy(tokenAddress, mockUSDCAddress);
    await dividendManager.waitForDeployment();
    const dividendManagerAddress = await dividendManager.getAddress();
    console.log(`✅ DividendManager deployed at: ${dividendManagerAddress}`);

    // 10. Deploy SecondaryMarket
    console.log("🔨 Deploying SecondaryMarket...");
    const SecondaryMarketFactory = await ethers.getContractFactory("SecondaryMarket");
    secondaryMarket = await SecondaryMarketFactory.connect(deployer).deploy(
      tokenAddress,
      mockUSDCAddress,
      vestingManagerAddress,
    );
    await secondaryMarket.waitForDeployment();
    const secondaryMarketAddress = await secondaryMarket.getAddress();
    console.log(`✅ SecondaryMarket deployed at: ${secondaryMarketAddress}`);

    // 11. Deploy RealEstateSecurityManager
    console.log("🔨 Deploying RealEstateSecurityManager...");
    const platformOperatorAddress = await platformOperator.getAddress();
    const RealEstateSecurityManagerFactory = await ethers.getContractFactory("RealEstateSecurityManager");

    realEstateManager = await RealEstateSecurityManagerFactory.connect(deployer).deploy(
      tokenAddress,
      mockUSDCAddress,
      dividendManagerAddress,
      vestingManagerAddress,
      secondaryMarketAddress,
      platformOperatorAddress, // Fee recipient
    );
    await realEstateManager.waitForDeployment();
    const realEstateManagerAddress = await realEstateManager.getAddress();
    console.log(`✅ RealEstateSecurityManager deployed at: ${realEstateManagerAddress}`);

    // Transfer ownership of DividendManager to RealEstateSecurityManager
    await dividendManager.transferOwnership(realEstateManagerAddress);
    console.log("✅ DividendManager ownership transferred");

    // Transfer ownership of Compliance to Token contract
    await compliance.transferOwnership(tokenAddress);
    console.log("✅ Compliance ownership transferred");

    // Initialize RealEstateSecurityManager
    await realEstateManager.connect(deployer).initialize();
    console.log("✅ RealEstateSecurityManager initialized");

    // 12. Deploy mock Forte contracts
    console.log("🔨 Deploying Forte Integration Contracts...");
    
    // Deploy MockForteRulesEngine
    const MockForteRulesEngineFactory = await ethers.getContractFactory("MockForteRulesEngine");
    mockRulesEngine = await MockForteRulesEngineFactory.connect(deployer).deploy();
    await mockRulesEngine.waitForDeployment();
    const mockRulesEngineAddress = await mockRulesEngine.getAddress();
    console.log(`✅ MockForteRulesEngine deployed at: ${mockRulesEngineAddress}`);
    
    // Set up some default rules
    await mockRulesEngine.setRuleResult("TRANSFER_RULE", true);
    await mockRulesEngine.setRuleResult("KYC_VERIFICATION", true);
    await mockRulesEngine.setRuleResult("INVESTMENT_RULE", true);
    console.log("✅ Default rules set in MockForteRulesEngine");
    
    // Deploy MockFortePayKYC
    const MockFortePayKYCFactory = await ethers.getContractFactory("MockFortePayKYC");
    mockFortePayKYC = await MockFortePayKYCFactory.connect(deployer).deploy();
    await mockFortePayKYC.waitForDeployment();
    const mockFortePayKYCAddress = await mockFortePayKYC.getAddress();
    console.log(`✅ MockFortePayKYC deployed at: ${mockFortePayKYCAddress}`);
    
    // 13. Update contracts with Forte integrations
    console.log("🔨 Setting up Forte integrations...");
    
    // Set Forte Rules Engine in RealEstateSecurityManager
    await realEstateManager.setRulesEngine(mockRulesEngineAddress);
    console.log("✅ Rules Engine set in RealEstateSecurityManager");
    
    // Set FortePay KYC in RealEstateSecurityManager
    await realEstateManager.setFortePayKYC(mockFortePayKYCAddress);
    console.log("✅ FortePay KYC set in RealEstateSecurityManager");
    
    // Set Rules Engine in Compliance
    await token.connect(deployer).recoveryOwnership(complianceAddress);
    await compliance.connect(deployer).setRulesEngine(mockRulesEngineAddress);
    await compliance.transferOwnership(tokenAddress);
    console.log("✅ Rules Engine set in Compliance");
    
    // Set FortePay KYC and Rules Engine in IdentityRegistry
    await identityRegistry.setFortePayKYC(mockFortePayKYCAddress);
    await identityRegistry.setRulesEngine(mockRulesEngineAddress);
    console.log("✅ FortePay KYC and Rules Engine set in IdentityRegistry");
    
    // 14. Deploy Primary Market Distribution
    console.log("🔨 Deploying PrimaryMarketDistribution...");
    await realEstateManager.deployPrimaryMarket();
    const primaryMarketAddress = await realEstateManager.primaryMarket();
    primaryMarket = await ethers.getContractAt("PrimaryMarketDistribution", primaryMarketAddress);
    console.log(`✅ PrimaryMarketDistribution deployed at: ${primaryMarketAddress}`);
    
    // 15. Set up permissions and agent roles
    console.log("🔑 Setting up permissions and agent roles...");
    // Add agents to the token
    await token.addAgent(vestingManagerAddress);
    await token.addAgent(realEstateManagerAddress);
    console.log("✅ Added VestingManager and RealEstateManager as agents on the token");

    // Add agents to the identity registry
    await identityRegistry.addAgent(deployerAddress);
    console.log("✅ Added deployer as agent on IdentityRegistry");

    // 16. Deploy mock identity contracts
    console.log("🔨 Deploying mock identity contracts...");
    const MockIdentityFactory = await ethers.getContractFactory("MockIdentity");
    const issuerAddress = await issuer.getAddress();

    issuerIdentity = await MockIdentityFactory.connect(deployer).deploy(issuerAddress);
    await issuerIdentity.waitForDeployment();
    const issuerIdentityAddress = await issuerIdentity.getAddress();

    investor1Identity = await MockIdentityFactory.connect(deployer).deploy(investor1Address);
    await investor1Identity.waitForDeployment();
    const investor1IdentityAddress = await investor1Identity.getAddress();

    investor2Identity = await MockIdentityFactory.connect(deployer).deploy(investor2Address);
    await investor2Identity.waitForDeployment();
    const investor2IdentityAddress = await investor2Identity.getAddress();

    investor3Identity = await MockIdentityFactory.connect(deployer).deploy(investor3Address);
    await investor3Identity.waitForDeployment();
    const investor3IdentityAddress = await investor3Identity.getAddress();

    console.log("✅ Deployed mock identity contracts for issuer and investors");

    // Add issuer to trusted issuers with KYC claim topic
    await trustedIssuersRegistry.addTrustedIssuer(issuerIdentityAddress, [KYC_CLAIM_TOPIC]);
    console.log(`✅ Added issuer identity (${issuerIdentityAddress}) to trusted issuers registry`);

    // Set up claim signer key in issuer identity
    await issuerIdentity.connect(issuer).addKey(
      ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint256"], [issuerIdentityAddress, KYC_CLAIM_TOPIC]),
      ),
      3, // Purpose: CLAIM
    );
    console.log("✅ Added claim signer key to issuer identity");

    // 17. Set up KYC levels for investors in FortePay
    console.log("🔨 Setting up KYC levels for investors...");
    await mockFortePayKYC.setUserKYCLevel(investor1Address, KYC_LEVEL_BASIC);
    await mockFortePayKYC.setUserKYCLevel(investor2Address, KYC_LEVEL_ADVANCED);
    await mockFortePayKYC.setUserKYCLevel(investor3Address, KYC_LEVEL_ACCREDITED);
    
    await mockFortePayKYC.setUserJurisdiction(investor1Address, COUNTRY_US);
    await mockFortePayKYC.setUserJurisdiction(investor2Address, COUNTRY_UK);
    await mockFortePayKYC.setUserJurisdiction(investor3Address, COUNTRY_US);
    console.log("✅ KYC levels set for all investors");

    console.log("================================================");
    console.log("✅ FORTE INTEGRATION DEPLOYMENT COMPLETE");
    console.log("================================================");

    return {
      claimTopicsRegistry,
      trustedIssuersRegistry,
      identityRegistryStorage,
      identityRegistry,
      compliance,
      token,
      mockUSDC,
      vestingManager,
      dividendManager,
      secondaryMarket,
      realEstateManager,
      mockRulesEngine,
      mockFortePayKYC,
      primaryMarket,
      issuerIdentity,
      investor1Identity,
      investor2Identity,
      investor3Identity,
      deployer,
      issuer,
      investor1,
      investor2,
      investor3,
      platformOperator,
    };
  }

  // Load fixture before each test
  beforeEach(async function () {
    const fixture = await loadFixture(deployForteIntegrationFixture);

    // Set all contract instances and signers
    claimTopicsRegistry = fixture.claimTopicsRegistry;
    trustedIssuersRegistry = fixture.trustedIssuersRegistry;
    identityRegistryStorage = fixture.identityRegistryStorage;
    identityRegistry = fixture.identityRegistry;
    compliance = fixture.compliance;
    token = fixture.token;
    mockUSDC = fixture.mockUSDC;
    vestingManager = fixture.vestingManager;
    dividendManager = fixture.dividendManager;
    secondaryMarket = fixture.secondaryMarket;
    realEstateManager = fixture.realEstateManager;
    mockRulesEngine = fixture.mockRulesEngine;
    mockFortePayKYC = fixture.mockFortePayKYC;
    primaryMarket = fixture.primaryMarket;
    issuerIdentity = fixture.issuerIdentity;
    investor1Identity = fixture.investor1Identity;
    investor2Identity = fixture.investor2Identity;
    investor3Identity = fixture.investor3Identity;
    deployer = fixture.deployer;
    issuer = fixture.issuer;
    investor1 = fixture.investor1;
    investor2 = fixture.investor2;
    investor3 = fixture.investor3;
    platformOperator = fixture.platformOperator;
  });

  describe("Forte Integration Tests", function () {
    it("Should correctly configure Forte integrations", async function () {
      // Verify Rules Engine is correctly set
      expect(await compliance.rulesEngine()).to.equal(await mockRulesEngine.getAddress());
      expect(await identityRegistry.rulesEngine()).to.equal(await mockRulesEngine.getAddress());
      expect(await realEstateManager.rulesEngine()).to.equal(await mockRulesEngine.getAddress());
      
      // Verify FortePay KYC is correctly set
      expect(await identityRegistry.fortePayKYC()).to.equal(await mockFortePayKYC.getAddress());
      expect(await realEstateManager.fortePayKYC()).to.equal(await mockFortePayKYC.getAddress());
      
      // Verify Primary Market is deployed and connected
      expect(await realEstateManager.primaryMarket()).to.equal(await primaryMarket.getAddress());
    });
    
    it("Should verify investors using FortePay KYC", async function () {
      // Verify investors have the correct KYC levels
      const investor1Address = await investor1.getAddress();
      const investor2Address = await investor2.getAddress();
      const investor3Address = await investor3.getAddress();
      
      expect(await mockFortePayKYC.getUserKYCLevel(investor1Address)).to.equal(KYC_LEVEL_BASIC);
      expect(await mockFortePayKYC.getUserKYCLevel(investor2Address)).to.equal(KYC_LEVEL_ADVANCED);
      expect(await mockFortePayKYC.getUserKYCLevel(investor3Address)).to.equal(KYC_LEVEL_ACCREDITED);
      
      // Set required KYC level to ADVANCED
      await identityRegistry.setRequiredKYCLevel(KYC_LEVEL_ADVANCED);
      
      // Check which investors are verified
      expect(await identityRegistry.isVerified(investor1Address)).to.be.false;
      expect(await identityRegistry.isVerified(investor2Address)).to.be.true;
      expect(await identityRegistry.isVerified(investor3Address)).to.be.true;
      
      // Lower required KYC level to BASIC
      await identityRegistry.setRequiredKYCLevel(KYC_LEVEL_BASIC);
      
      // Now all investors should be verified
      expect(await identityRegistry.isVerified(investor1Address)).to.be.true;
      expect(await identityRegistry.isVerified(investor2Address)).to.be.true;
      expect(await identityRegistry.isVerified(investor3Address)).to.be.true;
    });
  });

  describe("Primary Market Distribution", function () {
    it("Should execute a complete token distribution lifecycle", async function () {
      console.log("🧪 EXECUTING PRIMARY MARKET DISTRIBUTION LIFECYCLE");
      console.log("================================================");
      
      // Get investor addresses
      const investor1Address = await investor1.getAddress();
      const investor2Address = await investor2.getAddress();
      const investor3Address = await investor3.getAddress();
      
      // ==================== PHASE 1: DISTRIBUTION SETUP ====================
      console.log("🧪 PHASE 1: DISTRIBUTION SETUP");
      console.log("------------------------------------------------");
      
      // 1. Create a distribution round
      console.log("1️⃣ Creating a distribution round");
      const currentTimestamp = await time.latest();
      const startTime = currentTimestamp + DISTRIBUTION_START_DELAY;
      const endTime = startTime + DISTRIBUTION_DURATION;
      
      await primaryMarket.createDistributionRound(
        startTime,
        endTime,
        TOKEN_AMOUNT, // 1000 tokens
        TOKEN_PRICE, // $1000 per token
        MIN_INVESTMENT, // $5000 min
        MAX_INVESTMENT, // $100k max
        0, // FixedPrice distribution type
        "INVESTMENT_RULE" // Rule for validating investments
      );
      console.log("✅ Distribution round created");
      
      // 2. Add investment tiers
      console.log("2️⃣ Setting up investment tiers");
      
      // Tier 1: Accredited investors, 50% allocation, start immediately
      await primaryMarket.addTier(
        KYC_LEVEL_ACCREDITED,
        50, // 50% of allocation
        startTime
      );
      
      // Tier 2: Advanced KYC investors, 30% allocation, start after 1 day
      await primaryMarket.addTier(
        KYC_LEVEL_ADVANCED,
        30, // 30% of allocation
        startTime + SECONDS_IN_DAY
      );
      
      // Tier 3: Basic KYC investors, 20% allocation, start after 3 days
      await primaryMarket.addTier(
        KYC_LEVEL_BASIC,
        20, // 20% of allocation
        startTime + (3 * SECONDS_IN_DAY)
      );
      console.log("✅ Investment tiers added");
      
      // 3. Advance time to start of distribution
      console.log("3️⃣ Advancing time to start of distribution");
      await time.increaseTo(startTime);
      console.log("⏱️ Time advanced to distribution start");
      
      // 4. Start the distribution round
      await primaryMarket.startRound();
      console.log("✅ Distribution round started");
      console.log("------------------------------------------------");
      
      // ==================== PHASE 2: INVESTOR SUBSCRIPTIONS ====================
      console.log("🧪 PHASE 2: INVESTOR SUBSCRIPTIONS");
      console.log("------------------------------------------------");
      
      // 1. Investor 3 (Accredited) subscribes first
      console.log("1️⃣ Investor 3 (Accredited) subscribes");
      const investor3Amount = ethers.parseUnits("50000", STABLECOIN_DECIMALS); // $50k
      
      // Approve USDC for subscription
      await mockUSDC.connect(investor3).approve(await primaryMarket.getAddress(), investor3Amount);
      
      // Subscribe
      await primaryMarket.connect(investor3).subscribe(investor3Amount);
      console.log(`💰 Investor 3 subscribed with ${ethers.formatUnits(investor3Amount, STABLECOIN_DECIMALS)} USDC`);
      
      // 2. Advance time to Tier 2 start
      console.log("2️⃣ Advancing time to Tier 2 start (Advanced KYC)");
      await time.increaseTo(startTime + SECONDS_IN_DAY);
      console.log("⏱️ Time advanced to Tier 2 start");
      
      // 3. Investor 2 (Advanced KYC) subscribes
      console.log("3️⃣ Investor 2 (Advanced KYC) subscribes");
      const investor2Amount = ethers.parseUnits("30000", STABLECOIN_DECIMALS); // $30k
      
      // Approve USDC for subscription
      await mockUSDC.connect(investor2).approve(await primaryMarket.getAddress(), investor2Amount);
      
      // Subscribe
      await primaryMarket.connect(investor2).subscribe(investor2Amount);
      console.log(`💰 Investor 2 subscribed with ${ethers.formatUnits(investor2Amount, STABLECOIN_DECIMALS)} USDC`);
      
      // 4. Advance time to Tier 3 start
      console.log("4️⃣ Advancing time to Tier 3 start (Basic KYC)");
      await time.increaseTo(startTime + (3 * SECONDS_IN_DAY));
      console.log("⏱️ Time advanced to Tier 3 start");
      
      // 5. Investor 1 (Basic KYC) tries to subscribe
      console.log("5️⃣ Investor 1 (Basic KYC) subscribes");
      const investor1Amount = ethers.parseUnits("20000", STABLECOIN_DECIMALS); // $20k
      
      // Approve USDC for subscription
      await mockUSDC.connect(investor1).approve(await primaryMarket.getAddress(), investor1Amount);
      
      // Subscribe
      await primaryMarket.connect(investor1).subscribe(investor1Amount);
      console.log(`💰 Investor 1 subscribed with ${ethers.formatUnits(investor1Amount, STABLECOIN_DECIMALS)} USDC`);
      
      // 6. Verify subscription amounts
      const investor1Subscription = await primaryMarket.subscriptions(investor1Address);
      const investor2Subscription = await primaryMarket.subscriptions(investor2Address);
      const investor3Subscription = await primaryMarket.subscriptions(investor3Address);
      const totalSubscribed = await primaryMarket.totalSubscribed();
      
      expect(investor1Subscription).to.equal(investor1Amount);
      expect(investor2Subscription).to.equal(investor2Amount);
      expect(investor3Subscription).to.equal(investor3Amount);
      expect(totalSubscribed).to.equal(investor1Amount.add(investor2Amount).add(investor3Amount));
      
      console.log("✅ Subscription amounts verified");
      console.log("------------------------------------------------");
      
      // ==================== PHASE 3: ALLOCATION AND DISTRIBUTION ====================
      console.log("🧪 PHASE 3: ALLOCATION AND DISTRIBUTION");
      console.log("------------------------------------------------");
      
      // 1. Close the distribution round
      console.log("1️⃣ Closing the distribution round");
      await primaryMarket.closeRound();
      console.log("✅ Distribution round closed");
      
      // 2. Set allocations manually (in a real system this could be calculated algorithmically)
      console.log("2️⃣ Setting token allocations");
      
      // Convert subscription amounts to token values
      const tokenPrice = await (await primaryMarket.distributionRounds(1)).tokenPrice;
      
      // Calculate token amounts (assuming 1e18 token decimals)
      const investor1TokenAmount = investor1Amount.mul(ethers.parseEther("1")).div(tokenPrice);
      const investor2TokenAmount = investor2Amount.mul(ethers.parseEther("1")).div(tokenPrice);
      const investor3TokenAmount = investor3Amount.mul(ethers.parseEther("1")).div(tokenPrice);
      
      // Set allocations equal to subscriptions for simplicity
      await primaryMarket.setAllocation(investor1Address, investor1Amount);
      await primaryMarket.setAllocation(investor2Address, investor2Amount);
      await primaryMarket.setAllocation(investor3Address, investor3Amount);
      
      console.log(`💰 Allocated ${ethers.formatEther(investor1TokenAmount)} tokens to Investor 1`);
      console.log(`💰 Allocated ${ethers.formatEther(investor2TokenAmount)} tokens to Investor 2`);
      console.log(`💰 Allocated ${ethers.formatEther(investor3TokenAmount)} tokens to Investor 3`);
      
      // 3. Finalize the round by calling calculateAllocations
      await primaryMarket.calculateAllocations();
      console.log("✅ Distribution round finalized");
      
      // 4. Investors claim their tokens
      console.log("3️⃣ Investors claiming tokens");
      
      // Record initial token balances
      const investor1InitialTokens = await token.balanceOf(investor1Address);
      const investor2InitialTokens = await token.balanceOf(investor2Address);
      const investor3InitialTokens = await token.balanceOf(investor3Address);
      
      // Claim tokens
      await primaryMarket.connect(investor1).claimTokens();
      await primaryMarket.connect(investor2).claimTokens();
      await primaryMarket.connect(investor3).claimTokens();
      
      // Verify token balances after claiming
      const investor1FinalTokens = await token.balanceOf(investor1Address);
      const investor2FinalTokens = await token.balanceOf(investor2Address);
      const investor3FinalTokens = await token.balanceOf(investor3Address);
      
      expect(investor1FinalTokens).to.be.gt(investor1InitialTokens);
      expect(investor2FinalTokens).to.be.gt(investor2InitialTokens);
      expect(investor3FinalTokens).to.be.gt(investor3InitialTokens);
      
      console.log(`💰 Investor 1 claimed ${ethers.formatEther(investor1FinalTokens.sub(investor1InitialTokens))} tokens`);
      console.log(`💰 Investor 2 claimed ${ethers.formatEther(investor2FinalTokens.sub(investor2InitialTokens))} tokens`);
      console.log(`💰 Investor 3 claimed ${ethers.formatEther(investor3FinalTokens.sub(investor3InitialTokens))} tokens`);
      
      // 5. Verify token allocations and total supply
      const totalSupply = await token.totalSupply();
      const expectedTotalTokens = investor1FinalTokens.sub(investor1InitialTokens)
        .add(investor2FinalTokens.sub(investor2InitialTokens))
        .add(investor3FinalTokens.sub(investor3InitialTokens));
      
      expect(totalSupply).to.equal(expectedTotalTokens);
      
      console.log(`📊 Total token supply: ${ethers.formatEther(totalSupply)} tokens`);
      console.log("✅ Token distribution complete and verified");
      console.log("------------------------------------------------");
      
      console.log("✅ PRIMARY MARKET DISTRIBUTION LIFECYCLE TEST COMPLETED SUCCESSFULLY");
      console.log("================================================");
    });
    
    it("Should enforce KYC level requirements for tiers", async function () {
      // Create distribution round
      const currentTimestamp = await time.latest();
      const startTime = currentTimestamp + DISTRIBUTION_START_DELAY;
      const endTime = startTime + DISTRIBUTION_DURATION;
      
      await primaryMarket.createDistributionRound(
        startTime,
        endTime,
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        MIN_INVESTMENT,
        MAX_INVESTMENT,
        0, // FixedPrice
        "INVESTMENT_RULE"
      );
      
      // Add tier that requires Accredited status
      await primaryMarket.addTier(
        KYC_LEVEL_ACCREDITED,
        100, // 100% allocation
        startTime
      );
      
      // Start round
      await time.increaseTo(startTime);
      await primaryMarket.startRound();
      
      // Investor 1 has only Basic KYC and should not be able to subscribe
      const investor1Address = await investor1.getAddress();
      const investAmount = ethers.parseUnits("10000", STABLECOIN_DECIMALS);
      
      await mockUSDC.connect(investor1).approve(await primaryMarket.getAddress(), investAmount);
      
      // Expect transaction to revert
      await expect(
        primaryMarket.connect(investor1).subscribe(investAmount)
      ).to.be.revertedWith("No eligible tier found or tier not open yet");
      
      // Upgrade Investor 1 to Accredited
      await mockFortePayKYC.setUserKYCLevel(investor1Address, KYC_LEVEL_ACCREDITED);
      
      // Now subscription should succeed
      await primaryMarket.connect(investor1).subscribe(investAmount);
      
      // Verify subscription
      expect(await primaryMarket.subscriptions(investor1Address)).to.equal(investAmount);
    });
    
    it("Should enforce rules from Forte Rules Engine", async function () {
      // Create distribution round
      const currentTimestamp = await time.latest();
      const startTime = currentTimestamp + DISTRIBUTION_START_DELAY;
      const endTime = startTime + DISTRIBUTION_DURATION;
      
      await primaryMarket.createDistributionRound(
        startTime,
        endTime,
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        MIN_INVESTMENT,
        MAX_INVESTMENT,
        0, // FixedPrice
        "INVESTMENT_RULE"
      );
      
      // Add tier
      await primaryMarket.addTier(
        KYC_LEVEL_BASIC,
        100, // 100% allocation
        startTime
      );
      
      // Start round
      await time.increaseTo(startTime);
      await primaryMarket.startRound();
      
      // Set rule to reject all investments
      await mockRulesEngine.setRuleResult("INVESTMENT_RULE", false);
      
      // Investor 1 should not be able to subscribe due to rule failure
      const investAmount = ethers.parseUnits("10000", STABLECOIN_DECIMALS);
      await mockUSDC.connect(investor1).approve(await primaryMarket.getAddress(), investAmount);
      
      // Expect transaction to revert
      await expect(
        primaryMarket.connect(investor1).subscribe(investAmount)
      ).to.be.revertedWith("Subscription violates rules");
      
      // Allow investments again
      await mockRulesEngine.setRuleResult("INVESTMENT_RULE", true);
      
      // Now subscription should succeed
      await primaryMarket.connect(investor1).subscribe(investAmount);
      
      // Verify subscription
      const investor1Address = await investor1.getAddress();
      expect(await primaryMarket.subscriptions(investor1Address)).to.equal(investAmount);
    });
  });
});