const validator = require('validator');
// signUp validation
const validationSignUpData = (req) => {
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("fields are empty");
    }else if(!validator.isEmail(emailId)){
        throw new Error("email id is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password are not strong, please enter strong passwored");
    }
}

const validationLoginData = (req) => {
    const { emailId, password } = req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("email is not valide");
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => 
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
}

module.exports = {
    validationSignUpData,
    validationLoginData,
    validateProfileEditData
}