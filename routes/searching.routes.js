const {Router} = require('express');
const {search} = require('../controllers/searching.controller')


const router = Router();

router.get('/:collection/:searchingTerm', search);

module.exports = router;