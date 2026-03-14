const { ethers } = require('ethers')

// DripsNetwork contract ABI (simplified)
const DRIPS_ABI = [
  "function createStream(address recipient, uint256 amountPerSecond, uint256 duration) external",
  "function updateStream(uint256 streamId, uint256 amountPerSecond) external",
  "function cancelStream(uint256 streamId) external",
  "function getStream(uint256 streamId) external view returns (address sender, address recipient, uint256 amountPerSecond, uint256 startTime, uint256 stopTime)",
  "function getUserStreams(address user) external view returns (uint256[])"
]

// DripsNetwork contract address (example)
const DRIPS_CONTRACT_ADDRESS = "0x..." // Replace with actual contract address

async function setupDripsForContributor(contributorAddress, contributionRate) {
  try {
    // Connect to provider (example with Infura)
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    const dripsContract = new ethers.Contract(DRIPS_CONTRACT_ADDRESS, DRIPS_ABI, wallet)
    
    // Calculate amount per second (from monthly rate)
    const monthlyRate = ethers.parseEther(contributionRate.toString())
    const amountPerSecond = monthlyRate / BigInt(30 * 24 * 60 * 60) // 30 days
    
    // Create stream for 1 year (can be renewed)
    const duration = 365 * 24 * 60 * 60 // 1 year in seconds
    
    const tx = await dripsContract.createStream(
      contributorAddress,
      amountPerSecond,
      duration
    )
    
    console.log(`Creating Drips stream for ${contributorAddress}`)
    console.log(`Transaction hash: ${tx.hash}`)
    
    const receipt = await tx.wait()
    console.log(`Stream created successfully! Block: ${receipt.blockNumber}`)
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber
    }
    
  } catch (error) {
    console.error('Error setting up Drips:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

async function distributeRewards(bountyId, contributorAddress, rewardAmount) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    const dripsContract = new ethers.Contract(DRIPS_CONTRACT_ADDRESS, DRIPS_ABI, wallet)
    
    // Create immediate payment stream
    const amountPerSecond = ethers.parseEther(rewardAmount.toString())
    const duration = 24 * 60 * 60 // 1 day for immediate release
    
    const tx = await dripsContract.createStream(
      contributorAddress,
      amountPerSecond,
      duration
    )
    
    console.log(`Distributing reward for bounty ${bountyId} to ${contributorAddress}`)
    console.log(`Transaction hash: ${tx.hash}`)
    
    const receipt = await tx.wait()
    console.log(`Reward distributed successfully! Block: ${receipt.blockNumber}`)
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber
    }
    
  } catch (error) {
    console.error('Error distributing rewards:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

async function getContributorEarnings(contributorAddress) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    const dripsContract = new ethers.Contract(DRIPS_CONTRACT_ADDRESS, DRIPS_ABI, provider)
    
    const streamIds = await dripsContract.getUserStreams(contributorAddress)
    
    let totalEarnings = BigInt(0)
    const streams = []
    
    for (const streamId of streamIds) {
      const stream = await dripsContract.getStream(streamId)
      streams.push({
        id: streamId.toString(),
        sender: stream.sender,
        recipient: stream.recipient,
        amountPerSecond: ethers.formatEther(stream.amountPerSecond),
        startTime: new Date(Number(stream.startTime) * 1000),
        stopTime: new Date(Number(stream.stopTime) * 1000)
      })
    }
    
    return {
      success: true,
      streams,
      totalStreams: streams.length
    }
    
  } catch (error) {
    console.error('Error getting contributor earnings:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// CLI interface
const command = process.argv[2]
const address = process.argv[3]
const amount = process.argv[4]

switch (command) {
  case 'setup':
    setupDripsForContributor(address, parseFloat(amount))
    break
  case 'distribute':
    distributeRewards(address, amount)
    break
  case 'earnings':
    getContributorEarnings(address)
    break
  default:
    console.log('Usage:')
    console.log('  node setup-drips.js setup <address> <monthly-amount>')
    console.log('  node setup-drips.js distribute <bounty-id> <reward-amount>')
    console.log('  node setup-drips.js earnings <address>')
}

module.exports = {
  setupDripsForContributor,
  distributeRewards,
  getContributorEarnings
}
