import { Router } from 'express'
import { jwtSign } from '../../utils/jwt.js'
import pool, { usersTable } from '../../db.js'
import { hashPw } from '../../utils/password.js'
import { invalidDataMsg, notAuthorizedMsg, emailInUseMsg } from '../../utils/errorMsg.js'
import { successResponse, failedResponse } from '../../utils/response.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { email, password, clinicName, phoneNo, address } = req.body

        if(!email || !password || !clinicName || !phoneNo || !address) {
            return res.status(400).send(failedResponse(invalidDataMsg))
        }

        // validation

        // query in db if the user exist
        const existingUser = await pool.query(
            `SELECT email FROM ${usersTable} where email = $1`,
            [email]
        )

        if(existingUser.rows[0]) {
            return res.status(400).send(failedResponse(emailInUseMsg))
        }

        const hashedPw = await hashPw(password)
    
        const newUser = await pool.query(
            `INSERT INTO ${usersTable} (email, password, clinic_name, phone_number, address) 
            VALUES($1, $2, $3, $4, $5) 
            RETURNING u_id, email, clinic_name, phone_number, address`,
            [email, hashedPw, clinicName, phoneNo, address]
        )

        const payload = {
            uId: newUser.rows[0].u_id,
            email: newUser.rows[0].email,
            clinicName: newUser.rows[0].clinic_name,
            phoneNo: newUser.rows[0].phone_number,
            address: newUser.rows[0].address
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