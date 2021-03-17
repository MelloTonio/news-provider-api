import { Router } from 'express'

import ArticleController from '../controllers/ArticleController'
import IsLogged from '../middlewares/IsLogged'

const router = new Router();

router.get('/:id', IsLogged, ArticleController.findById);

router.get('/', ArticleController.findByCategory);

export default router;