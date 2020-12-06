import express from 'express';

const router = express.Router();
import { register, login , logout, refreshToken} from '../controller/aut.controller.js';


router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.delete('/logout', logout);


export default router;