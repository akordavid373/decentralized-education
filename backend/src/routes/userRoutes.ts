import { Router } from 'express'
import { getUserProfile, updateUserProfile, getUserStats } from '../controllers/userController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.get('/profile', authenticateToken, getUserProfile)
router.put('/profile', authenticateToken, updateUserProfile)
router.get('/stats/:userId', getUserStats)

export default router
