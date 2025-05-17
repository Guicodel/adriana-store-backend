const {Router} = require('express');
const {check} = require('express-validator');
const { validateToken } = require('../middlewares/token-validator');
const { validateUsersData } = require('../middlewares/users-data-validator');
const { createCategory, updateCategory, getAllCategories, getCategoryById, deleteCategory } = require('../controllers/categories.controller');
const { validateAdminRole } = require('../middlewares/role-validator');
const { categoryIdExist } = require('../hellpers/db-validators');



const router = Router();


router.get('/',getAllCategories);


router.get('/:id',[
    check('id','No es un ID valido en la BD').isMongoId(),
    check('id').custom((id)=>categoryIdExist(id)),
    validateUsersData
],getCategoryById

);

router.post('/',[
    validateToken,
    validateAdminRole,
    check('name','El nombre es necesario').not().isEmpty(),
    check('section','La seccion es necesaria').not().isEmpty(),
    //validateUsersData son validaciones de express-validator validan campos en general
    validateUsersData
    ],createCategory);

router.put('/:id',[
    validateToken,
    validateAdminRole,
    check('id','El ID proporcionado no es valido en Mongo').isMongoId(),
    check('id').custom((id)=>categoryIdExist(id)),

    validateUsersData

],updateCategory);

router.delete('/:id',[
    validateToken,
    validateAdminRole,
    check('id','El ID proporcionado no es valido').isMongoId(),
    check('id').custom((id)=>categoryIdExist(id)),
    validateUsersData
],deleteCategory);



module.exports = router;