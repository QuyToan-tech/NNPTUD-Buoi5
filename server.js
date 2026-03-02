const express = require('express');
const mongoose = require('mongoose');
const userCtrl = require('./controllers/userController');
const roleCtrl = require('./controllers/roleController');

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/buoi5')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Routes cho Role
app.post('/roles', roleCtrl.createRole);
app.get('/roles', roleCtrl.getRoles);

// Routes cho User (CRUD)
app.get('/users', userCtrl.getAllUsers);
app.get('/users/:id', userCtrl.getUserById);
app.delete('/users/:id', userCtrl.softDelete);

// Routes Logic đặc biệt
app.post('/enable', userCtrl.enableUser);
app.post('/disable', userCtrl.disableUser);

app.listen(3000, () => console.log("Server is running on port 3000"));