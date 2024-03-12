const express = require('express');
const mongoose = require('mongoose');
const { Employee } = require('./models/employeeModel'); 
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Asif INC. Employee API');
});

