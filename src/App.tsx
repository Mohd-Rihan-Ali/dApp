import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { WalletConnect } from "./components/WalletConnect";
import NetworkSwitch from "./components/NetworkSwitch";
import { EthTransferEther } from "./components/EthTransfer";

export const App = () => {
  return (
    <div className="App">
      <h1>DAPP</h1>

      <h2>Connect to wallet</h2>
      <WalletConnect />

      <h2>Network Switching</h2>
      <NetworkSwitch />

      <h2>Transfer amount in Eth</h2>
      <EthTransferEther />
    </div>
  );
};
