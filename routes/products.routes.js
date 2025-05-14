const {Router} = require('express');
const {check} = require('express-validator');
const { validateToken } = require('../middlewares/token-validator');
const { validateUsersData } = require('../middlewares/users-data-validator');

const { validateAdminRole } = require('../middlewares/role-validator');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { categoryIdExist, productIdExist } = require('../hellpers/db-validators');




const router = Router();


router.get('/',getAllProducts);


router.get('/:id',[
    check('id','No es un ID valido en la BD').isMongoId(),
    check('id').custom((id)=>productIdExist(id)),
    validateUsersData
],getProductById

);

router.post('/',[
    validateToken,
    validateAdminRole,
    check('name','El nombre del producto es requerido').not().isEmpty(),
    check('price','El precio del producto es requerido').not().isEmpty(),
    check('section','La sección en la que estará el producto es requerida').not().isEmpty(),
    check('price',).isNumeric().withMessage('El precio debe ser un valor numerico').isFloat({min:0}).withMessage('El precio debe ser mayor o igual a 0'),
    check('stock','El stock del producto es requerido').not().isEmpty(),
    check('stock').isInt({min: 0}).withMessage('El Stock debe ser un numero entero positivo'),
    check('categoryId','No es un ID valido en MongoDB').isMongoId(),
    check('categoryId').custom((categoryId)=>categoryIdExist(categoryId)),

    //validateUsersData son validaciones de express-validator validan campos en general
    validateUsersData
    ],createProduct);

router.put('/:id',[
    validateToken,
    validateAdminRole,
    check('id','El ID proporcionado no es valido').isMongoId(),
    check('id').custom((id)=>productIdExist(id)),

    validateUsersData

],updateProduct);

router.delete('/:id',[
    validateToken,
    validateAdminRole,
    check('id','El ID proporcionado no es valido').isMongoId(),
    check('id').custom((id)=>productIdExist(id)),
    validateUsersData
],deleteProduct);



module.exports = router;