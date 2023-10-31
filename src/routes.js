import { Router } from "express";
import UserController from "./app/Controllers/UserController.js"

const router  = Router();

//GET

router.get('/login', UserController.login);

//POST

router.post('/user', UserController.postUser);

//PUT

router.put('/password', UserController.putPassword);


//DELETE



export default router 