import express from 'express';
import {loginAdmin,adminLogout} from '../controller/adminAuthController';

const router = express.Router();

router.post('/admin-login',loginAdmin);
router.post('/admin-logout',adminLogout);
export default router;
