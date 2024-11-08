const router = require('express').Router();
const ensureAuthenticated = require('../Middleware/Auth');
const upload = require('../Middleware/Avatar') //multer
const { userdisplay,showuser,showAlluser, userUpdate, userDelete, SearchUserByName } = require('../Controllers/DetailsController');


router.post('/user', upload.single('avatar'), ensureAuthenticated, userdisplay);

router.route('/user').get(ensureAuthenticated,showuser);
router.get('/alluser',showAlluser);
router.post('/updateuser/:_id',userUpdate);
router.delete('/userdelete/:_id',userDelete);
router.get('/searchedUser', SearchUserByName)


module.exports= router;