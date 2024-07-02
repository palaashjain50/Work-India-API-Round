import mysql from 'mysql2/promise';
import creds from './creds.js';
import * as bcrypt from 'bcrypt';

var con;

async function connectDB() {
    con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: creds.sql_pass,
        database: 'zoomcar'
    });
    console.log('SQL DB Connected');
}

async function findUser(username, email) {
    const [results, fields] = await con.query(`select * from users u WHERE u.username='${username}' or u.email="${email}"`);
    return results;
}

async function createUser(username, email, password) {
    const id = parseInt(Math.random() * (99999 - 11111) + 1);
    const hashedPass = await bcrypt.hash(password, 10);
    await con.query(`insert into users values ( ${id}, "${username}", "${email}", "${hashedPass}" )`);
    return id;
}

async function validateUser(username, password) {
    const [results, fields] = await con.query(`select * from users where username="${username}"`);
    if (results.length) {
        const validatePassword = await bcrypt.compare(password, results[0].password);
        return [validatePassword, results[0].userid];
    }
    const [adminResults, adminFields] = await con.query(`select * from admin where username="${username}"`);
    const validateAdminPassword = await bcrypt.compare(password, adminResults[0].password);
    return [validateAdminPassword, adminResults[0].admin_id];
}

async function isAdmin(id) {
    const [results, fields] = await con.query(`select * from admin where admin_id=${id}`);
    if (results.length) {
        return true;
    }
    else {
        return false;
    }
}

async function createCar(category, model, number_plate, current_city, rent_per_hr, rent_history) {
    const car_id = parseInt((Math.random() + 1) * (99999 - 10000));
    await con.query(`insert into cars values ("${category}", "${model}", "${number_plate}", "${current_city}", ${rent_per_hr}, "${rent_history}", ${car_id})`);
    return car_id;
}

async function findCar(car_id, origin, destination, hours_required) {
    console.log(origin);
    const availableCars = await con.query(`select * from cars where current_city="${origin}"`);
    console.log(availableCars);
}

export default { connectDB, findUser, createUser, validateUser, isAdmin, createCar, findCar };