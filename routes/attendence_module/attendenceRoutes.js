import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { attendenceAnalytics, deleteAttendence, getAttendences, getSingleAttendence, newAttendence, updateAttendence } from '../../controllers/attendence_module/attendenceController.js';

const router= express.Router();


router.post('/new',auth(1),newAttendence)
router.get('/allattendence',auth(1),getAttendences)
// router.get('/:id',auth(1),getSingleAttendence)
router.delete('/delete/:id',auth(1),deleteAttendence)
router.put('/update/:id',auth(1),updateAttendence)
router.post('/:id',auth(1),attendenceAnalytics)




export default router;