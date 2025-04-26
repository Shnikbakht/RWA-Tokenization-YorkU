// packages/nextjs/web3auth/Web3AuthConnector.ts
import { MPCCoreKit } from "@web3auth/mpc-core-kit";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Connector } from "wagmi";
import type { Chain } from "@wagmi/core";
import { ethers } from "ethers";

export class Web3AuthConnector extends Connector {
  id = "web3auth";
  name = "Web3Auth";
  ready = true;

  private coreKitInstance?: MPCCoreKit;

  constructor({ chains, options }: { chains: Chain[]; options: { clientId: string } }) {
    super({ chains });
    
    // Convert the first chain in the chains array to the format expected by Web3Auth
    const chainId = `0x${chains[0]?.id.toString(16) || '1'}`;
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId,
      rpcTarget: chains[0]?.rpcUrls.default.http[0] || "https://rpc.ankr.com/eth",
      displayName: chains[0]?.name || "Ethereum Mainnet",
      blockExplorer: chains[0]?.blockExplorers?.default.url || "https://etherscan.io",
      ticker: chains[0]?.nativeCurrency?.symbol || "ETH",
      tickerName: chains[0]?.nativeCurrency?.name || "Ethereum",
    };

    // Initialize MPCCoreKit
    this.coreKitInstance = new MPCCoreKit({
      clientId: options.clientId,
      web3AuthNetwork: "testnet", // or "mainnet" for production
      chainConfig,
    });

    // Configure the Ethereum provider
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
    });

    // Create and configure the OpenLogin adapter
    const openloginAdapter = new OpenloginAdapter({
      privateKeyProvider,
      adapterSettings: {
        network: "testnet", // or "mainnet" for production
        uxMode: "popup", // can be "popup" or "redirect"
      },
    });

    // Add the OpenLogin adapter to the Core Kit
    this.coreKitInstance.configureAdapter(openloginAdapter);
  }

  async connect() {
    try {
      // Initialize the MPC Core Kit modal
      await this.coreKitInstance!.init();
      
      // Connect the user
      const provider = await this.coreKitInstance!.connect();
      
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
      console.error("Error connecting with Web3Auth:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.coreKitInstance?.logout();
    } catch (error) {
      console.error("Error disconnecting from Web3Auth:", error);
      throw error;
    }
  }

  async getAccount() {
    try {
      const provider = await this.coreKitInstance?.provider;
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
    return this.coreKitInstance?.provider;
  }

  async getSigner() {
    try {
      const provider = await this.coreKitInstance?.provider;
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
      return !!this.coreKitInstance?.connected;
    } catch (error) {
      return false;
    }
  }
}