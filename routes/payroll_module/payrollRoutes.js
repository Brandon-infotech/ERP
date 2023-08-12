import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { allPayrolls, deletePayroll, generatePayroll, getSinglePayroll, updatePayroll } from '../../controllers/payroll_module/payrollController.js';


const router = express.Router();

router.post('/new', auth(1),generatePayroll)
router.get('/allpayrolls', auth(1),allPayrolls)
router.put('/update/:id', auth(1),updatePayroll)
router.get('/:id', auth(1),getSinglePayroll)
router.delete('/delete/:id', auth(1),deletePayroll)


export default router;
