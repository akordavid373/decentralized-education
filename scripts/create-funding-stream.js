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

// Project configuration
const PROJECT_CONFIG = {
  name: "Decentralized Education Platform",
  description: "A platform for learning Web3 with bounty-based contributions",
  monthlyBudget: process.env.MONTHLY_BUDGET || "1.0", // 1 ETH per month default
  contractAddress: process.env.DRIPS_CONTRACT_ADDRESS,
  rpcUrl: process.env.ETHEREUM_RPC_URL
}

async function createProjectFundingStream() {
  try {
    console.log(`🚀 Setting up DripsNetwork funding for ${PROJECT_CONFIG.name}`)
    
    // Connect to provider and wallet
    const provider = new ethers.JsonRpcProvider(PROJECT_CONFIG.rpcUrl)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    console.log(`📡 Connected to network with address: ${wallet.address}`)
    
    const dripsContract = new ethers.Contract(PROJECT_CONFIG.contractAddress, DRIPS_ABI, wallet)
    
    // Calculate amount per second from monthly budget
    const monthlyBudgetWei = ethers.parseEther(PROJECT_CONFIG.monthlyBudget)
    const amountPerSecond = monthlyBudgetWei / BigInt(30 * 24 * 60 * 60) // 30 days
    
    // Create 1-year funding stream
    const duration = 365 * 24 * 60 * 60 // 1 year in seconds
    
    console.log(`💰 Creating funding stream:`)
    console.log(`   Monthly Budget: ${PROJECT_CONFIG.monthlyBudget} ETH`)
    console.log(`   Amount per Second: ${ethers.formatEther(amountPerSecond)} ETH`)
    console.log(`   Duration: 1 year`)
    
    const tx = await dripsContract.createStream(
      wallet.address, // Send to project wallet
      amountPerSecond,
      duration
    )
    
    console.log(`⏳ Transaction submitted: ${tx.hash}`)
    console.log(`🔍 Waiting for confirmation...`)
    
    const receipt = await tx.wait()
    
    console.log(`✅ Funding stream created successfully!`)
    console.log(`📦 Block Number: ${receipt.blockNumber}`)
    console.log(`🔗 Transaction: ${tx.hash}`)
    
    // Log stream details
    const streamId = receipt.logs[0]?.args?.streamId || 'unknown'
    console.log(`🆔 Stream ID: ${streamId}`)
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      streamId: streamId,
      monthlyBudget: PROJECT_CONFIG.monthlyBudget,
      amountPerSecond: ethers.formatEther(amountPerSecond)
    }
    
  } catch (error) {
    console.error('❌ Error creating funding stream:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

async function setupContributorStreams(contributors) {
  const results = []
  
  for (const contributor of contributors) {
    try {
      console.log(`👤 Setting up stream for contributor: ${contributor.address}`)
      
      const provider = new ethers.JsonRpcProvider(PROJECT_CONFIG.rpcUrl)
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
      const dripsContract = new ethers.Contract(PROJECT_CONFIG.contractAddress, DRIPS_ABI, wallet)
      
      // Calculate contributor's monthly rate
      const monthlyRate = ethers.parseEther(contributor.monthlyRate.toString())
      const amountPerSecond = monthlyRate / BigInt(30 * 24 * 60 * 60)
      
      const duration = 365 * 24 * 60 * 60 // 1 year
      
      const tx = await dripsContract.createStream(
        contributor.address,
        amountPerSecond,
        duration
      )
      
      const receipt = await tx.wait()
      
      results.push({
        contributor: contributor.address,
        success: true,
        transactionHash: tx.hash,
        monthlyRate: contributor.monthlyRate
      })
      
      console.log(`✅ Stream created for ${contributor.address}`)
      
      // Add delay to avoid nonce issues
      await new Promise(resolve => setTimeout(resolve, 2000))
      
    } catch (error) {
      console.error(`❌ Error setting up stream for ${contributor.address}:`, error.message)
      results.push({
        contributor: contributor.address,
        success: false,
        error: error.message
      })
    }
  }
  
  return results
}

// CLI interface
const command = process.argv[2]

switch (command) {
  case 'project':
    createProjectFundingStream()
    break
  case 'contributors':
    const contributorsFile = process.argv[3]
    if (contributorsFile) {
      const contributors = require(`./${contributorsFile}`)
      setupContributorStreams(contributors)
    } else {
      console.log('Please provide a contributors JSON file')
    }
    break
  default:
    console.log('Usage:')
    console.log('  node create-funding-stream.js project')
    console.log('  node create-funding-stream.js contributors <contributors-file.json>')
}

module.exports = {
  createProjectFundingStream,
  setupContributorStreams
}
