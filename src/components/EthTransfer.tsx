import Web3, { eth } from "web3";
import { useEthersDapp } from "../utils/context/EthersContext";
import { useWeb3Dapp } from "../utils/context/Web3Context";

export const EthTransferEther = () => {
  const { ethersContext, setEthersAmount, setEthersRecipient } = useEthersDapp();
  const { web3Context, setweb3Amount, setweb3Recipient } = useWeb3Dapp();
  return (
    <>
      <div>
        <input
          type="text"
          placeholder={
            ethersContext.isTransfering ? "transfering..." : "Recipient Address"
          }
          onChange={(e) => setEthersRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder={
            ethersContext.isTransfering ? "transfering..." : "Amount in Ether"
          }
          onChange={(e) => setEthersAmount(e.target.value)}
        />
        <button onClick={ethersContext.EthersEthTransfer}>Transfer</button>
        <p>{ethersContext.recipient}</p>
        <p>{ethersContext.amount}</p>
      </div>

      <div>
        <input
          type="text"
          placeholder={
            web3Context.isTransfering ? "transfering..." : "Recipient Address"
          }
          onChange={(e) => setweb3Recipient(e.target.value)}
        />
        <input
          type="text"
          placeholder={
            web3Context.isTransfering ? "transfering..." : "Amount in Ether"
          }
          onChange={(e) => setweb3Amount(e.target.value)}
        />
        <button onClick={web3Context.Web3EthTransfer}>Transfer</button>
      </div>
    </>
  );
};

// export const EthTransferWeb3 = () => {
//   const [recipient, setRecipient] = useState<string>("");
//   const [amount, setAmount] = useState<string>("");

//   const transfer = async () => {
//     if ((window as any).ethereum) {
//       try {
//         const web3 = new Web3((window as any).ethereum);
//         const accounts = await web3.eth.getAccounts();
//         const tx = await web3.eth.sendTransaction({
//           from: accounts[0],
//           to: recipient,
//           value: web3.utils.toWei(amount, "ether"),
//         });
//         console.log(tx);
//         alert("Transaction successful");
//       } catch (err) {
//         console.error(err);
//         alert("Transaction failed");
//       }
//     } else {
//       alert("Please install MetaMask!");
//       console.log("Please install MetaMask!");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Recipient Address"
//         onChange={(e) => setRecipient(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Amount"
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={Web3EthTransfer}>Transfer</button>
//     </div>
//   );
// };
