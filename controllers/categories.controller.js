const { response } = require('express');
const { Category } = require('../models/index');
const {storeSections} = require('../data-base/utils')


const getAllCategories = async(req, res = response)=>{
    const {limit = 50, from = 0} = req.query;
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
const getCategoriesBySection = async(req, res= response)=>{
    const section = req.params.section.toUpperCase();
    if(!storeSections.includes(section)){
        if(section==='ALL'){
            try {
                const [categories,total] = await Promise.all([
                    Category.find({state:true}),
                    Category.countDocuments({state:true})
                ]);
                res.status(200).json({
                    total,
                    categories
                });
                
            } catch (error) {
                console.log('error al consultar a la BD');
                throw(error);
            }
        }
        return res.status(400).json({
            msg:'Error la sección no se encuentra registrada',
        });
    }
    try {
        //const categories = await Category.find({section:section,state:true});
        const [categories,total] = await Promise.all([
            Category.find({section:section,state:true}),
            Category.countDocuments({section:section},{state:true})
        ]);
        res.status(200).json({
            total,
            categories
        });
        
    } catch (error) {
        console.log('error al consultar a la BD');
        throw(error);
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
        req.body.name= name;
        const newCategory = req.body;
        const category = new Category(newCategory);
        await category.save();
        res.status(201).json(category);
        
    } catch (error) {
        console.log('Error al guardar en la BD');
        throw (error);   
    }
}
const updateCategory = async(req,res = response)=>{
    const {id} = req.params;
    if(req.body.name)
    {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({name});
        if( categoryDB ){
            return res.status(400).json({
                msg:`la categoria ${categoryDB.name} ya existe en la base da datos`
            });
        }
        else{
            req.body.name=name;
        }
    }
    try {
        const data = req.body;
        const categoryUpdated = await Category.findByIdAndUpdate(id,data,{new:true});
        res.status(200).json(
            categoryUpdated);
        
    } catch (error) {
        console.log('Error al actualizar en la BD');
        throw(error);
    }
}
const getCategoryById = async(req, res = response)=>{
    const {id} = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(
            category
        )
    } catch (error) {
        console.log('no se pudo obtener de la BD');
        throw(error);
        
    }

}
const deleteCategory = async(req,res=response)=>{
    const {id} = req.params;
    try {
        const categoryToDelete = await Category.findByIdAndUpdate(id,{state:false},{new:true});
        res.status(200).json(
            categoryToDelete
        ) 
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
    getCategoryById,
    getCategoriesBySection
}