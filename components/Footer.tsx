import Link from "next/link"
export default function Footer() {
  return (
    <footer className="relative z-50 w-full pt-10">
      <div className="max-w-7xl mx-auto h-14 px-4 pt-1 pb-10 flex items-center justify-center">
        <p className="text-md text-white">
         Developed by   {" "}
         <Link href="https://huzfm.is-a.dev" target="_blank" rel="noopener noreferrer" aria-label="huzfm">
           huzfm
         </Link>
        </p>
      </div>
    </footer>
  )
}