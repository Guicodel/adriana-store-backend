const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../hellpers/jwt-generator");
const jwt = require('jsonwebtoken');


const login = async(req,res = response)=>{

    const {email,password} = req.body;
    try {
        //verificacion si el email existe
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    msg:'usuario / password no son correctos - correo '
                });
            }
            // si el usuario esta activo
            if(!user.state){
                return res.status(400).json({
                    msg:'usuario / password no son correctos - state'
                });
            }
            //verificacion de la contraseña
            const validPassword = bcryptjs.compareSync(password,user.password);
            if(!validPassword){
              return res.status(400).json({
                msg:'Usuario / password no son correctos - password'
              })  
            }
            //generacion de token
            const token = await generateJWT(user.id);
            res.json({
                user,
                token
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'ERROR comuniquese con el administrador'
        });
    }
    
}
const checkLoginStatus = async(req,res = response) =>{
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
                    msg:'usuario inexistente / token inexistente'
                });
            }
    
            //verificar si el authUser tiene estado:true
            if(!authUser.state){
                return res.status(401).json({
                    msg:'usuario no habilitado'
                })
            }
            const newtoken = await generateJWT(authUser.id);
            res.status(200).json({
                authUser,
                token:newtoken});
        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'ERROR no se pudo completar la operacion'
            });
            
        }

}

module.exports = {
    login,
    checkLoginStatus
}