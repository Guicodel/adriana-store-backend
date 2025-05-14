const {Schema,model} = require('mongoose');

const CategorySchema = new Schema({
    name:{
        type: String,
        required:[true,'El nombre de la categoria es requerida']
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    }
});
module.exports = model('Category',CategorySchema);