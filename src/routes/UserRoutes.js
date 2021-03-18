import { Router } from 'express'

import UserController from '../controllers/UserController'
import TokenController from '../controllers/TokenController'
import AdminRequired from '../middlewares/AdminRequired'

const router = new Router();

// FREE ROUTES
router.post('/sign-up', UserController.create);
router.post('/login', TokenController.store);


// ADMIN ROUTES
router.get('/', AdminRequired, UserController.index);
router.delete('/:email', AdminRequired, UserController.delete);

export default router;
