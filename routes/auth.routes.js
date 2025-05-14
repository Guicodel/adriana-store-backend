const {Router} = require('express');
const {check} = require('express-validator');
const {login}= require('../controllers/auth.controller');
const { validateUsersData} = require('../middlewares/users-data-validator');

const router = Router();

router.post('/login',[
    check('email','el correo electronico requerido debe ser valido').isEmail(),
    check('password','la contraseña es requerida').not().isEmpty(),
    validateUsersData
],login);

module.exports = router;