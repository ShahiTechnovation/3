export interface MusicNFT {
  mint: (uri: string) => Promise<any>;
  balanceOf: (owner: string) => Promise<number>;
  tokenURI: (tokenId: number) => Promise<string>;
  totalSupply: () => Promise<number>;
}

export interface ContractConfig {
  address: string;
  abi: any[];
} 