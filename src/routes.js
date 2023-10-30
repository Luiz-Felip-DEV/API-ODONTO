import { Router } from "express";
import UserController from "./app/Controllers/UserController.js"

const router  = Router();

router.get('/login', UserController.login);
router.put('/password', UserController.putPassword);

export default router 