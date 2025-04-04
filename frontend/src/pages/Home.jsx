import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home = () => {
  return (
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        {/* Hero Section */}
        <Row align="middle" justify="space-between" style={{ marginBottom: 64 }}>
          <Col span={12}>
            <Title level={1} style={{ fontSize: '48px', marginBottom: 24 }}>
              Create and Trade Music NFTs
            </Title>
            <Paragraph style={{ fontSize: '18px', marginBottom: 32 }}>
              Mint your music as NFTs, connect with fans, and build your digital music collection on the blockchain.
            </Paragraph>
            <Space>
              <Link to="/mint">
                <Button type="primary" size="large" icon={<PlayCircleOutlined />}>
                  Start Minting
                </Button>
              </Link>
              <Link to="/my-nfts">
                <Button size="large" icon={<ArrowRightOutlined />}>
                  View My NFTs
                </Button>
              </Link>
            </Space>
          </Col>
          <Col span={10}>
            <Image
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Music NFT Platform"
              preview={false}
              style={{ borderRadius: '8px' }}
            />
          </Col>
        </Row>

        {/* Features Section */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          Why Choose Our Platform
        </Title>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <Card hoverable>
              <Title level={3}>Easy Minting</Title>
              <Paragraph>
                Upload your music, add metadata, and mint your NFTs in just a few clicks.
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <Title level={3}>Secure Trading</Title>
              <Paragraph>
                Trade your music NFTs securely on the blockchain with transparent ownership.
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable>
              <Title level={3}>Artist Support</Title>
              <Paragraph>
                Get direct support from fans and earn royalties from secondary sales.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <Title level={2}>Ready to Start Your Music NFT Journey?</Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: 32 }}>
            Join thousands of artists who are already minting their music as NFTs.
          </Paragraph>
          <Link to="/mint">
            <Button type="primary" size="large" icon={<PlayCircleOutlined />}>
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </Content>
  );
};

export default Home;