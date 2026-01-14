"use client"

import { useState } from "react"
import { Eye, EyeOff, Copy, Check, RefreshCw, Lock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getBitcoinBalance, getEthereumBalance, getSolanaBalance } from "@/lib/wallets/balance"
import { Loader2 } from "lucide-react"

type WalletCardProps = {
  chain: string
  address: string
  privateKey: string
  balance?: string | number
  count?: number
  onDelete?: () => void
}

export default function WalletCard({
  chain,
  address,
  privateKey,
  balance: initialBalance,
  count,
  onDelete,
}: WalletCardProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | number | undefined>(initialBalance)
  const [loadingBalance, setLoadingBalance] = useState(false)

  const getChainConfig = (chain: string) => {
    switch (chain) {
      case "Bitcoin":
        return { icon: "₿", symbol: "BTC" }
      case "Ethereum":
        return { icon: "Ξ", symbol: "ETH" }
      case "Solana":
        return { icon: "◎", symbol: "SOL" }
      default:
        return { icon: "●", symbol: "" }
    }
  }

  const config = getChainConfig(chain)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1200)
  }

  const handleRefreshBalance = async () => {
    setLoadingBalance(true)
    try {
      let newBalance
      if (chain === "Bitcoin") newBalance = await getBitcoinBalance(address)
      else if (chain === "Ethereum") newBalance = await getEthereumBalance(address)
      else if (chain === "Solana") newBalance = await getSolanaBalance(address)
      setBalance(newBalance)
    } finally {
      setLoadingBalance(false)
    }
  }

  return (
    <Card className="w-full  rounded-2xl border-border/60 bg-neutral-900 backdrop-blur shadow-sm p-10 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-neutral-900 text-base font-semibold">
            {config.icon}
          </div>
          <span className="text-base font-semibold">
            {chain}{count ? ` ${count}` : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Balance button */}
          <Button
            onClick={handleRefreshBalance}
            disabled={loadingBalance}
            size="sm"
            variant="outline"
            className="h-9 px-3 rounded-md text-xs"
          >
            {loadingBalance ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : balance !== undefined ? (
              `${balance} ${config.symbol}`
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Balance
              </>
            )}
          </Button>

          {/* Delete button */}
          {onDelete && (
            <Button
              onClick={onDelete}
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground pl-2">
          Address
        </p>

        <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
          <code className="text-[12px] break-all text-white font-bold flex-1 leading-relaxed">
            {address}
          </code>

          <Button
            onClick={() => handleCopy(address, "address")}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {copiedField === "address" ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Private key */}
      <div className="space-y-1.5">
        <p className="text-[11px] pl-2 uppercase tracking-wide text-muted-foreground">
          Private key
        </p>

        <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
          <code
            className={`text-[12px] break-all font-bold flex-1 leading-relaxed ${
              showPrivateKey 
            }`}
          >
            {showPrivateKey ? privateKey : "•".repeat(36)}
          </code>

          {/* Eye */}
          <Button
            onClick={() => setShowPrivateKey(!showPrivateKey)}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {showPrivateKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>

          {/* Copy */}
          <Button
            onClick={() => handleCopy(privateKey, "privateKey")}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {copiedField === "privateKey" ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Warning only when visible */}
      {showPrivateKey && (
        <div className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
          <Lock className="h-4 w-4 text-destructive mt-0.5" />
          <p className="text-xs text-destructive leading-relaxed">
            Never share your private key.
          </p>
        </div>
      )}
    </Card>
  )
}
