import { Router } from 'express'
import { successResponse } from '../../utils/response.js'

const router = Router()

router.post('/', (req, res) => {
    req.session = null
    
    res.status(200).send(successResponse({}))
})

export default router
