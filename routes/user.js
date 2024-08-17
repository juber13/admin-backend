import { Router } from "express";

const router = Router();

import { register, login, getUsers } from "../controllers/userContorller.js";

router.post('/register', register)
router.post('/login', login)
router.get('/user-list', getUsers)


export default router;