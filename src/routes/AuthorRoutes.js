import { Router } from 'express'

import AuthorController from '../controllers/AuthorController'
import AdminRequired from '../middlewares/AdminRequired'

const router = new Router();

// ADMIN ROUTES
router.get('/', AdminRequired, AuthorController.index);
router.post('/', AdminRequired, AuthorController.create);
router.put('/', AdminRequired, AuthorController.update)
router.delete('/', AdminRequired, AuthorController.delete)
export default router;