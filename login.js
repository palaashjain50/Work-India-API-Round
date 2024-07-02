import sqlfunction from './sql.js';
import jwt from 'jsonwebtoken';
import creds from './creds.js';

export default async function login(req, res) {
    const { username, password } = req.body;
    const [isValid, userid] = await sqlfunction.validateUser(username, password);
    if (!isValid) {
        res.json({ "status_code": 401, "status": "Incorrect username/password. Please retry" });
        return;
    }
    const userCreds = { user_id: userid };
    const access_token = jwt.sign(userCreds, creds.password_hash);
    res.json({ "status": "Login Successful", "status_code": 200, "user_id": userid, "access_token": access_token });
}
