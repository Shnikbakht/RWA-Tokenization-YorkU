// web3auth/web3AuthConnector.ts
import { Web3AuthMPCCoreKit } from "@web3auth/mpc-core-kit";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { Chain } from "wagmi/chains";

export class Web3AuthConnector {
  web3auth: Web3AuthMPCCoreKit;

  constructor(clientId: string, chain: Chain) {
    this.web3auth = new Web3AuthMPCCoreKit({
      clientId,
      web3AuthNetwork: "testnet",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: `0x${chain.id.toString(16)}`,
        rpcTarget: chain.rpcUrls.default.http[0],
      },
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: "testnet",
        uxMode: "popup",
      },
    });

    this.web3auth.configureAdapter(openloginAdapter);
  }

  async connect() {
    await this.web3auth.init();
    const provider = await this.web3auth.connect();
    const ethersProvider = new Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const account = await signer.getAddress();
    const chainId = await signer.getChainId();

    return {
      account,
      chain: { id: chainId, unsupported: false },
      provider,
    };
  }

  async disconnect() {
    await this.web3auth.logout();
  }
}
