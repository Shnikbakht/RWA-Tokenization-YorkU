// packages/nextjs/web3auth/Web3AuthMPCConnector.ts
import { MPCCoreKit } from "@web3auth/mpc-core-kit";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Connector } from "wagmi";
import type { Chain } from "@wagmi/core";
import { ethers } from "ethers";

export class Web3AuthMPCConnector extends Connector {
  id = "web3auth-mpc";
  name = "Web3Auth MPC";
  ready = true;

  private mpcCoreKit?: MPCCoreKit;
  private chainConfig: CustomChainConfig;

  constructor({ chains, options }: { chains: Chain[]; options: { clientId: string } }) {
    super({ chains });
    
    // Get the first chain from the chains array
    const chain = chains[0] || { 
      id: 1, 
      name: "Ethereum Mainnet", 
      nativeCurrency: { name: "Ethereum", symbol: "ETH" },
      rpcUrls: { default: { http: ["https://rpc.ankr.com/eth"] } },
      blockExplorers: { default: { url: "https://etherscan.io" } }
    };
    
    // Convert chain to the format expected by Web3Auth
    this.chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: `0x${chain.id.toString(16)}`,
      rpcTarget: chain.rpcUrls.default.http[0],
      displayName: chain.name,
      blockExplorer: chain.blockExplorers?.default.url,
      ticker: chain.nativeCurrency?.symbol,
      tickerName: chain.nativeCurrency?.name,
    };

    // Initialize MPC Core Kit
    this.initMPCCoreKit(options.clientId);
  }

  private async initMPCCoreKit(clientId: string) {
    try {
      // Initialize MPC Core Kit
      this.mpcCoreKit = new MPCCoreKit({
        clientId,
        web3AuthNetwork: "testnet", // or "mainnet" for production
        chainConfig: this.chainConfig,
      });

      // Configure the Ethereum provider
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig: this.chainConfig },
      });

      // Create and configure the OpenLogin adapter
      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
          uxMode: "popup", // can be "popup" or "redirect"
          loginConfig: {
            // Add login methods you want to enable
            google: {
              name: "Google",
              verifier: "google", // Web3Auth's verifier name
              typeOfLogin: "google",
              clientId: "", // Google Client ID if you've set up your own OAuth app
            },
            // Add other login methods as needed
          },
        },
      });

      // Add the OpenLogin adapter to the Core Kit
      this.mpcCoreKit.configureAdapter(openloginAdapter);
      
      // Initialize the MPC Core Kit
      await this.mpcCoreKit.init();
      
      console.log("MPC Core Kit initialized successfully");
    } catch (error) {
      console.error("Error initializing MPC Core Kit:", error);
    }
  }

  async connect() {
    try {
      if (!this.mpcCoreKit) {
        throw new Error("MPC Core Kit not initialized");
      }
      
      // Connect the user
      const provider = await this.mpcCoreKit.connect();
      
      // Get the Ethereum provider and signer
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      const account = await signer.getAddress();
      const chainId = await signer.getChainId();
      
      return {
        account,
        chain: {
          id: Number(chainId),
          unsupported: false,
        },
        provider,
      };
    } catch (error) {
      console.error("Error connecting with Web3Auth MPC:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (!this.mpcCoreKit) {
        throw new Error("MPC Core Kit not initialized");
      }
      
      await this.mpcCoreKit.logout();
    } catch (error) {
      console.error("Error disconnecting from Web3Auth MPC:", error);
      throw error;
    }
  }

  async getAccount() {
    try {
      if (!this.mpcCoreKit) {
        throw new Error("MPC Core Kit not initialized");
      }
      
      const provider = this.mpcCoreKit.provider;
      if (!provider) throw new Error("No provider found");
      
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      return signer.getAddress();
    } catch (error) {
      console.error("Error getting account:", error);
      throw error;
    }
  }

  async getProvider() {
    if (!this.mpcCoreKit) {
      throw new Error("MPC Core Kit not initialized");
    }
    
    return this.mpcCoreKit.provider;
  }

  async getSigner() {
    try {
      if (!this.mpcCoreKit) {
        throw new Error("MPC Core Kit not initialized");
      }
      
      const provider = this.mpcCoreKit.provider;
      if (!provider) throw new Error("No provider found");
      
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      return ethersProvider.getSigner();
    } catch (error) {
      console.error("Error getting signer:", error);
      throw error;
    }
  }

  async isAuthorized() {
    try {
      if (!this.mpcCoreKit) {
        return false;
      }
      
      return this.mpcCoreKit.connected;
    } catch (error) {
      return false;
    }
  }
  
  // If you need to get user info from Web3Auth
  async getUserInfo() {
    try {
      if (!this.mpcCoreKit) {
        throw new Error("MPC Core Kit not initialized");
      }
      
      if (!this.mpcCoreKit.connected) {
        throw new Error("User not connected");
      }
      
      return this.mpcCoreKit.getUserInfo();
    } catch (error) {
      console.error("Error getting user info:", error);
      throw error;
    }
  }
}