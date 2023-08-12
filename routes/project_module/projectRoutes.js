import express from 'express';
import auth from '../../middlewares/requireAuth.js';
import { allProjectsCtrl, deleteProjectCtrl, newProjectCtrl, singleProjectCtrl, updateProjectCtrl } from '../../controllers/project_module/projectController.js';

const router= express.Router();


router.post('/newproject',auth(1),newProjectCtrl);
router.get('/allprojects',auth(1),allProjectsCtrl);
router.get('/:id',auth(1),singleProjectCtrl);
router.put('/updateprojects/:id',auth(1),updateProjectCtrl);
router.delete('/deleteprojects/:id',auth(1),deleteProjectCtrl);



export default router