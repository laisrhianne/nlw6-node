import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/users/compliments/sent', ensureAuthenticated, listUserSentComplimentsController.handle);
router.get('/users/compliments/received', ensureAuthenticated, listUserReceivedComplimentsController.handle);

export { router };
