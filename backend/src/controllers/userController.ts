import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { createError, asyncHandler } from '../middleware/errorHandler'

const prisma = new PrismaClient()

export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw createError('Authentication required', 401)
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      certifications: {
        orderBy: { issueDate: 'desc' }
      },
      createdBounties: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              submissions: true
            }
          }
        }
      },
      assignedBounties: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              username: true,
              displayName: true
            }
          }
        }
      },
      submissions: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          bounty: {
            select: {
              title: true,
              reward: true
            }
          }
        }
      },
      _count: {
        select: {
          createdBounties: true,
          assignedBounties: true,
          submissions: true,
          certifications: true
        }
      }
    }
  })

  if (!user) {
    throw createError('User not found', 404)
  }

  res.json({
    success: true,
    data: user
  })
})

export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw createError('Authentication required', 401)
  }

  const {
    username,
    displayName,
    bio,
    avatar,
    skills
  } = req.body

  const updateData: any = {}

  if (username) updateData.username = username
  if (displayName) updateData.displayName = displayName
  if (bio !== undefined) updateData.bio = bio
  if (avatar !== undefined) updateData.avatar = avatar
  if (skills) updateData.skills = skills

  if (username) {
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
        id: { not: req.user.id }
      }
    })

    if (existingUser) {
      throw createError('Username already taken', 400)
    }
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: updateData,
    select: {
      id: true,
      walletAddress: true,
      username: true,
      displayName: true,
      bio: true,
      avatar: true,
      skills: true,
      reputation: true,
      totalEarned: true,
      createdAt: true,
      updatedAt: true
    }
  })

  res.json({
    success: true,
    data: user
  })
})

export const getUserStats = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          createdBounties: true,
          assignedBounties: true,
          submissions: true,
          certifications: true
        }
      }
    }
  })

  if (!user) {
    throw createError('User not found', 404)
  }

  const completedBounties = await prisma.bounty.count({
    where: {
      assigneeId: userId,
      status: 'COMPLETED'
    }
  })

  const totalEarned = await prisma.bounty.aggregate({
    where: {
      assigneeId: userId,
      status: 'COMPLETED'
    },
    _sum: {
      reward: true
    }
  })

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        reputation: user.reputation
      },
      stats: {
        createdBounties: user._count.createdBounties,
        assignedBounties: user._count.assignedBounties,
        submissions: user._count.submissions,
        certifications: user._count.certifications,
        completedBounties,
        totalEarned: user.totalEarned
      }
    }
  })
})
