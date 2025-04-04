import React from 'react';
import { Card, Image, Typography, Button } from 'antd';
import { NFT } from '../types/nft';
import AudioPlayer from './AudioPlayer';

const { Title, Text } = Typography;

interface NFTCardProps {
  nft: NFT;
  onPlay: (audioUrl: string) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onPlay }) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          alt={nft.metadata.name}
          src={nft.metadata.image}
          preview={false}
        />
      }
    >
      <Title level={4}>{nft.metadata.name}</Title>
      <Text type="secondary">{nft.metadata.description}</Text>
      <div style={{ marginTop: '1rem' }}>
        <AudioPlayer
          audioUrl={nft.metadata.audio}
          onPlay={() => onPlay(nft.metadata.audio)}
        />
      </div>
      <Button type="primary" block style={{ marginTop: '1rem' }}>
        View Details
      </Button>
    </Card>
  );
};

export default NFTCard; 