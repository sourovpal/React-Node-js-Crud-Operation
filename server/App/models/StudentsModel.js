const mongoose= require('mongoose');
const {StudentSchema} = require('../../database/schema');

const StudentsModel = mongoose.model("students", StudentSchema);


module.exports = {
    StudentsModel
} 
