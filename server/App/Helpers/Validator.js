const Validator = require('validatorjs');
// const validator = async (body, rules, customMessages, callback) => {
//     const validation = new Validator(body, rules, customMessages);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));
// };

const checkExits = async (field, status)=>{
    Validator.register('exist', (value, attribute, field, passes) => {
        if(status){
            return true;
        }
        return false;
    }, `${field} has already been taken!`);
}




module.exports = checkExits;