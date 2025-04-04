const hre = require("hardhat");

async function main() {
  console.log("Deploying MusicNFT contract...");

  // Get the contract factory
  const MusicNFT = await hre.ethers.getContractFactory("MusicNFT");
  
  // Deploy the contract
  const musicNFT = await MusicNFT.deploy();
  
  // Wait for deployment to complete
  await musicNFT.waitForDeployment();
  
  // Get the deployed contract address
  const address = await musicNFT.getAddress();
  console.log("MusicNFT deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 