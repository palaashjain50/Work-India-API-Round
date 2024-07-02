import sqlfunction from './sql.js';

export default async function signup(req, res) {
    const { username, password, email } = req.body;
    const userExists = await sqlfunction.findUser(username, email);
    if (userExists.length) {
        res.json({ message: 'A user with that username/email already exists! Please try with different username and email or login' });
        return;
    }
    const id = await sqlfunction.createUser(username, email, password);
    res.json({ "status": "Account successfully created", "status_code": 200, "user_id": id });
}
