import express from 'express';
import { 
    getGiessen, 
    getGiessenById,
    postGiessen,
    putGiessen,
    deleteGiessen 
} from '../controllers/giessen.controller.js';

const router = express.Router();

router.get('/', getGiessen);
router.get('/:id', getGiessenById);
router.post('/', postGiessen);
router.put('/:id', putGiessen);
router.delete('/:id', deleteGiessen);

export default router;