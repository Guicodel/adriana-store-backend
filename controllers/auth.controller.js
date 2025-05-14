const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../hellpers/jwt-generator");


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

module.exports = {
    login
}