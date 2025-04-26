// packages/nextjs/hooks/useWeb3AuthMPC.ts
import { useState, useEffect, useCallback } from 'react';
import { Web3AuthMPCConnector } from '../services/web3/Web3AuthMPCConnector';
import { optimismSepolia } from 'wagmi/chains'; // or whatever chain you're using
import { ethers } from 'ethers';

type UserInfo = {
  email?: string;
  name?: string;
  profileImage?: string;
  verifier?: string;
  verifierId?: string;
  typeOfLogin?: string;
  aggregateVerifier?: string;
  [key: string]: unknown;
};

export const useWeb3AuthMPC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [connector, setConnector] = useState<Web3AuthMPCConnector | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initConnector = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
        if (!clientId) {
          setError("Missing Web3Auth client ID. Please set NEXT_PUBLIC_WEB3AUTH_CLIENT_ID in your .env file");
          return;
        }

        const web3AuthConnector = new Web3AuthMPCConnector({
          chains: [optimismSepolia], // Use your preferred chain
          options: { clientId },
        });

        setConnector(web3AuthConnector);

        // Check if the user is already connected
        const isAuthorized = await web3AuthConnector.isAuthorized();
        if (isAuthorized) {
          await fetchUserData(web3AuthConnector);
        }
      } catch (err) {
        console.error("Error initializing Web3Auth MPC:", err);
        setError("Failed to initialize Web3Auth MPC");
      }
    };

    if (typeof window !== 'undefined') {
      initConnector();
    }
  }, []);

  const fetchUserData = async (web3AuthConnector: Web3AuthMPCConnector) => {
    try {
      // Get account
      const account = await web3AuthConnector.getAccount();
      setAccount(account);

      // Get provider
      const provider = await web3AuthConnector.getProvider();
      setProvider(provider);

      // Get signer
      const signer = await web3AuthConnector.getSigner();
      setSigner(signer);

      // Get user info
      const userInfo = await web3AuthConnector.getUserInfo();
      setUserInfo(userInfo);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data");
    }
  };

  const login = useCallback(async () => {
    if (!connector) return;

    try {
      setIsLoading(true);
      setError(null);

      await connector.connect();
      await fetchUserData(connector);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login with Web3Auth MPC");
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  const logout = useCallback(async () => {
    if (!connector) return;

    try {
      setIsLoading(true);
      await connector.disconnect();
      setAccount(null);
      setProvider(null);
      setSigner(null);
      setUserInfo(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  return {
    account,
    provider,
    signer,
    userInfo,
    isLoading,
    error,
    login,
    logout,
    isConnected: !!account,
    isInitialized: !!connector,
  };
};