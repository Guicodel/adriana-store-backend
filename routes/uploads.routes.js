const { Router } = require('express');
const {check} = require('express-validator');


const { validateUsersData } = require('../middlewares/users-data-validator');
const { uploadImgProduct, updateImage } = require('../controllers/uploads.controller');
const { validateToken} = require('../middlewares/token-validator');
const { validateAdminRole } = require('../middlewares/role-validator');
const { validDbColections } = require('../hellpers/db-validators');
const router = Router();

router.post('/',[
    validateToken,
    validateAdminRole,
    validateUsersData
],uploadImgProduct);

router.put('/:colection/:id',[
    validateToken,
    validateAdminRole,
    check('id','El ID proporcionado no es valido de la BD').isMongoId(),
    check('colection').custom((col)=>validDbColections(col,['users','products'])),
    validateUsersData
],updateImage)
module.exports = router;