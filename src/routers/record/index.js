import { Router } from 'express'
import currentUser from '../../middlewares/currentUser.js'
import requireAuth from '../../middlewares/requireAuth.js'
import pool, { recordsTable } from '../../db.js'
import { unknownErrMsg, invalidDataMsg } from '../../utils/errorMsg.js'
import { successResponse, failedResponse } from '../../utils/response.js'

const timeIntervalMap = {
    '1d': '1 DAY',
    '1w': '1 WEEK',
    '1m': '1 MONTH',
    '1y': '1 YEAR'
}

const router = Router()

router.use(currentUser)
router.use(requireAuth)

const recordData = (docs) => {
    if(docs.length === 0) return []

    return docs.map(doc => ({
        cId: doc.c_id,
        consultationDate: doc.c_date,
        doctorName: doc.doctor_name,
        medication: doc.medication,
        consultationFee: doc.c_fee,
        followUp: doc.follow_up
    }))
}

router.get('/', async (req, res) => {
    try {
        const query = `SELECT c_id, c_date, doctor_name, medication, c_fee, follow_up FROM ${recordsTable} WHERE u_id=$1`
        const timeInterval = timeIntervalMap[req.query.dt] ? `AND c_date > now() - interval '${timeIntervalMap[req.query.dt]}'` : ''
        const order = `ORDER BY c_date DESC`

        const foundRecords = await pool.query(
            `${query} ${timeInterval} ${order};`, 
            [req.currentUser.uId]
        )
        res.status(200).send(
            successResponse(
                recordData(foundRecords.rows)
            )
        )
    } catch(e) {
        console.log(e)
        res.status(400).send(failedResponse(unknownErrMsg))
    }
})

router.post('/', async (req, res) => {
    try {
        const { doctorName, medication, consultationFee, followUp } = req.body

        if(!doctorName || !medication || !consultationFee || followUp === undefined) {
            return res.status(400).send(failedResponse(invalidDataMsg))
        }

        const newRecord = await pool.query(
            `INSERT INTO ${recordsTable} (c_date, u_id, doctor_name, medication, c_fee, follow_up) VALUES($1, $2, $3, $4, $5, $6) RETURNING c_id`, 
            [new Date(), req.currentUser.uId, doctorName, medication, consultationFee, followUp]
        )

        res.status(200).send(
            successResponse({
                cId: newRecord.rows[0].c_id
            })
        )
    } catch(e) {
        console.log(e)
        res.status(400).send(failedResponse(unknownErrMsg))
    }
})

export default router