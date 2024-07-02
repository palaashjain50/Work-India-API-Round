import dotenv from 'dotenv';
dotenv.config();

const creds = {
    port: process.env.PORT,
    password_hash: process.env.passhash,
    sql_pass: process.env.sqlpass
}

export default creds;
