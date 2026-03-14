export function BountyList() {
  const bounties = [
    {
      id: 1,
      title: "Create Solidity Smart Contract Tutorial",
      description: "Write a comprehensive tutorial on creating your first smart contract",
      category: "Content Creation",
      reward: "0.1 ETH",
      difficulty: "Beginner",
      status: "Open"
    },
    {
      id: 2,
      title: "Build DeFi Dashboard Component",
      description: "Create a React component for displaying DeFi portfolio data",
      category: "Development",
      reward: "0.2 ETH",
      difficulty: "Intermediate",
      status: "Open"
    },
    {
      id: 3,
      title: "Translate Web3 Course to Spanish",
      description: "Translate our blockchain fundamentals course to Spanish",
      category: "Translation",
      reward: "0.05 ETH",
      difficulty: "Beginner",
      status: "Open"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Available Bounties
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty) => (
            <div key={bounty.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  bounty.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  bounty.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {bounty.difficulty}
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {bounty.reward}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {bounty.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {bounty.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {bounty.category}
                </span>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            View All Bounties
          </button>
        </div>
      </div>
    </section>
  )
}
