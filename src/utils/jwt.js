import jwt from 'jsonwebtoken'

const expireTime = '3d'

export const jwtSign = (data) => jwt.sign(data, process.env.JWT_SECRET || 'test', { expiresIn: expireTime })
export const jwtVerify = (token) => jwt.verify(token, process.env.JWT_SECRET || 'test')
