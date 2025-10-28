import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import authenticateToken from '../middlewares/isAuthenicated.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.put('/profile/update',authenticateToken,updateProfile);
router.post('/logout',logout);


export default router;

