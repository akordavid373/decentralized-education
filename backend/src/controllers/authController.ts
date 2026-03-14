import { Request, Response } from 'express'
import { ethers } from 'ethers'
import { PrismaClient } from '@prisma/client'
import { generateTokens } from '../middleware/auth'
import { createError, asyncHandler } from '../middleware/errorHandler'

const prisma = new PrismaClient()

export const authenticateWallet = asyncHandler(async (req: Request, res: Response) => {
  const { signature, message, address } = req.body

  if (!signature || !message || !address) {
    throw createError('Signature, message, and address are required', 400)
  }

  const recoveredAddress = ethers.verifyMessage(message, signature)
  
  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    throw createError('Invalid signature', 401)
  }

  let user = await prisma.user.findUnique({
    where: { walletAddress: address.toLowerCase() }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddress: address.toLowerCase(),
        username: `user_${address.slice(0, 8)}`,
        displayName: `User ${address.slice(0, 6)}...${address.slice(-4)}`
      }
    })
  }

  const tokens = generateTokens(user.id)

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        username: user.username,
        displayName: user.displayName,
        reputation: user.reputation
      },
      ...tokens
    }
  })
})

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    throw createError('Refresh token is required', 400)
  }

  res.json({
    success: true,
    message: 'Token refresh not implemented yet'
  })
})
