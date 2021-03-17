import { Router } from 'express'

import ArticleController from '../controllers/ArticleController'

import AdminRequired from '../middlewares/AdminRequired'

const router = new Router();

// ADMIN ROUTES
router.get('/', AdminRequired, ArticleController.index);
router.post('/', AdminRequired, ArticleController.create);
router.put('/:id', AdminRequired, ArticleController.update);
router.delete('/:id', AdminRequired, ArticleController.delete);
export default router;