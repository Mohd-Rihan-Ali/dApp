import { ethers } from "ethers";
import { useContext, useState } from "react";
import Web3 from "web3";
import { useEthersDapp } from "../utils/context/EthersContext";
import { useWeb3Dapp } from "../utils/context/Web3Context";

export const WalletConnect = () => {
  const { ethersContext } = useEthersDapp();
  const { web3Context } = useWeb3Dapp();

  return (
    <>
      <div>
        <button onClick={ethersContext.EthersWalletConnect}>
          {ethersContext.isLoading
            ? "Connecting..."
            : "Connect Wallet via Ethers"}
        </button>
        {ethersContext.ethersAccount && (
          <p>Connected Account: {ethersContext.ethersAccount}</p>
        )}
      </div>
      <div>
        <button onClick={web3Context.Web3WalletConnect}>
          {web3Context.isLoading ? "Connecting..." : "Connect Wallet via Web3"}
        </button>
        {web3Context.account && <p>Connected Account: {web3Context.account}</p>}
      </div>
    </>
  );
};

// export const Web3WalletConnect = () => {
//   const [account, setAccount] = useState<string | null>(null);

// const connectWallet = async () => {
//   if ((window as any).ethereum) {
//     const web3 = new Web3((window as any).ethereum);

//     try {
//       await (window as any).ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       const accounts = await web3.eth.getAccounts();
//       setAccount(accounts[1]);
//     } catch (err) {
//       console.log("Account didn't found ); ", err);
//     }
//   } else {
//     alert("Please install Metamask");
//     console.log("Please install Metamask");
//   }
// };

// return (
// <div>
//   <button onClick={connectWallet}>Connect Wallet via Web3</button>
//   {account && <p>Connected Account: {account}</p>}
// </div>
// );
// };
