import pg from 'pg';

const { Pool } = pg

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PW || '',
    host: "localhost",
    port: 5432,
    database: "mediconcen"
})

export const usersTable = "users"
export const recordsTable = "consultation_records"

export default pool

