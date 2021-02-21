import { Router } from 'express'
import loginRoute from './login.js'
import registerRoute from './register.js'
import currentUserRoute from './currentUser.js'
import logoutRoute from './logout.js'

const router = Router()

router.use('/login', loginRoute)
router.use('/logout', logoutRoute)
router.use('/register', registerRoute)
router.use('/currentUser', currentUserRoute)

export default router
