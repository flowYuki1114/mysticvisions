import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { FortuneTypes } from '@/components/FortuneTypes'
import { Pricing } from '@/components/Pricing'
import { Testimonials } from '@/components/Testimonials'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <FortuneTypes />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  )
}
