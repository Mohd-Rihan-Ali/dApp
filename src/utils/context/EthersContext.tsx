import { ethers } from "ethers";
import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// interface State {
//   account: string | null;
//   recipient: string;
//   amount: string;
//   currentNetwork: string;
// }

const initialContext = {
  ethersAccount: null,
  ethersRecipient: "",
  ethersAmount: "",
  ethersBalance: "",
  bnbBalance: "",
  ethersCurrentNetwork: "",
  isLoading: false,
  isSwitching: false,
  isTransfering: false,
};

export const EthersContext = createContext<{
  ethersContext: any;
  setEthersAccount: (account: string) => void;
  setEthersRecipient: (recipient: string) => void;
  setEthersAmount: (amount: string) => void;
  setEthersCurrentNetwork: (currentNetwork: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSwitching: (isSwitching: boolean) => void;
  setIsTransfering: (isTransfering: boolean) => void;
}>({
  ethersContext: initialContext,
  setEthersAccount: () => {},
  setEthersRecipient: () => {},
  setEthersAmount: () => {},
  setEthersCurrentNetwork: () => {},
  setIsLoading: () => {},
  setIsSwitching: () => {},
  setIsTransfering: () => {},
});

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ethersAccount, setEthersAccount] = useState<string | null>(null);
  const [ethersRecipient, setEthersRecipient] = useState<string>("");
  const [ethersAmount, setEthersAmount] = useState<string>("");
  const [ethersCurrentNetwork, setEthersCurrentNetwork] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [isTransfering, setIsTransfering] = useState<boolean>(false);
  let ethersBalance = 0;
  let bnbBalance = 0;

  const ethersBalanceQuery = useQuery({
    queryKey: [],
    queryFn: async () => {
      if (ethersAccount) {
        return await fetch(
          `http://localhost:8800/api/eth-balance/${ethersAccount}`
        ).then((res) => res.json());
      }
    },
    enabled: !!ethersAccount,
  });

  ethersBalance = ethersBalanceQuery.data;

  const bnbBalanceQuery = useQuery({
    queryKey: [],
    queryFn: async () => {
      if (ethersAccount) {
        return await fetch(
          `http://localhost:8800/api/bnb-balance/${ethersAccount}`
        ).then((res) => res.json());
      }
    },
    enabled: !!ethersAccount,
  });

  bnbBalance = bnbBalanceQuery.data;

  const EthersWalletConnect = async () => {
    setIsLoading(true);

    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setEthersAccount(address);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("Please install MetaMask!");
      console.log("Please install MetaMask!");
    }
    setIsLoading(false);
  };

  const EthersSwitchNetwork = async (network: number) => {
    setIsSwitching(true);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${network.toString(16)}` },
      ]);
      setEthersCurrentNetwork((await provider.getNetwork()).name);
      console.log(ethersCurrentNetwork);
    } catch (switchError) {
      console.error(switchError);
    }
    setIsSwitching(false);
  };

  const EthersEthTransfer = async () => {
    setIsTransfering(true);
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const signer = provider.getSigner();

        const balance = await signer.getBalance();
        console.log(balance.toString());
        const amountInWei = ethers.utils.parseEther(ethersAmount);

        // Check for sufficient balance
        if (balance.lt(amountInWei)) {
          alert("Insufficient balance");
          console.error("Insufficient balance");
          setIsTransfering(false);
          return;
        }

        const tx = await signer.sendTransaction({
          to: ethersRecipient,
          value: amountInWei,
        });
        const receipt = await tx.wait();

        console.log(receipt);
        alert("Transaction successful");
      } catch (err) {
        console.error(err);
        alert("Transaction failed");
      }
    } else {
      alert("Please install MetaMask!");
      console.log("Please install MetaMask!");
    }
    setIsTransfering(false);
  };

  return (
    <EthersContext.Provider
      value={{
        ethersContext: {
          ethersAccount,
          ethersRecipient,
          ethersAmount,
          ethersCurrentNetwork,
          ethersBalance,
          bnbBalance,
          isLoading,
          isSwitching,
          isTransfering,
          EthersWalletConnect,
          EthersSwitchNetwork,
          EthersEthTransfer,
        },
        setEthersAccount,
        setEthersRecipient,
        setEthersAmount,
        setEthersCurrentNetwork,
        setIsLoading,
        setIsSwitching,
        setIsTransfering,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export const useEthersDapp = () => useContext(EthersContext);
