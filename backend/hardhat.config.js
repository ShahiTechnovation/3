require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC, // RPC URL for Arbitrum Sepolia
      accounts: [process.env.PRIVATE_KEY],  // Private key for deployment
    },
  },
};

import { ethers } from "hardhat";

async function main() {
  // Ensure the Hardhat Runtime Environment (hre) is properly set up
  console.log("Starting deployment...");

  // Get the contract factory for MusicNFT
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
    // Deploy the contract
    const musicNFT = await MusicNFT.deploy();
  
    // Wait for the deployment to complete
    await musicNFT.deployed();
  
    // Log the deployed contract address
    console.log("MusicNFT deployed to:", musicNFT.address);
  }

// Run the script and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });