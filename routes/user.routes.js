const {Router} = require('express');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { validateUsersData } = require('../middlewares/users-data-validator');
const { roleValidator, emailValidator,userIdValidator } = require('../hellpers/db-validators');
const { validateToken } = require('../middlewares/token-validator');
const { validateAdminRole, validateRole } = require('../middlewares/role-validator');



const router = Router();


router.get('/',usersGet);
 


router.put('/:id',[
    check('id','Id no válido').isMongoId(),
    check('id').custom((id)=>userIdValidator(id)),
    validateUsersData
]
,usersPut);

router.post('/',[
    //check('email','El correo no es valido').isEmail(),
    
    check('email').custom((email)=>emailValidator(email)),
    check('name','El nombre de usuario es necesario').not().isEmpty(),
    check('password','La contraseña debe tener como minimo 5 caracteres').isLength({min: 5}),
    //check('role','El rol no es valido').isIn(['ADMIN_ROLE','EMPLOYED_ROL']),

    check('role').custom((role)=>roleValidator(role)),
    validateUsersData

],usersPost);
router.delete('/:id',[
    
    validateToken,
    //validateAdminRole,
    validateRole(['ADMIN_ROLE']),
    check('id','Id no válido').isMongoId(),
    check('id').custom((id)=>userIdValidator(id)),
    validateUsersData
],
usersDelete);



module.exports = router;