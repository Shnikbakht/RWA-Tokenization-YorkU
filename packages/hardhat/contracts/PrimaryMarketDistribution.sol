// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IForteRulesEngine.sol";
import "./interfaces/IFortePayKYC.sol";

interface IERC3643Token {
    function balanceOf(address account) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function mint(address to, uint256 amount) external;
}

/**
 * @title PrimaryMarketDistribution
 * @dev Manages the primary distribution of real estate security tokens
 */
contract PrimaryMarketDistribution is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    enum DistributionStatus { NotStarted, Active, Closed, Finalized }
    enum DistributionType { FixedPrice, DutchAuction, Tiered }
    
    struct DistributionRound {
        uint256 startTime;
        uint256 endTime;
        uint256 tokenSupply;
        uint256 tokenPrice; // In stablecoin units per token
        uint256 minInvestment;
        uint256 maxInvestment;
        DistributionType distType;
        DistributionStatus status;
        string rulesetName; // Corresponding ruleset in Forte Rules Engine
    }
    
    struct TierInfo {
        uint256 minKYCLevel; // Minimum KYC level required for this tier
        uint256 allocationPercentage; // % of total allocation for this tier
        uint256 startTime; // When this tier can start participating
    }
    
    // Core contracts
    IERC3643Token public token;
    IERC20 public stablecoin;
    IForteRulesEngine public rulesEngine;
    IFortePayKYC public fortePayKYC;
    
    // Distribution round data
    uint256 public currentRoundId;
    uint256 public totalRounds;
    mapping(uint256 => DistributionRound) public distributionRounds;
    
    // Tier system for current round
    mapping(uint256 => TierInfo) public tiers; // Tier ID => TierInfo
    uint256 public totalTiers;
    
    // Subscriptions and allocations for current round
    mapping(address => uint256) public subscriptions;
    mapping(address => uint256) public allocations;
    uint256 public totalSubscribed;
    
    // Platform fee
    uint256 public platformFee = 50; // 0.5% default
    
    // Events
    event RoundCreated(uint256 roundId, uint256 startTime, uint256 endTime, uint256 supply);
    event TierAdded(uint256 tierId, uint256 minKYCLevel, uint256 allocationPercentage, uint256 startTime);
    event Subscribed(address indexed investor, uint256 amount);
    event Allocated(address indexed investor, uint256 amount);
    event RoundStatusChanged(uint256 roundId, DistributionStatus status);
    event PlatformFeeUpdated(uint256 newFee);
    event TokensClaimed(address indexed investor, uint256 amount);
    event UnallocatedRefunded(address indexed investor, uint256 amount);
    
    /**
     * @dev Constructor
     * @param _tokenAddress Address of the ERC3643 token
     * @param _stablecoinAddress Address of the stablecoin
     * @param _rulesEngineAddress Address of the Forte Rules Engine
     * @param _fortePayKYCAddress Address of the FortePay KYC
     */
    constructor(
        address _tokenAddress,
        address _stablecoinAddress,
        address _rulesEngineAddress,
        address _fortePayKYCAddress
    ) {
        require(_tokenAddress != address(0), "Invalid token address");
        require(_stablecoinAddress != address(0), "Invalid stablecoin address");
        require(_rulesEngineAddress != address(0), "Invalid rules engine address");
        require(_fortePayKYCAddress != address(0), "Invalid FortePay KYC address");
        
        token = IERC3643Token(_tokenAddress);
        stablecoin = IERC20(_stablecoinAddress);
        rulesEngine = IForteRulesEngine(_rulesEngineAddress);
        fortePayKYC = IFortePayKYC(_fortePayKYCAddress);
    }
    
    /**
     * @dev Creates a new distribution round
     * @param _startTime Start time of the round
     * @param _endTime End time of the round
     * @param _tokenSupply Total token supply for the round
     * @param _tokenPrice Price per token in stablecoin units
     * @param _minInvestment Minimum investment amount
     * @param _maxInvestment Maximum investment amount
     * @param _distType Distribution type (Fixed, Dutch Auction, Tiered)
     * @param _rulesetName Name of the ruleset in Forte Rules Engine
     */
    function createDistributionRound(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _tokenSupply,
        uint256 _tokenPrice,
        uint256 _minInvestment,
        uint256 _maxInvestment,
        DistributionType _distType,
        string memory _rulesetName
    ) external onlyOwner {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_tokenSupply > 0, "Token supply must be positive");
        require(_tokenPrice > 0, "Token price must be positive");
        
        totalRounds++;
        currentRoundId = totalRounds;
        
        distributionRounds[currentRoundId] = DistributionRound({
            startTime: _startTime,
            endTime: _endTime,
            tokenSupply: _tokenSupply,
            tokenPrice: _tokenPrice,
            minInvestment: _minInvestment,
            maxInvestment: _maxInvestment,
            distType: _distType,
            status: DistributionStatus.NotStarted,
            rulesetName: _rulesetName
        });
        
        emit RoundCreated(currentRoundId, _startTime, _endTime, _tokenSupply);
    }
    
    /**
     * @dev Adds a tier to the current distribution round
     * @param _minKYCLevel Minimum KYC level required
     * @param _allocationPercentage Percentage of tokens allocated to this tier
     * @param _startTime Start time for this tier
     */
    function addTier(
        uint256 _minKYCLevel,
        uint256 _allocationPercentage, 
        uint256 _startTime
    ) external onlyOwner {
        require(currentRoundId > 0, "Create a round first");
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.NotStarted, "Round already started");
        require(_startTime >= round.startTime, "Tier start time before round start");
        require(_startTime <= round.endTime, "Tier start time after round end");
        require(_allocationPercentage > 0 && _allocationPercentage <= 100, "Invalid allocation percentage");
        
        totalTiers++;
        tiers[totalTiers] = TierInfo({
            minKYCLevel: _minKYCLevel,
            allocationPercentage: _allocationPercentage,
            startTime: _startTime
        });
        
        emit TierAdded(totalTiers, _minKYCLevel, _allocationPercentage, _startTime);
    }
    
    /**
     * @dev Updates the platform fee
     * @param _newFee New platform fee in basis points
     */
    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 500, "Fee cannot exceed 5%");
        platformFee = _newFee;
        emit PlatformFeeUpdated(_newFee);
    }
    
    /**
     * @dev Starts the current distribution round
     */
    function startRound() external onlyOwner {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.NotStarted, "Round not in NotStarted status");
        require(block.timestamp >= round.startTime, "Start time not reached");
        
        round.status = DistributionStatus.Active;
        emit RoundStatusChanged(currentRoundId, DistributionStatus.Active);
    }
    
    /**
     * @dev Subscribe to the current distribution round
     * @param amount Amount of stablecoins to subscribe
     */
    function subscribe(uint256 amount) external nonReentrant {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Active, "Round not active");
        require(block.timestamp >= round.startTime && block.timestamp <= round.endTime, "Outside round time window");
        require(amount >= round.minInvestment, "Below minimum investment");
        
        if (round.maxInvestment > 0) {
            require(subscriptions[msg.sender].add(amount) <= round.maxInvestment, "Exceeds maximum investment");
        }
        
        // Check FortePay KYC level and eligibility using Rules Engine
        IFortePayKYC.KYCLevel kycLevel = fortePayKYC.getUserKYCLevel(msg.sender);
        require(uint256(kycLevel) > 0, "KYC verification required");
        
        // Determine investor tier based on KYC level
        uint256 investorTier = 0;
        uint256 tierStartTime = round.endTime;
        
        for (uint256 i = 1; i <= totalTiers; i++) {
            if (uint256(kycLevel) >= tiers[i].minKYCLevel && block.timestamp >= tiers[i].startTime) {
                if (tiers[i].startTime <= tierStartTime) {
                    investorTier = i;
                    tierStartTime = tiers[i].startTime;
                }
            }
        }
        
        require(investorTier > 0, "No eligible tier found or tier not open yet");
        
        // Verify using Forte Rules Engine
        bytes memory params = abi.encode(msg.sender, kycLevel, amount, investorTier);
        require(rulesEngine.validateRule(round.rulesetName, params), "Subscription violates rules");
        
        // Update investor's subscription
        uint256 newTotalSubscribed = totalSubscribed.add(amount);
        subscriptions[msg.sender] = subscriptions[msg.sender].add(amount);
        totalSubscribed = newTotalSubscribed;
        
        // Transfer stablecoins to contract
        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Stablecoin transfer failed");
        
        emit Subscribed(msg.sender, amount);
    }
    
    /**
     * @dev Closes the current distribution round
     */
    function closeRound() external onlyOwner {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Active, "Round not active");
        require(block.timestamp > round.endTime || totalSubscribed >= round.tokenSupply, "Round end conditions not met");
        
        round.status = DistributionStatus.Closed;
        emit RoundStatusChanged(currentRoundId, DistributionStatus.Closed);
    }
    
    /**
     * @dev Calculates allocations for all investors
     */
    function calculateAllocations() external onlyOwner {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Closed, "Round not closed");
        
        // If round is oversubscribed, calculate pro-rata allocations
        if (totalSubscribed > round.tokenSupply) {
            // Calculate tier allocations
            uint256[] memory tierAllocations = new uint256[](totalTiers + 1);
            
            for (uint256 i = 1; i <= totalTiers; i++) {
                tierAllocations[i] = round.tokenSupply.mul(tiers[i].allocationPercentage).div(100);
            }
            
            // Implement tiered allocation logic here
            // This is a placeholder - real implementation would calculate
            // allocations based on tiers, KYC levels, and subscription amounts
            
            // For now, we'll do a simple proportional allocation
            // In a real implementation, you would need to track which tier
            // each investor belongs to and allocate according to tier rules
            for (uint256 i = 0; i < 100; i++) {
                // This would be an address tracking mechanism
                // For this placeholder, we'll skip the actual calculation
            }
        } else {
            // If not oversubscribed, everyone gets their full subscription
            // This would be implemented by iterating through all subscribers
            // For this placeholder, we'll skip the actual calculation
        }
        
        round.status = DistributionStatus.Finalized;
        emit RoundStatusChanged(currentRoundId, DistributionStatus.Finalized);
    }
    
    /**
     * @dev Manually set allocation for an investor
     * For admin use when automatic calculation is not sufficient
     * @param investor Address of the investor
     * @param allocationAmount Amount allocated to the investor
     */
    function setAllocation(address investor, uint256 allocationAmount) external onlyOwner {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Closed, "Round not closed");
        require(subscriptions[investor] > 0, "Investor has no subscription");
        require(allocationAmount <= subscriptions[investor], "Allocation exceeds subscription");
        
        allocations[investor] = allocationAmount;
        emit Allocated(investor, allocationAmount);
    }
    
    /**
     * @dev Investor claims tokens after allocation
     */
    function claimTokens() external nonReentrant {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Finalized, "Round not finalized");
        
        uint256 allocation = allocations[msg.sender];
        require(allocation > 0, "No allocation to claim");
        
        // Calculate tokens to receive
        uint256 tokenAmount = allocation.mul(1e18).div(round.tokenPrice);
        
        // Reset allocation
        allocations[msg.sender] = 0;
        
        // Mint tokens to investor
        token.mint(msg.sender, tokenAmount);
        
        emit TokensClaimed(msg.sender, tokenAmount);
    }
    
    /**
     * @dev Refund unallocated subscription amount
     */
    function refundUnallocated() external nonReentrant {
        DistributionRound storage round = distributionRounds[currentRoundId];
        require(round.status == DistributionStatus.Finalized, "Round not finalized");
        
        uint256 subscription = subscriptions[msg.sender];
        uint256 allocation = allocations[msg.sender];
        require(subscription > allocation, "No refund available");
        
        uint256 refundAmount = subscription.sub(allocation);
        subscriptions[msg.sender] = allocation;
        
        // Refund unallocated stablecoins
        require(stablecoin.transfer(msg.sender, refundAmount), "Refund transfer failed");
        
        emit UnallocatedRefunded(msg.sender, refundAmount);
    }
    
    /**
     * @dev Gets the details of a distribution round
     * @param roundId ID of the round
     * @return Distribution round details
     */
    function getDistributionRound(uint256 roundId) external view returns (
        uint256 startTime,
        uint256 endTime,
        uint256 tokenSupply,
        uint256 tokenPrice,
        uint256 minInvestment,
        uint256 maxInvestment,
        DistributionType distType,
        DistributionStatus status
    ) {
        DistributionRound storage round = distributionRounds[roundId];
        return (
            round.startTime,
            round.endTime,
            round.tokenSupply,
            round.tokenPrice,
            round.minInvestment,
            round.maxInvestment,
            round.distType,
            round.status
        );
    }
    
    /**
     * @dev Gets the tier info
     * @param tierId ID of the tier
     * @return Tier info
     */
    function getTierInfo(uint256 tierId) external view returns (
        uint256 minKYCLevel,
        uint256 allocationPercentage,
        uint256 startTime
    ) {
        TierInfo storage tierInfo = tiers[tierId];
        return (
            tierInfo.minKYCLevel,
            tierInfo.allocationPercentage,
            tierInfo.startTime
        );
    }
    
    /**
     * @dev Gets the investor's subscription and allocation
     * @param investor Address of the investor
     * @return Subscription and allocation amounts
     */
    function getInvestorStatus(address investor) external view returns (
        uint256 subscription,
        uint256 allocation
    ) {
        return (subscriptions[investor], allocations[investor]);
    }
}