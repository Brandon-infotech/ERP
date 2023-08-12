import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { addAccount, deleteAccount, getAllAccounts, getSingleAccount, updateAccount } from '../../controllers/bank_module/bankController.js';


const router = express.Router();

router.post('/newaccount',auth(1),addAccount);
router.get('/allaccounts',auth(1),getAllAccounts);
router.get('/:id',auth(1),getSingleAccount);
router.put('/updateaccount/:id',auth(1),updateAccount);
router.delete('/deleteaccount/:id',auth(1),deleteAccount);

export default router;
