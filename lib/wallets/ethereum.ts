import { HDNodeWallet, Wallet } from "ethers";

export function generateEthereumWallet(seed: Buffer) {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath("m/44'/60'/0'/0/0");

  const wallet = new Wallet(child.privateKey);

  return {
    chain: "Ethereum",
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}
