import { Router } from 'express'
import { getBounties, getBountyById, createBounty, updateBounty, deleteBounty } from '../controllers/bountyController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.get('/', getBounties)
router.get('/:id', getBountyById)
router.post('/', authenticateToken, createBounty)
router.put('/:id', authenticateToken, updateBounty)
router.delete('/:id', authenticateToken, deleteBounty)

export default router
