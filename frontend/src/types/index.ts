export interface User {
  id: string
  walletAddress: string
  username?: string
  displayName?: string
  bio?: string
  avatar?: string
  reputation: number
  totalEarned: string
  skills: string[]
  createdAt: string
  updatedAt: string
}

export interface Bounty {
  id: string
  title: string
  description: string
  category: BountyCategory
  difficulty: Difficulty
  reward: string
  status: BountyStatus
  tags: string[]
  requirements: string[]
  creator: {
    id: string
    username?: string
    displayName?: string
    reputation: number
  }
  assignee?: {
    id: string
    username?: string
    displayName?: string
  }
  deadline?: string
  createdAt: string
  updatedAt: string
  _count?: {
    submissions: number
  }
}

export interface Submission {
  id: string
  bountyId: string
  submitter: {
    id: string
    username?: string
    displayName?: string
  }
  content: string
  attachments: string[]
  status: SubmissionStatus
  createdAt: string
  updatedAt: string
}

export interface Certification {
  id: string
  title: string
  description: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
  verified: boolean
  createdAt: string
}

export enum BountyCategory {
  CONTENT_CREATION = 'CONTENT_CREATION',
  DEVELOPMENT = 'DEVELOPMENT',
  DESIGN_UX = 'DESIGN_UX',
  TRANSLATION = 'TRANSLATION',
  REVIEW = 'REVIEW',
  MAINTENANCE = 'MAINTENANCE',
  RESEARCH = 'RESEARCH',
  COMMUNITY = 'COMMUNITY'
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum BountyStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISION_REQUIRED = 'REVISION_REQUIRED'
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    accessToken: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}
