import express from 'express';

import { importItems } from '../controllers/import.controller.js';

const router=express.Router();


router.post('/items',importItems);

export default router;