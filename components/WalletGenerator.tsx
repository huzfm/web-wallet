"use client"

import { useState } from "react"
import { generateMnemonic, mnemonicToSeed } from "@/lib/wallets/mnemonic"
import { createBitcoinWallet } from "@/lib/wallets/bitcoin"
import { generateEthereumWallet } from "@/lib/wallets/ethereum"
import { generateSolanaWallet } from "@/lib/wallets/solana"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import WalletCard from "./WalletCard"
import SeedPhraseDisplay from "./seed-phrase-show"
import { Loader2, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

type WalletType = {
  chain: string
  address: string
  privateKey: string
  balance?: string | number
  count?: number
}

export default function WalletGenerator() {
  const [mnemonic, setMnemonic] = useState("")
  const [wallets, setWallets] = useState<WalletType[]>([])
  const [loading, setLoading] = useState(false)

  const handleGenerateMnemonic = () => {
    setWallets([])
    setMnemonic(generateMnemonic(12))
  }

  const handleGenerateWallet = async (type: "btc" | "eth" | "sol") => {
    if (!mnemonic) return alert("Generate seed phrase first")

    setLoading(true)
    try {
      const seed = mnemonicToSeed(mnemonic)
      let wallet: WalletType

      if (type === "btc") wallet = createBitcoinWallet(seed)
      else if (type === "eth") wallet = generateEthereumWallet(seed)
      else wallet = generateSolanaWallet(seed)

      // Calculate count for this chain type
      setWallets((prev) => {
        const chainCount = prev.filter(w => w.chain === wallet.chain).length + 1
        return [...prev, { ...wallet, count: chainCount }]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-10 space-y-10">

      {/* Two Column Layout - Asymmetrical */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE - Controls (narrower & more compact) */}
        <Card className="lg:col-span-5 rounded-2xl bg-background/70 backdrop-blur-xl shadow-lg p-6 space-y-6 h-fit">
          
          {/* Step 1 - Generate Seed Phrase */}
          <section className="space-y-3 pb-5">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Step 1</h2>
              <p className="text-sm text-muted-foreground">
                Create a recovery phrase
              </p>
              <ul className="text-md text-muted-foreground space-y-1.5 mt-3 list-disc list-inside">
                <li>12-word recovery phrase for wallet access</li>
                <li>Write it down and store it securely offline</li>
                <li>Never share with anyone or enter on websites</li>
                <li>Losing it means losing access to your funds</li>
              </ul>
            </div>
            <Button
              onClick={handleGenerateMnemonic}
              disabled={loading}
              size="lg"
              className="w-full h-11 rounded-lg bg-slate-100 hover:bg-slate-300 "
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin font-mono" />}
              Generate Recovery Phrase
            </Button>
          </section>

          {/* Step 2 - Generate Wallets */}
          {mnemonic && (
            <section className="space-y-3">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Step 2</h2>
                <p className="text-sm text-muted-foreground">
                  Generate wallets from your phrase
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 ">
                {[
                  { key: "btc", label: "Bitcoin", icon: "₿" },
                  { key: "eth", label: "Ethereum", icon: "Ξ" },
                  { key: "sol", label: "Solana", icon: "◎" },
                ].map((c) => (
                  <Button
                    key={c.key}
                    variant="outline"
                    disabled={loading}
                    onClick={() => handleGenerateWallet(c.key as any)}
                    className={cn("h-11 rounded-lg text-sm justify-start")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating
                      </>
                    ) : (
                      <>
                        <span className="mr-2 text-lg">{c.icon}</span>
                        {c.label}
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </Card>

        {/* RIGHT SIDE - Seed Phrase Display (wider) */}
        <div className="lg:col-span-7 lg:sticky lg:top-10 h-fit bg-gray rounded-md">
          {mnemonic ? (
            <SeedPhraseDisplay mnemonic={mnemonic} />
          ) : (
            <Card className=" bg-background/100">
              <div className="p-16 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center  bg-background">
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium">No recovery phrase yet</p>
                  <p className="text-sm text-muted-foreground">
                    Generate a recovery phrase to begin
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Wallets Section */}
      {wallets.length > 0 && (
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold pt-10">Your wallets</h2>
            <p className="text-md text-muted-foreground pb-5">
              Derived from your recovery phrase
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
              {wallets.map((wallet, i) => (
                <WalletCard key={i} {...wallet} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
