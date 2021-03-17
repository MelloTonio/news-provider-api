import { Router } from 'express'

import UserController from '../controllers/UserController'
import TokenController from '../controllers/TokenController'
import IsLogged from '../middlewares/IsLogged'

const router = new Router();

// FREE ROUTES
router.post('/sign-up', UserController.create);
router.post('/login', TokenController.store);


// ADMIN ROUTES
router.get('/', IsLogged, UserController.index);
// router.put('/:id', loginRequired, AlunoController.update);
// router.get('/:id', AlunoController.show);
// router.delete('/:id', loginRequired, AlunoController.delete);

export default router;