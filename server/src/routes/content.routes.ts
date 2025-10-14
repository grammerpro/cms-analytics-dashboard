import { Router } from 'express';
import contentController from '../controllers/content.controller';
import { validateCreateContent } from '../middleware/validation.middleware';

const router = Router();

router.post('/', validateCreateContent, (req, res) => contentController.createContent(req, res));
router.get('/', (req, res) => contentController.getAllContent(req, res));
router.get('/:id', (req, res) => contentController.getContentById(req, res));
router.put('/:id', validateCreateContent, (req, res) => contentController.updateContent(req, res));
router.delete('/:id', (req, res) => contentController.deleteContent(req, res));

export const contentRoutes = router;
export default router;