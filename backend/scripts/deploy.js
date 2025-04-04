const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const MusicNFT = await hre.ethers.getContractFactory("MusicNFT");

  // Deploy the contract
  const musicNFT = await MusicNFT.deploy();

  // Wait for the deployment to complete
  await musicNFT.deployed();

  console.log("MusicNFT deployed to:", musicNFT.address);
}

// Run the script
main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});
