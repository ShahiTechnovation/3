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

export default WalletConnect;