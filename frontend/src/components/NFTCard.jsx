import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  // Connect to the user's wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = web3Provider.getSigner();
        const account = await signer.getAddress();

        setProvider(web3Provider);
        setSigner(signer);
        setAccount(account);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  // Check if the user is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          const signer = web3Provider.getSigner();
          const account = await signer.getAddress();

          setProvider(web3Provider);
          setSigner(signer);
          setAccount(account);
        }
      }
    };
    checkConnection();
  }, []);

  return { provider, signer, account, connectWallet };
};

export { useWeb3 };

import React from "react";
import useWeb3 from "../hooks/useWeb3";

const WalletConnect = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
    </div>
  );
};

import React from "react";

const NFTCard = ({ title, artist, album, tokenUri }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "16px", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <p><strong>Artist:</strong> {artist}</p>
      <p><strong>Album:</strong> {album}</p>
      <a href={tokenUri} target="_blank" rel="noopener noreferrer">
        View on IPFS
      </a>
    </div>
  );
};

export default NFTCard;
