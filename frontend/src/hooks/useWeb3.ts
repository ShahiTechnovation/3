import { useState, useEffect, createContext, useContext } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { WalletContextType, WalletState } from '../types/wallet';

const WalletContext = createContext<WalletContextType | null>(null);

export const useWeb3 = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWeb3 must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    error: null,
  });

  useEffect(() => {
    setState({
      isConnected,
      address: address || null,
      chainId: chain?.id || null,
      error: connectError || null,
    });
  }, [isConnected, address, chain?.id, connectError]);

  const connectWallet = async () => {
    try {
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setState(prev => ({ ...prev, error: error as Error }));
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setState({
      isConnected: false,
      address: null,
      chainId: null,
      error: null,
    });
  };

  const switchNetworkHandler = async (chainId: number) => {
    try {
      await switchNetwork?.(chainId);
    } catch (error) {
      console.error('Error switching network:', error);
      setState(prev => ({ ...prev, error: error as Error }));
    }
  };

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect: connectWallet,
        disconnect: disconnectWallet,
        switchNetwork: switchNetworkHandler,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}; 