const {validationResult} = require('express-validator');

const validateUsersData = (req,res,next)=>{
    const errors = validationResult(req);
        
        //validaciones con express-validator
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }
        next();
}

module.exports = {
    validateUsersData
}