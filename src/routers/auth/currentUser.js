import { Router } from 'express'
import currentUser from '../../middlewares/currentUser.js'
import { successResponse } from '../../utils/response.js'

const router = Router()

router.post('/', currentUser, (req, res) => {
    res.send(successResponse(req.currentUser))
})

export default router