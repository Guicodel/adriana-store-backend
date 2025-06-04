const {Schema,model} = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type: String,
        required:[true,'El nombre de la categoria es requerida']
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    section:{
        type: String,
        default: 'Ropa',
        required: true
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description:{
        type: String
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    size:
    {
        type:[String],
        default:['Sin talla'],
        required:true
    },
    price:{
        type: Number,
        default: 0,
        required:true
    },
    stock:{
        type:Number,
        default:0,
        required: true
    },
    available:{
        type: Boolean,
        default:true,
        required:true
    },
    img:{
        type: [String] 
    },
    brand:{
        type: String
    },
    gender:{
        type: String,
        enum: ['Varón','Mujer','Niños','Unisex','']
    }

});
module.exports = model('Product',ProductSchema);