import express from 'express';
import { 
    getPflanzen, 
    getPflanzenById 
} from '../controllers/pflanzen.controller.js';

const router = express.Router();

router.get('/', getPflanzen);

router.get('/:id', getPflanzenById);

export default router;

