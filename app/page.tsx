import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Timeline } from "@/components/timeline"
import { ModernCryptography } from "@/components/modern-cryptography"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Timeline />
      <ModernCryptography />
      <Footer />
    </main>
  )
}
