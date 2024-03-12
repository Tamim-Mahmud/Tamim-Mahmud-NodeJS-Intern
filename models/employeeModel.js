const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"Please enter the employee's first name"]
    },
    lastName: {
        type: String,
        required: [true,"Please enter the employee's last name"]
    },
    email: {
        type: String,
        required: [true,"Please enter the employee's email"],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter the employee's phone number"]
    },
    blocked: {
        type: Boolean,
        default: false
    }
});
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = {
    Employee
};
