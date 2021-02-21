import { Router } from 'express'
import authRoute from './auth/index.js'
import recordRoute from './record/index.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/record', recordRoute)

export default router
