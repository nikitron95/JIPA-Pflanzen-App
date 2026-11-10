import express from 'express';
import { 
    getKategorien, 
    getKategorienById,
    postKategorien,
    putKategorien,
    deleteKategorien
} from '../controllers/kategorien.controller.js';

const router = express.Router();

router.get('/', getKategorien);
router.get('/:id', getKategorienById);
router.post('/', postKategorien);
router.put('/:id', putKategorien);
router.delete('/:id', deleteKategorien);

export default router;