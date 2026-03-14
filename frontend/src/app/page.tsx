import { ConnectButton } from '@/components/ConnectButton'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { BountyList } from '@/components/BountyList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                🎓💧 Decentralized Education
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      <BountyList />
    </main>
  )
}
