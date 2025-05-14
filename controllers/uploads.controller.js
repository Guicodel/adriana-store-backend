const { User,Product } = require('../models/index')
const {uploadFile} = require('../hellpers/uploads-files');


const path = require('path');
const fs = require('fs');



const { response } = require('express');

const uploadImgProduct = async(req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imgFiles) {
        res.status(400).json({
            msg: 'No existen archivos en la petición.'
        });
        return;
    }  
    try {
        const fileName = await uploadFile(req.files);
        res.json({
            fileName
        });
        
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }  
}
const updateImage = async( req, res = response)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imgFiles) {
        res.status(400).json({
            msg: 'No existen archivos en la petición.'
        });
        return;
    }
    const { colection, id} = req.params;
    try {
        let modelColection = colection;
        switch( modelColection)
        {
            case 'users':
                modelColection = await User.findById(id);
                if(!modelColection){
                    return res.status(400).json({
                        msg:`No existe un usuario con el id ${id}`
                    });
                }
                break;
            case 'products':
                modelColection = await Product.findById(id);
                if(!modelColection){
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    });
                }
                break; 
            default:
                return res.status(500).json(({
                    msg: 'ERROR no se valido esta operación'
                }));
        }
        //para eliminar una imagen
        //al ser un vector de imagenes primero se tiene que buscar el nombre a eliminar del vector y unirlo al path
        // if(modelColection.img.length>0){
        //     const pathImage = path.join(__dirname,'../img-uploads',modelColection.img[0]);
        //     console.log(pathImage);
        //     if(fs.existsSync(pathImage)){
        //         console.log('existe ruta de imagen');
        //         fs.unlinkSync(pathImage);
        //     }
        // }
        const fileName = await uploadFile(req.files);
        modelColection.img.push(fileName);
        await modelColection.save();
        res.status(201).json({
            modelColection
        })

    } catch (error) {
        console.log('ERROR no se pudo completar esta operación');
        throw (error);
    }
}

module.exports = {
    uploadImgProduct,
    updateImage
}