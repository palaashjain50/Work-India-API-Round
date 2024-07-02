import sqlfunctions from './sql.js';
import signup from './signup.js';
import login from './login.js';
import create from './create.js';
import creds from './creds.js';
import showRides from './showRides.js';
import rentRide from './rentRide.js';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/signup', signup);
app.post('/api/login', login);
app.post('/api/car/create', create);
app.get('/api/car/get-rides', showRides);
app.get('/api/car/rent', rentRide);

app.listen(3000, async () => {
    console.log(`Server Started: (http://localhost:${creds.port})`);
    await sqlfunctions.connectDB();
});
