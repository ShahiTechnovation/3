import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Card, Typography, List, Button, message } from 'antd';
import { MusicNFT } from '../contracts';

const { Title, Text } = Typography;

const useTokenURIs = (address, balance) => {
  const [tokenURIs, setTokenURIs] = useState([]);

  useEffect(() => {
    const fetchTokenURIs = async () => {
      if (!address || !balance) return;

      const nftPromises = [];
      for (let i = 0; i < Number(balance); i++) {
        nftPromises.push(
          fetch(MusicNFT.address, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [
                {
                  to: MusicNFT.address,
                  data: '0xc87b56dd' + i.toString(16).padStart(64, '0'), // tokenURI function selector + tokenId
                },
                'latest',
              ],
              id: 1,
            }),
          })
            .then((res) => res.json())
            .then((data) => data.result)
        );
      }

      try {
        const results = await Promise.all(nftPromises);
        setTokenURIs(
          results.map((result, index) => ({
            id: index,
            uri: result ? `https://ipfs.io/ipfs/${result.slice(2)}` : '',
          }))
        );
      } catch (error) {
        console.error('Error fetching token URIs:', error);
        message.error('Failed to fetch token URIs');
      }
    };

    fetchTokenURIs();
  }, [address, balance]);

  return tokenURIs;
};

const MyNFTs = () => {
  const { address, isConnected } = useAccount();

  const { data: balance } = useContractRead({
    address: MusicNFT.address,
    abi: MusicNFT.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  const tokenURIs = useTokenURIs(address, balance);

  if (!isConnected) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Title level={2}>My NFTs</Title>
        <Text>Please connect your wallet to view your NFTs</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>My NFTs</Title>
      <Text type="secondary">View and manage your music NFTs</Text>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={tokenURIs}
        renderItem={(nft) => (
          <List.Item>
            <Card
              cover={
                <div style={{ padding: '16px' }}>
                  <audio controls style={{ width: '100%' }}>
                    <source src={nft.uri} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              }
            >
              <Card.Meta
                title={`NFT #${nft.id}`}
                description={
                  <Button type="link" onClick={() => window.open(nft.uri, '_blank')}>
                    View on IPFS
                  </Button>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyNFTs; 