import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessinController from './app/controllers/SessinController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/sessions', SessinController.store);
routes.post('/category', uploads.single('file'), CategoryController.store);
routes.put('/categories/:id', uploads.single('file'), CategoryController.update);



routes.use(authMiddleware);//aparti daqui todas as rotas vao pedir o token
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.get('/category-all', adminMiddleware, CategoryController.index);
routes.get('/products', ProductController.index);
routes.post('/product', uploads.single('file'), ProductController.store);

export default routes;
