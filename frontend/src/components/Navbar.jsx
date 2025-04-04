import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', marginRight: 24 }}>
          <HomeOutlined style={{ fontSize: '24px' }} />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item key="mint" icon={<PlusOutlined />}>
            <Link to="/mint">Mint</Link>
          </Menu.Item>
          <Menu.Item key="my-nfts" icon={<UserOutlined />}>
            <Link to="/my-nfts">My NFTs</Link>
          </Menu.Item>
        </Menu>
      </div>
      <ConnectButton />
    </Header>
  );
};

export default Navbar; 