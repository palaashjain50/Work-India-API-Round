import jwt from 'jsonwebtoken';
import sqlfunction from './sql.js';

export default async function create(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const isAdmin = await sqlfunction.isAdmin(jwt.decode(token).user_id);
    if (!isAdmin) {
        res.json({ 'status': "Sorry, you don't have access" });
        return
    }
    const { category, model, number_plate, current_city, rent_per_hr, rent_history } = req.body;
    const car_id = await sqlfunction.createCar(category, model, number_plate, current_city, rent_per_hr, rent_history);
    res.json({ "message": "Car added successfully", "car_id": car_id, "status_code": 200 });
}