import express from 'express';
import { deleteTimesheet, generateTimesheet, getTimesheet, updateTimesheet } from '../../controllers/timesheet_module/timeSheetController.js';

const router = express.Router();

router.get('/', getTimesheet);
router.post('/', generateTimesheet);
router.put('/:id',updateTimesheet );
router.delete('/:id',deleteTimesheet );



export default router;