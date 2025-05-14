const { response } = require("express");

const validateAdminRole = (req, res = response, next)=>{
    if(!req.authUser){
        return res.status(500).json({
            msg:'token no validado no se puede obtener el rol'
        });
    }

    const {role,name} = req.authUser;
    if(role[0] !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            msg:`el usuario ${name} no es administrador no se puede completar la operacion`
        })
    }
    next();
}
const validateRole = (...roles) =>{
    return (req, res, next)=>{
        if(!req.authUser){
            return res.status(500).json({
                msg:'token no validado no se puede obtener el rol'
            });
        }
        if(!roles.includes(req.authUser))
        {
            return res.status(401).json({
                msg:`El servicio require que el usuario tenga uno de estos roles : ${roles}`
            });
        }
        next();
    }

}

module.exports = {
    validateAdminRole,
    validateRole
}