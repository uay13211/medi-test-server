import { notAuthorizedMsg } from '../utils/errorMsg.js'
import { failedResponse } from '../utils/response.js'

const requireAuth = (req, res, next) => {
    if(!req.currentUser) {
        return res.status(401).send(failedResponse(notAuthorizedMsg))
    }

    next()
}

export default requireAuth