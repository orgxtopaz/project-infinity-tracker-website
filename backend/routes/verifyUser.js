const router = require('express').Router();
const verifyUser = require('../controllers/verifyUser')



router.post('/verifyUser',verifyUser); ///DISPLAY ALL TOTAL ATTENDANCE 



module.exports = router;
