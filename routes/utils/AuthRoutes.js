import express from 'express';
import {allUsers, deleteUsers, getSingleUser, updateUsers, userLoginCtrl, userRegisterCtrl} from  '../../controllers/utils/AuthController.js';
import auth from '../../middlewares/requireAuth.js';


const router = express.Router();

router.post('/register',userRegisterCtrl)
router.post('/login',userLoginCtrl);
router.get('/allusers',auth(1),allUsers);
router.get('/:id',auth(1),getSingleUser);
router.put('/updateusers/:id',auth(1),updateUsers);
router.delete('/deleteusers/:id',auth(1),deleteUsers);



export default router
// module.exports = router;