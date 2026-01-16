import axios from "axios";
import { Connection, PublicKey,clusterApiUrl } from "@solana/web3.js";
import { ethers } from "ethers";


const ethProvider = new ethers.JsonRpcProvider(
  "https://ethereum.publicnode.com"
);

export async function getEthereumBalance(address: string): Promise<string> {
  const balance = await ethProvider.getBalance(address);
  return ethers.formatEther(balance);
}



const solConnection = new Connection(clusterApiUrl('devnet'),"confirmed")
export async function getSolanaBalance(address: string): Promise<number> {
  const pubKey = new PublicKey(address);
  const balance = await solConnection.getBalance(pubKey);
  return balance / 1e9;  // conversion of lamps to SOL
}


export async function getBitcoinBalance(address: string): Promise<number> {
  const res = await axios.get(
    `https://blockstream.info/api/address/${address}`
  );

  const funded =
    res.data.chain_stats.funded_txo_sum +
    res.data.mempool_stats.funded_txo_sum;

  const spent =
    res.data.chain_stats.spent_txo_sum +
    res.data.mempool_stats.spent_txo_sum;

  return (funded - spent) / 1e8;
}
