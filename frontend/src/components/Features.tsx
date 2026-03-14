export function Features() {
  const features = [
    {
      icon: '🎓',
      title: 'Learn Web3',
      description: 'Comprehensive courses on blockchain, smart contracts, and DeFi'
    },
    {
      icon: '💰',
      title: 'Earn Rewards',
      description: 'Get paid through DripsNetwork for contributing educational content'
    },
    {
      icon: '🏆',
      title: 'Build Reputation',
      description: 'Earn certifications and build your Web3 developer profile'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join a worldwide network of Web3 learners and builders'
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Decentralized Education?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
