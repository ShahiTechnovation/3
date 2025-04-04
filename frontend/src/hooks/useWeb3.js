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

export default useWeb3;