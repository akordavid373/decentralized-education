import { Router } from 'express'
import { authenticateWallet, refreshToken } from '../controllers/authController'

const router = Router()

router.post('/wallet', authenticateWallet)
router.post('/refresh', refreshToken)

export default router
