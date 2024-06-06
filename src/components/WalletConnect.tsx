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
        <p>The balance of ETH: {ethersContext.ethersBalance} ETH</p>
        <p>The balance of BNB: {ethersContext.bnbBalance} BNB</p>
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
