import { Router } from 'express'
import { jwtSign } from '../../utils/jwt.js'
import pool, { usersTable } from '../../db.js'
import { comparePw } from '../../utils/password.js'
import { successResponse, failedResponse } from '../../utils/response.js'

const router = Router()

const invalidDataMsg = "Please provide valid data"
const incorrectPwOrEmailMsg = "Incorrect email or password"
const notAuthorizedMsg = "Not Authorized"

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).send(failedResponse(invalidDataMsg))
        }

        // validation

        // query in db if the user exist
         const foundUser = await pool.query(
            `SELECT u_id, email, password, clinic_name, phone_number, address FROM ${usersTable} where email = $1`,
            [email]
        )

        if(!foundUser.rows[0]) {
            return res.status(400).send(failedResponse(incorrectPwOrEmailMsg))
        }

        const correctPw = await comparePw(password, foundUser.rows[0].password)

        if(!correctPw) {
            return res.status(400).send(failedResponse(incorrectPwOrEmailMsg))
        }

        const payload = {
            uId: foundUser.rows[0].u_id,
            email: foundUser.rows[0].email,
            clinicName: foundUser.rows[0].clinic_name,
            phoneNo: foundUser.rows[0].phone_number,
            address: foundUser.rows[0].address
        }

        const userJwt = jwtSign(payload)

        req.session = {
            jwt: userJwt
        }

        res.status(200).send(successResponse(payload))
    } catch(e) {
        res.status(401).send(failedResponse(notAuthorizedMsg))
    }
})

export default router