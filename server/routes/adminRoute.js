import express from 'express';

import { AdminLogin , GetUsers , GetLabs ,AddLab, AddUser  } from '../controllers/AdminController.js';

const AdminRoutes = express.Router();

AdminRoutes.post('/login', AdminLogin);
AdminRoutes.post('/addUser', AddUser);
AdminRoutes.post('/addLab', AddLab);
AdminRoutes.get('/getUsers', GetUsers);
AdminRoutes.get('/getLabs', GetLabs);

export default AdminRoutes;