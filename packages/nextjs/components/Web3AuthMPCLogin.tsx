"use client";

import { useWeb3AuthMPC } from "../hooks/useWeb3AuthMPC";

export const Web3AuthMPCLogin = () => {
  const {
    account,
    userInfo,
    isLoading,
    error,
    login,
    logout,
    isConnected,
    isInitialized,
  } = useWeb3AuthMPC();

  return (
    <div className="p-4 max-w-md mx-auto rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Web3Auth MPC Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>  
        
      )}
      
      {isConnected ? (
        <div className="space-y-4">
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            <p className="font-medium">Connected Account:</p>
            <p className="text-sm break-all">{account}</p>
            
            {userInfo && (
              <div className="mt-2">
                <p className="font-medium">User Info:</p>
                {userInfo.name && <p className="text-sm">Name: {userInfo.name}</p>}
                {userInfo.email && <p className="text-sm">Email: {userInfo.email}</p>}
                {userInfo.typeOfLogin && (
                  <p className="text-sm">Login Method: {userInfo.typeOfLogin}</p>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={logout}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Logging out..." : "Disconnect Wallet"}
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          disabled={isLoading || !isInitialized}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:opacity-50"
        >
          {isLoading 
            ? "Connecting..." 
            : !isInitialized 
              ? "Initializing..." 
              : "Login with Web3Auth MPC"}
        </button>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>
          Web3Auth MPC provides enhanced security through Multi-Party Computation,
          protecting your private keys.
        </p>
      </div>
    </div>
  );
};

export default Web3AuthMPCLogin;