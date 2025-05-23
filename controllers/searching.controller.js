const { response } = require("express");
const { Category, Product } = require("../models");

const allowedCollection =[
    'categories',
    'products'

]

const search = (req, res = response)=>{
    const { collection, searchingTerm} = req.params;
    if(!allowedCollection.includes(collection)){
        return res.status(400).json({
            msg:'La coleccion en la que intenta realizar una busqueda no esta permitida'
        })
    }
    switch(collection){
        case 'categories':
            categoriesSearch(searchingTerm,res);

            break;

        case 'products':
            productsSearch(searchingTerm,res);

            break;
        default:
            return res.status(500).json({
                msg:'Error no se pudo encontro la coleccion de busqueda'
            })
             
    }
}
const categoriesSearch = async(searchingTerm= '', res= response)=>{
    const regex = new RegExp(searchingTerm,'i');
    try {
        const [categories,total] = await Promise.all([
            (Category.find({name:regex, state:true})),
            (Category.countDocuments({name:regex, state:true}))]);
        res.status(200).json({
            total,
            results:categories
        })
        
    } catch (error) {
        console.log('ERROR no se pudo completar la operacion, posible Error de BD');
        throw(error);
        
    }
}

const productsSearch = async(searchingTerm= '', res= response)=>{
    const regex = new RegExp(searchingTerm,'i');
    try {
        const [products,total] = await Promise.all([
            (Product.find({name:regex, state:true})),
            (Product.countDocuments({name:regex, state:true}))]);
        res.status(200).json({
            total,
            results:products
        })
        
    } catch (error) {
        console.log('ERROR no se pudo completar la operacion, posible Error de BD');
        throw(error);
        
    }
    
}


module.exports = {
    search
}