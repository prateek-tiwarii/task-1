import express from 'express';

import { UserLogin , UpdateUserPassword , getUserLab } from '../controllers/UserController.js';

const UserRoutes = express.Router();

UserRoutes.post('/login', UserLogin);
UserRoutes.post('/updatePassword', UpdateUserPassword);
UserRoutes.post('/getLab', getUserLab);

export default UserRoutes;