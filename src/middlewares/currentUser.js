import { jwtVerify } from '../utils/jwt.js'

const currentUser = (req, res, next) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwtVerify(req.session.jwt)
        req.currentUser = payload
    } catch (e) {}

    next()
}

export default currentUser