const {response,request} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const usersGet = async(req, res = response ) =>{

    const { limit = 5, from = 0} = req.query;
    const query = {state:true};


    //esta forma tarda mas tiempo
    // const users = await User.find().
    // skip(Number(from)).
    // limit(Number(limit));
    // const totalUsers = await User.countDocuments(query);


    //se ejecuta amabas consultas de manera simultanea
    const [total,users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).
            skip(Number(from)).
            limit(Number(limit))
    ]);
    res.json({
        total,
        users
    });
}
const usersPost = async(req = request, res = response ) =>{

    

    const {name, email, password, role} = req.body;
    const user = new User({name,email,password,role});
    //verificacion de correo unico

   
    
    //encriptacion de password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);

    await user.save();
    res.json(
        user
    );
}
const usersPut = async(req, res = response ) =>{
    const { id } = req.params;
    const {_id, password, email, ... restData} = req.body;
    //validar desde bd

    if(password){
        const salt = bcrypt.genSaltSync(10);
        restData.password = bcrypt.hashSync(password,salt);
    }

    const userUpdate = await User.findByIdAndUpdate(id,restData,{new:true});

    res.json(
        
        userUpdate
    );
}
const usersDelete = async(req, res = response ) =>{

    const {id} = req.params;
    // const uidt = req.uidt;
    // const authUser = req.authUser;

    //eliminar fisicamente
    //const user = await User.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(id,{state:false},{new:true});
    //
    res.json(
        user
    );
}
const userPatch = (req, res = response ) =>{
    res.json({
        msg:'get-api from controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    userPatch
}