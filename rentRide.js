import sqlfunction from './sql.js';

export default async function rentRide(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (token === undefined) {
        res.json({ status: 'Please Login!' });
        return
    }
    const { car_id, origin, destination, hours_requirement } = req.query;
    const carAvailable = sqlfunction.findCar(car_id, origin, destination, hours_requirement);
}