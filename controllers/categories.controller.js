const { response } = require('express');
const { Category } = require('../models/index');


const getAllCategories = async(req, res = response)=>{
    const {limit = 5, from = 0} = req.query;
    const enabled = {state:true};
    try {
        const[total,categories] = await Promise.all([
            Category.countDocuments(enabled),
            Category.find(enabled).
                skip(Number(from)).
                limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            categories
        });
    } catch (error) {
        console.log('Error al consultar en la BD');
        throw(error)
    }
}
const createCategory = async(req, res = response) =>{
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({name});
    if( categoryDB ){
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe en la base de datos`
        })
    }
    try {
        const category = new Category({name});
        await category.save();
        res.status(201).json(category);
        
    } catch (error) {
        console.log('Error al guardar en la BD');
        throw (error);   
    }
}
const updateCategory = async(req,res = response)=>{
    const {id} = req.params;
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({name});
        if( categoryDB ){
            return res.status(400).json({
                msg:`la categoria ${categoryDB.name} ya existe en la base da datos`
            });
        }
        const categoryUpdated = await Category.findByIdAndUpdate(id,{name},{new:true});
        res.status(200).json({
            categoryUpdated
        });
        
    } catch (error) {
        console.log('Error al actualizar en la BD');
        throw(error);
    }
}
const getCategoryById = async(req, res = response)=>{
    const {id} = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json({
            category
        })
    } catch (error) {
        console.log('no se pudo obtener de la BD');
        throw(error);
        
    }

}
const deleteCategory = async(req,res=response)=>{
    const {id} = req.params;
    try {
        const categoryToDelete = await Category.findByIdAndUpdate(id,{state:false},{new:true});
        res.status(200).json({
            categoryToDelete
        }) 
    } catch (error) 
    {
        console.log('no se pudo borrar en la BD');
        throw (error);      
    }
}






module.exports = {
    createCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    getCategoryById
}