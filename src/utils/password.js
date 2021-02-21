import bcrypt from 'bcrypt'

const saltRounds = 10;

export const hashPw = async (plaintextPw) => {
    return await bcrypt.hash(plaintextPw, saltRounds)
}

export const comparePw = async (plaintextPw, hash) => {
    return await bcrypt.compare(plaintextPw, hash)
}