import express from 'express';
import { 
    getPflanzen, 
    getPflanzenById,
    postPflanzen,
    putPflanzen,
    deletePflanzen 
} from '../controllers/pflanzen.controller.js';

const router = express.Router();

router.get('/', getPflanzen);
router.get('/:id', getPflanzenById);
router.post('/', postPflanzen);
router.put('/:id', putPflanzen);
router.delete('/:id', deletePflanzen);

export default router;

