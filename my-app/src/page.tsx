import { CryptoApp } from "@/components/crypto/CryptoApp"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A2E] to-[#0F0F0F] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #6339F9 0%, transparent 70%)" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #9AE8BB 0%, transparent 70%)" }}
        />
      </div>

      {/* App Container */}
      <div className="relative z-10">
        <CryptoApp />
      </div>
    </main>
  )
}
