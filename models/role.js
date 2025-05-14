const {Schema,model} = require('mongoose');

const RoleSchema = new Schema({
    role:{
        type: String,
        required:[true,'El rol es requerido']
    }
});
// const Role = model('Role',RoleSchema);

// module.exports = {Role};
module.exports = model('Role',RoleSchema);