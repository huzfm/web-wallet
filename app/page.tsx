import WalletGenerator from "@/components/WalletGenerator"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default function Home() {
  return (


<div className="min-h-screen w-full bg-black relative">
  <Header />
  {/* Dark White Dotted Grid Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#000000",
      backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
      backgroundSize: "30px 30px",
      backgroundPosition: "0 0",
    }}
  />
     {/* Your Content/Components */}
     <main className="min-h-screen ">
     
      <WalletGenerator />
    </main>
    <Footer/>
</div>
    
    
    
  )
}
