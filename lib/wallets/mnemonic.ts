import * as bip39 from "bip39";

export function generateMnemonic(words: 12 | 24 = 12) {
  const strength = words === 24 ? 256 : 128;
  return bip39.generateMnemonic(strength);
}

export function mnemonicToSeed(mnemonic: string) {
  return bip39.mnemonicToSeedSync(mnemonic);
}

export function validateMnemonic(mnemonic: string) {
  return bip39.validateMnemonic(mnemonic);
}
