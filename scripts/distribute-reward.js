const { ethers } = require('ethers')
require('dotenv').config()

// DripsNetwork contract ABI
const DRIPS_ABI = [
  "function createStream(address recipient, uint256 amountPerSecond, uint256 duration) external",
  "function updateStream(uint256 streamId, uint256 amountPerSecond) external",
  "function cancelStream(uint256 streamId) external",
  "function getStream(uint256 streamId) external view returns (address sender, address recipient, uint256 amountPerSecond, uint256 startTime, uint256 stopTime)",
  "function getUserStreams(address user) external view returns (uint256[])"
]

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const params = {}
  
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2)
      const value = args[i + 1]
      params[key] = value
    }
  }
  
  return params
}

async function getGitHubUserAddress(username) {
  try {
    // In a real implementation, you might:
    // 1. Check user's GitHub profile for wallet address
    // 2. Use a GitHub API to get user details
    // 3. Look up in a database of registered contributors
    
    // For now, return the address if provided directly
    return process.env[`${username.toUpperCase()}_WALLET_ADDRESS`] || username
  } catch (error) {
    console.error(`Error getting address for ${username}:`, error.message)
    throw error
  }
}

async function distributeBountyReward(contributorAddress, rewardAmount, issueNumber) {
  try {
    console.log(`🎯 Distributing bounty reward:`)
    console.log(`   Contributor: ${contributorAddress}`)
    console.log(`   Reward: ${rewardAmount} ETH`)
    console.log(`   Issue: #${issueNumber}`)
    
    // Connect to provider and wallet
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const dripsContract = new ethers.Contract(process.env.DRIPS_CONTRACT_ADDRESS, DRIPS_ABI, wallet)
    
    // Create immediate payment stream (1 day for quick release)
    const rewardWei = ethers.parseEther(rewardAmount.toString())
    const amountPerSecond = rewardWei / BigInt(24 * 60 * 60) // 1 day
    const duration = 24 * 60 * 60 // 1 day in seconds
    
    console.log(`💸 Creating payment stream:`)
    console.log(`   Amount per Second: ${ethers.formatEther(amountPerSecond)} ETH`)
    console.log(`   Duration: 1 day`)
    
    const tx = await dripsContract.createStream(
      contributorAddress,
      amountPerSecond,
      duration
    )
    
    console.log(`⏳ Transaction submitted: ${tx.hash}`)
    console.log(`🔍 Waiting for confirmation...`)
    
    const receipt = await tx.wait()
    
    console.log(`✅ Reward distributed successfully!`)
    console.log(`📦 Block Number: ${receipt.blockNumber}`)
    console.log(`🔗 Transaction: ${tx.hash}`)
    
    // Log stream details
    const streamId = receipt.logs[0]?.args?.streamId || 'unknown'
    console.log(`🆔 Stream ID: ${streamId}`)
    
    // Store reward record (in a real implementation, you'd save to database)
    const rewardRecord = {
      contributor: contributorAddress,
      amount: rewardAmount,
      issueNumber: issueNumber,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      streamId: streamId,
      timestamp: new Date().toISOString()
    }
    
    console.log(`📝 Reward record:`, JSON.stringify(rewardRecord, null, 2))
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      streamId: streamId,
      rewardRecord
    }
    
  } catch (error) {
    console.error('❌ Error distributing reward:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

async function setupRecurringPayment(contributorAddress, monthlyRate) {
  try {
    console.log(`🔄 Setting up recurring payment:`)
    console.log(`   Contributor: ${contributorAddress}`)
    console.log(`   Monthly Rate: ${monthlyRate} ETH`)
    
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const dripsContract = new ethers.Contract(process.env.DRIPS_CONTRACT_ADDRESS, DRIPS_ABI, wallet)
    
    // Calculate amount per second from monthly rate
    const monthlyRateWei = ethers.parseEther(monthlyRate.toString())
    const amountPerSecond = monthlyRateWei / BigInt(30 * 24 * 60 * 60) // 30 days
    
    // Create 3-month recurring stream
    const duration = 90 * 24 * 60 * 60 // 3 months in seconds
    
    const tx = await dripsContract.createStream(
      contributorAddress,
      amountPerSecond,
      duration
    )
    
    const receipt = await tx.wait()
    
    console.log(`✅ Recurring payment setup complete!`)
    console.log(`🔗 Transaction: ${tx.hash}`)
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      monthlyRate: monthlyRate,
      duration: '3 months'
    }
    
  } catch (error) {
    console.error('❌ Error setting up recurring payment:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

// Main execution
async function main() {
  const params = parseArgs()
  
  if (!params.contributor || !params.amount) {
    console.log('Usage: node distribute-reward.js --contributor <address> --amount <eth> [--issue <number>] [--recurring <monthly-eth>]')
    process.exit(1)
  }
  
  try {
    // Get contributor address (handle GitHub usernames)
    const contributorAddress = await getGitHubUserAddress(params.contributor)
    
    // Distribute bounty reward
    if (params.amount && params.issue) {
      await distributeBountyReward(contributorAddress, params.amount, params.issue)
    }
    
    // Setup recurring payment if specified
    if (params.recurring) {
      await setupRecurringPayment(contributorAddress, params.recurring)
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message)
    process.exit(1)
  }
}

// CLI interface
if (require.main === module) {
  main()
}

module.exports = {
  distributeBountyReward,
  setupRecurringPayment,
  getGitHubUserAddress
}
