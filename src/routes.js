import { Router } from "express";
import UserController from "./app/Controllers/UserController.js"
import Jwt from "./app/Utils/Jwt.js";

const router  = Router();

//GET

//POST

router.post('/login', UserController.login);
router.post('/user', Jwt.checkToken,UserController.postUser);

//PUT

router.put('/password', UserController.putPassword);


//DELETE


export default router 