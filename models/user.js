const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    name:{
        type: String,
        required:[true, 'el nombre de usuario es requerida']
    },
    email:{
        type: String,
        required: [true,'el correo electronico es requerida'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'La contraseña es requerida']
    },
    img:{
        type: String,
    },
    role:{
        type: [String],
        required: [true],
        enum: ['ADMIN_ROLE','EMPLOYED_ROLE']
    },
    state:{
        type: Boolean,
        default: true
    },

});




module.exports = model('User',UserSchema);