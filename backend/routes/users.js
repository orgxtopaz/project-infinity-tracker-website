const router = require('express').Router();
const register = require('../controllers/users')



router.post('/register',register); ///DISPLAY ALL TOTAL ATTENDANCE 



module.exports = router;
