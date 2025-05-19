const {Router} = require('express');
const {check} = require('express-validator');
const {login, checkLoginStatus}= require('../controllers/auth.controller');
const { validateUsersData} = require('../middlewares/users-data-validator');
const { validateToken } = require('../middlewares/token-validator');

const router = Router();

router.post('/login',[
    check('email','el correo electronico requerido debe ser valido').isEmail(),
    check('password','la contraseña es requerida').not().isEmpty(),
    validateUsersData
],login);
router.get('/check-login-status',checkLoginStatus);

module.exports = router;