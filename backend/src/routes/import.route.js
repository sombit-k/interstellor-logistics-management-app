import express from 'express';

import { importItems } from '../controllers/import.controller.js';

router=express.Router();


router.post('/items',importItems);

export default router;