const {Schema} = require('../connection');

const StudentSchema = new Schema({
    name: {
        type:String,
        required:[true, 'Name Field is Required!'],
    },
    roll: {
        type:String,
        required:[true, 'Roll Field is Required!'],
    },
    reg: {
        type:String,
        required:[true, 'Registration Field is Required!'],
    },
    class: {
        type:String,
        required:[true, 'Class Field is Required!'],
    },
    age: {
        type:String,
        required:[true, 'Age Field is Required!'],
    },
    avatar: {
        type:String,
        required:[true, 'Avater Field is Required!'],
    },
    email: {
        type:String,
        required:[true, 'Email Field is Required!'],
    },
    phone: {
        type:String,
        required:[true, 'Phone Field is Required!'],
    },
    password: {
        type:String,
        required:[true, 'Password Field is Required!'],
    },
});


module.exports = {
    StudentSchema
}