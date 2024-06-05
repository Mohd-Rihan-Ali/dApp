import { useEthersDapp } from "../utils/context/EthersContext";
import { useWeb3Dapp } from "../utils/context/Web3Context";

const NetworkSwitch = () => {
  const { ethersContext } = useEthersDapp();
  const { web3Context } = useWeb3Dapp();

  return (
    <div>
      <div>
        <button onClick={() => web3Context.Web3SwitchNetwork(1)}>
          {web3Context.isSwitching
            ? "wait switching..."
            : "Switch to Mainnet via web3"}
        </button>
        <p>{web3Context.currentNetwork}</p>
      </div>

      <div>
        <button onClick={() => ethersContext.EthersSwitchNetwork(1)}>
          {ethersContext.isSwitching
            ? "wait switching..."
            : "Switch to Mainnet via ethers"}
        </button>
        <p>{ethersContext.ethersCurrentNetwork}</p>
      </div>
    </div>
  );
};

export default NetworkSwitch;

// const switchNetworkWeb3 = async (network: number) => {
//   const web3 = new Web3((window as any).ethereum);
//   try {
//     await (window as any).ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: `0x${network.toString(16)}` }],
//     });
//     setCurrentNetwork(await (web3.eth.net as any).getNetworkType());
//   } catch (switchError) {
//     console.error(switchError);
//   }
// };
