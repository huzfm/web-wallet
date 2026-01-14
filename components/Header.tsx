"use client"

import Link from "next/link"
import { Github, Twitter, X } from "lucide-react"

export default function Header() {
  return (
    <header className="relative z-50 w-full pt-6">
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm sm:text-md lg:text-xl font-semibold font-mono border-2 border-white/20 p-2 sm:p-3 lg:p-4 bg-black rounded-xl sm:rounded-2xl ring-1 ring-white/30 shadow">
            Web Wallet Bootcamp 1.0
          </span>
        </Link>

        {/* Social icons */}
        <div className="flex items-center gap-8">
          <Link
            href="https://x.com/huzfm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <Twitter className="h-6 w-6" />
          </Link>

          <Link
            href="https://github.com/huzfm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            >
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
