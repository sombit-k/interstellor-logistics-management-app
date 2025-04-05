import express from 'express';

import { importContainers, importItems } from '../controllers/import.controller.js';

const router=express.Router();


router.post('/items',importItems);

router.post('/containers',importContainers);

export default router;