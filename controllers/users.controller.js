const {esponse} = require('express');

const usersGet = (req, res = response ) =>{
    res.json({
        msg:'get-api from controller'
    });
}
const usersPost = (req, res = response ) =>{

    const {name,age}= req.body;
    res.json({
        msg:'post-api from controller',
        name,
        age
    });
}
const usersPut = (req, res = response ) =>{
    res.json({
        msg:'get-api from controller'
    });
}
const usersDelete = (req, res = response ) =>{
    res.json({
        msg:'delete-api from controller'
    });
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