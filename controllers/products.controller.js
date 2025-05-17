const { response } = require("express")
const { Product } = require('../models/index');

const createProduct = async(req, res = response) => {
    const name = req.body.name.toUpperCase();
    const productBD = await Product.findOne({name});
    if( productBD ){
        return res.status(400).json({
            msg:`Ya existe un producto llamado ${productBD.name}`
        });
    }
    try {
        const {state,userId,available, ...resBody} = req.body;
        const  data = {
            ...resBody,
            name,
            userId: req.uidt
        }
        const newProduct = new Product(data);
        await newProduct.save();
        res.status(200).json(newProduct);      
    } catch (error) {
        console.log('No se pudo guardar en la BD');
        throw(error);
    }
}

const getAllProducts = async(req, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const enabled = {state : true};
    try {
        const [ total, products ] = await Promise.all([
            Product.countDocuments(enabled),
            Product.find(enabled)
                .populate('userId','name')
                .populate('categoryId','name')
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            products
        });
    } catch (error) {
        console.log('No se pudo obtener la informacion de la BD');
        throw (error);
    }
}

const getProductById = async(req, res = response) => {
    const {id} = req.params;

    try {
        const product = await Product.findById(id)
            .populate('categoryId','name');
        res.status(200).json(
            product)
    } catch (error) {
        console.log(`No se pudo obtener el producto con el id ${id} de la BD`);
        throw (error);
    }
}
const updateProduct = async(req, res = response) => {
    const {id} = req.params;
    let name = req.body.name;
    const {state, userId, ...body} = req.body;
    try {
        if(name){
            name = req.body.name.toUpperCase();
            console.log(name);
            const productDB = await Product.findOne({name});
            //console.log(`este el es nombre ${productDB.name}`);
                if( productDB ){
                    return res.status(400).json({
                        msg:`El producto con el nombre ${productDB.name} ya existe en la BD`
                    });
                }
                body.name = name;
        }
        body.userId = req.uidt;

        const updatedProduct = await Product.findByIdAndUpdate(id,body,{new:true});
        res.status(201).json(updatedProduct);
        
    } catch (error) {
        console.log('ERROR no se pudo actualizar el producto');
        throw( error);
    }
}
const deleteProduct = async(req, res = response) => {
    const {id} = req.params;
        try {
            const productToDelete = await Product.findByIdAndUpdate(id,{state:false},{new:true});
            res.status(200).json(
                productToDelete
            ) 
        } catch (error) 
        {
            console.log('el producto no se pudo borrar en la BD');
            throw (error);      
        }
    }

module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}