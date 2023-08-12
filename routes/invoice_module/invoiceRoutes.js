import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { deleteInvoice, generateInvoice, getAllInvoices, getSingleInvoice, updateInvoice } from '../../controllers/invoice_module/invoiceController.js';

const router = express.Router();


router.post('/new', auth(1),generateInvoice); 
router.get('/allinvoices', auth(1),getAllInvoices); 
router.get('/:id', auth(1),getSingleInvoice); 
router.put('/update/:id', auth(1),updateInvoice); 
router.delete('/delete/:id', auth(1),deleteInvoice); 


export default router;