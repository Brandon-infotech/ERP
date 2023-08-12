import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { deleteAddressCtrl, getAllAddressCtrl, newAddressCtrl, updateAddressCtrl } from '../../controllers/address_module/addressController.js';


const router= express.Router();


router.post('/newaddress',auth(1),newAddressCtrl);
router.get('/alladdress',auth(1),getAllAddressCtrl);
router.put('/updateaddress/:id',auth(1),updateAddressCtrl);
router.delete('/deleteaddress/:id',auth(1),deleteAddressCtrl);







export default router