"use client"

import { useState } from "react"
import { Eye, EyeOff, Copy, Check, Shield, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SeedPhraseDisplayProps {
  mnemonic: string
}

export default function SeedPhraseDisplay({ mnemonic }: SeedPhraseDisplayProps) {
  const [showSeed, setShowSeed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-muted-foreground/10 blur-3xl" />
      </div>

      <Card className="relative overflow-hidden rounded-2xl bg-neutral-900 backdrop-blur-xl shadow-lg border-1">
        <div className="px-6 md:px-10 pb-8 md:pb-10 pt-6 md:pt-6 space-y-6">

          
          <div className="flex items-start justify-between ">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Your recovery phrase
            </h2>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSeed(!showSeed)}
              className={cn(
                "h-11 w-11 rounded-full transition-all",
                showSeed && "border-white/30 shadow-lg shadow-white/10"
              )}
            >
              {showSeed ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>

          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border  p-6 md:p-8 transition-all duration-300",
              showSeed ? "ring-1 ring-white/20" : "py-16"
            )}
          >
            {!showSeed && (
              <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 gap-4 p-6 md:p-8">
                {mnemonic.split(" ").map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-background/70 blur-md"
                  />
                ))}
              </div>
            )}

            
            <div className={cn("relative z-10", !showSeed && "flex justify-center")}>
              {showSeed ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mnemonic.split(" ").map((word, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl border bg-background px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium  min-w-[1.5rem]">
                          {idx + 1}.
                        </span>
                        <span className="text-sm font-mono font-semibold tracking-wide">
                          {word}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center gap-4 backdrop-blur-sm rounded-xl p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-background/80 shadow-sm">
                    <Lock className="h-6 w-6 " />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium">Recovery phrase hidden</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          
          {showSeed && (
            <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <p className="text-sm text-destructive leading-relaxed">
                Never enter this recovery phrase on any website or share it with
                anyone. Support teams will never ask for it.
              </p>
            </div>
          )}


          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleCopy}
              size="lg"
              variant={copied ? "secondary" : "default"}
              className="flex-1 h-12 rounded-xl text-base bg-slate-100 hover:bg-slate-300 text-black py-2"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  <span className="md:hidden">Copied</span>
                  <span className="hidden md:inline">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 mr-2" />
                  <span className="md:hidden">Copy</span>
                  <span className="hidden md:inline">Copy recovery phrase</span>
                </>
              )}
            </Button>

          </div>

        </div>
      </Card>
    </div>
  )
}
