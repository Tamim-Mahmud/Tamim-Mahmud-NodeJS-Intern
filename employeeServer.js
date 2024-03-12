const express = require('express');
const mongoose = require('mongoose');
const { Employee } = require('./models/employeeModel'); 

const dotenv = require('dotenv'); 
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Welcome to the Asif INC. Employee API');
});

app.get('/employees', async (req, res) => {
    try {
        const employeeList = await Employee.find({});
        res.status(200).json(employeeList);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});


app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employeeDetails = await Employee.findById(id);
        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});


app.post('/employees', async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(200).json(newEmployee);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});


app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email: newEmailAddress, ...updatedData } = req.body;
        const targetEmployee = await Employee.findById(id);
        if (!targetEmployee) {
            return res.status(404).json({ errorMessage: `Employee with ID ${id} not found` });
        }
        if (newEmailAddress && newEmailAddress !== targetEmployee.email) {
            return res.status(400).json({ errorMessage: "Email cannot be changed" });
        }
        
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ errorMessage: `Employee with ID ${id} not found` });
        }
        res.status(200).json(deletedEmployee);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to the MongoDB database');
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    }).catch((error) => {
        console.log(error);
    });
