const { Category, Product } = require('../models');
const Role  = require('../models/role');
const User = require('../models/user')

const roleValidator = async (role='')=>{
        
        const roleExits = await Role.findOne({role});
        if(!roleExits){
            throw new Error(`El rol ${role} no es permitido en la BD`);
        }
        return true;
        
}
const emailValidator = async(email='')=>{
    const emailExist = await User.findOne({email});
        if(emailExist){
             throw new Error(`El correo ${email} no es pudo guardar en la BD`);
        }
        return true;
}
const userIdValidator = async(id)=>{
    const idExist = await User.findById(id);
        if(!idExist){
             throw new Error(`El usuario con el ID ${id} no es pudo encontrar en la BD`);
        }
        return true;
}

const categoryIdExist = async(id)=>{
    const idExist = await Category.findById(id);
    if( !idExist)
    {
        throw new Error(`El ID ${id} de la categoria  no existe en la BD`);
    }
    return true;
}
const productIdExist = async(id)=>{
    const idExist = await Product.findById(id);
    if(!idExist)
    {
        throw new Error(`El id ${id} del producto no existe en la base de datos`);
    }
    return true;
}
//funcion para permitir de que colecciones pueden actualizarse imagenes
const validDbColections = (colection = '',colections =[] )=>{
    const include = colections.includes(colection);
    if(!include){
        throw new Error(`la coleccion ${colection} no es permitida`);
    }
    return true;
}

module.exports = {
    roleValidator,
    emailValidator,
    userIdValidator,
    categoryIdExist,
    productIdExist,
    validDbColections
}