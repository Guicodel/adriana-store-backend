const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const validateToken = async(req = request, res = response, next)=>{
    const token = req.header('Authorization-token');
    if(!token){
        return res.status(401).json({
            msg: 'Token inexistente'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const authUser = await(User.findById(uid));

        //validacion cuando el usuario fue borrado fisicamente
        if(!authUser){
            return res.status(401).json({
                msg:'usuario / token inexistente'
            });
        }

        //verificar si el authUser tiene estado:true
        if(!authUser.state){
            return res.status(401).json({
                msg:'usuario no habilitado'
            })
        }

        req.authUser = authUser

        req.uidt = uid;
         next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }
   
}


module.exports = {
    validateToken
}