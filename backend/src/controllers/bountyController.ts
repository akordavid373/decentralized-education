import { Request, Response } from 'express'
import { PrismaClient, BountyCategory, Difficulty, BountyStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { createError, asyncHandler } from '../middleware/errorHandler'

const prisma = new PrismaClient()

export const getBounties = asyncHandler(async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 10, 
    category, 
    difficulty, 
    status = 'OPEN',
    search 
  } = req.query

  const skip = (Number(page) - 1) * Number(limit)
  
  const where: any = {
    status: status as BountyStatus
  }

  if (category) {
    where.category = category as BountyCategory
  }

  if (difficulty) {
    where.difficulty = difficulty as Difficulty
  }

  if (search) {
    where.OR = [
      { title: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } }
    ]
  }

  const [bounties, total] = await Promise.all([
    prisma.bounty.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            reputation: true
          }
        },
        assignee: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.bounty.count({ where })
  ])

  res.json({
    success: true,
    data: {
      bounties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  })
})

export const getBountyById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const bounty = await prisma.bounty.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          displayName: true,
          reputation: true
        }
      },
      assignee: {
        select: {
          id: true,
          username: true,
          displayName: true
        }
      },
      submissions: {
        include: {
          submitter: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          }
        }
      }
    }
  })

  if (!bounty) {
    throw createError('Bounty not found', 404)
  }

  res.json({
    success: true,
    data: bounty
  })
})

export const createBounty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    title,
    description,
    category,
    difficulty,
    reward,
    tags,
    requirements,
    deadline
  } = req.body

  if (!req.user) {
    throw createError('Authentication required', 401)
  }

  const bounty = await prisma.bounty.create({
    data: {
      title,
      description,
      category: category as BountyCategory,
      difficulty: difficulty as Difficulty,
      reward,
      tags: tags || [],
      requirements: requirements || [],
      deadline: deadline ? new Date(deadline) : null,
      creatorId: req.user.id
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          displayName: true
        }
      }
    }
  })

  res.status(201).json({
    success: true,
    data: bounty
  })
})

export const updateBounty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const updates = req.body

  if (!req.user) {
    throw createError('Authentication required', 401)
  }

  const existingBounty = await prisma.bounty.findUnique({
    where: { id }
  })

  if (!existingBounty) {
    throw createError('Bounty not found', 404)
  }

  if (existingBounty.creatorId !== req.user.id) {
    throw createError('Only the creator can update this bounty', 403)
  }

  const bounty = await prisma.bounty.update({
    where: { id },
    data: updates,
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          displayName: true
        }
      }
    }
  })

  res.json({
    success: true,
    data: bounty
  })
})

export const deleteBounty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params

  if (!req.user) {
    throw createError('Authentication required', 401)
  }

  const existingBounty = await prisma.bounty.findUnique({
    where: { id }
  })

  if (!existingBounty) {
    throw createError('Bounty not found', 404)
  }

  if (existingBounty.creatorId !== req.user.id) {
    throw createError('Only the creator can delete this bounty', 403)
  }

  await prisma.bounty.delete({
    where: { id }
  })

  res.json({
    success: true,
    message: 'Bounty deleted successfully'
  })
})
