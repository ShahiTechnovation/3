require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 7545,        // Ganache default port
      network_id: "*",   // Match any network ID
    },
    arbitrumSepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY, // Private key from .env
          process.env.ARBITRUM_SEPOLIA_RPC // RPC URL from .env
        ),
      network_id: 421613, // Arbitrum Sepolia network ID
      gas: 8000000, // Gas limit
      gasPrice: 1000000000, // 1 Gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Specify the Solidity version
    },
  },
};
