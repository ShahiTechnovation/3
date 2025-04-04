export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  error: Error | null;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
} 