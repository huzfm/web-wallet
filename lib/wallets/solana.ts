import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export function generateSolanaWallet(seed: Buffer) {
  const path = "m/44'/501'/0'/0'";
  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const keypair = Keypair.fromSeed(Uint8Array.from(derivedSeed));

  return {
    chain: "Solana",
    address: keypair.publicKey.toBase58(),
    privateKey: Buffer.from(keypair.secretKey).toString("hex"),
  };
}
