import { ethers } from "ethers";
import { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";

// interface State {
//   account: string | null;
//   recipient: string;
//   amount: string;
//   currentNetwork: string;
// }

const initialContext = {
  account: null,
  recipient: "",
  amount: "",
  currentNetwork: "",
  isLoading: false,
  isSwitching: false,
  isTransfering: false,
};

export const Web3Context = createContext<{
  web3Context: any;
  setweb3Account: (account: string) => void;
  setweb3Recipient: (recipient: string) => void;
  setweb3Amount: (amount: string) => void;
  setweb3CurrentNetwork: (currentNetwork: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSwitching: (isSwitching: boolean) => void;
  setIsTransfering: (isTransfering: boolean) => void;
}>({
  web3Context: initialContext,
  setweb3Account: () => {},
  setweb3Recipient: () => {},
  setweb3Amount: () => {},
  setweb3CurrentNetwork: () => {},
  setIsLoading: () => {},
  setIsSwitching: () => {},
  setIsTransfering: () => {},
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setweb3Account] = useState<string | null>(null);
  const [recipient, setweb3Recipient] = useState<string>("");
  const [amount, setweb3Amount] = useState<string>("");
  const [currentNetwork, setweb3CurrentNetwork] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [isTransfering, setIsTransfering] = useState<boolean>(false);

  const Web3WalletConnect = async () => {
    setIsLoading(true);
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);

      try {
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = await web3.eth.getAccounts();
        setweb3Account(accounts[0]);
      } catch (err) {
        console.log("Account didn't found ); ", err);
      }
    } else {
      alert("Please install Metamask");
      console.log("Please install Metamask");
    }
    setIsLoading(false);
  };

  const Web3SwitchNetwork = async (network: number) => {
    setIsSwitching(true);

    const web3 = new Web3((window as any).ethereum);
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${network.toString(16)}` }],
      });
      setweb3CurrentNetwork(await (web3.eth.net as any).getNetworkType());
    } catch (switchError) {
      console.error(switchError);
    }

    setIsSwitching(false);
  };

  const Web3EthTransfer = async () => {
    setIsTransfering(true);
    if ((window as any).ethereum) {
      try {
        const web3 = new Web3((window as any).ethereum);
        const accounts = await web3.eth.getAccounts();
        const tx = await web3.eth.sendTransaction({
          from: accounts[0],
          to: recipient,
          // gas: "128028",
          // gasPrice: web3.utils.toWei("0.00000002", "ether"),
          value: web3.utils.toWei(amount, "ether"),
        });
        console.log(tx);
        alert("Transaction successful");
      } catch (err) {
        console.error("Error: ", err);
        alert("Transaction failed");
      }
    } else {
      alert("Please install MetaMask!");
      console.log("Please install MetaMask!");
    }
    setIsTransfering(false);
  };

  return (
    <Web3Context.Provider
      value={{
        web3Context: {
          account,
          recipient,
          amount,
          currentNetwork,
          isLoading,
          isSwitching,
          isTransfering,
          Web3WalletConnect,
          Web3SwitchNetwork,
          Web3EthTransfer,
        },
        setweb3Account,
        setweb3Recipient,
        setweb3Amount,
        setweb3CurrentNetwork,
        setIsLoading,
        setIsSwitching,
        setIsTransfering,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Dapp = () => useContext(Web3Context);
