export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  audio: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

export interface NFT {
  id: number;
  uri: string;
  metadata: NFTMetadata;
  owner: string;
} 