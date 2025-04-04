import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Button, Form, Input, Upload, message, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MusicNFT } from '../contracts';
import AudioPlayer from '../components/AudioPlayer';

const { Title, Text } = Typography;

const Mint = () => {
  const { isConnected } = useAccount();
  const [audioFile, setAudioFile] = useState(null);
  const [form] = Form.useForm();

  const { config } = usePrepareContractWrite({
    address: MusicNFT.address,
    abi: MusicNFT.abi,
    functionName: 'mint',
    args: [
      form.getFieldValue('name') || '',
      form.getFieldValue('description') || '',
      audioFile ? URL.createObjectURL(audioFile) : '',
    ],
    enabled: isConnected && !!audioFile,
  });

  const { write: mint, isLoading } = useContractWrite({
    ...config,
    onSuccess: () => {
      message.success('NFT minted successfully!');
      form.resetFields();
      setAudioFile(null);
    },
    onError: (error) => {
      message.error(`Failed to mint NFT: ${error.message}`);
    },
  });

  const handleMint = async () => {
    try {
      await form.validateFields();
      if (!audioFile) {
        message.error('Please upload an audio file');
        return;
      }
      mint?.();
    } catch (error) {
      console.error('Minting error:', error);
    }
  };

  const beforeUpload = (file) => {
    const isAudio = file.type.startsWith('audio/');
    if (!isAudio) {
      message.error('You can only upload audio files!');
    }
    return isAudio;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Mint Your Music NFT</Title>
        <Text type="secondary">Create and mint your unique music NFT on Arbitrum Sepolia</Text>
        
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600, marginTop: 24 }}
        >
          <Form.Item
            name="name"
            label="NFT Name"
            rules={[{ required: true, message: 'Please input the NFT name!' }]}
          >
            <Input placeholder="Enter NFT name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea placeholder="Enter NFT description" />
          </Form.Item>

          <Form.Item
            label="Audio File"
            required
          >
            <Upload
              beforeUpload={beforeUpload}
              onChange={(info) => {
                if (info.file.status === 'done') {
                  setAudioFile(info.file.originFileObj);
                  message.success(`${info.file.name} file uploaded successfully`);
                }
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Audio</Button>
            </Upload>
          </Form.Item>

          {audioFile && (
            <div style={{ marginTop: 16 }}>
              <AudioPlayer audioFile={audioFile} />
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              onClick={handleMint}
              loading={isLoading}
              disabled={!isConnected || !audioFile}
              style={{ marginTop: 16 }}
            >
              {isConnected ? 'Mint NFT' : 'Connect Wallet to Mint'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Mint; 