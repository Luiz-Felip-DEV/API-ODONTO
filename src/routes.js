import { Router } from "express";
import UserController from "./app/Controllers/UserController.js";
import UserRequest from "./app/Requests/UserRequest.js";
import Jwt from "./app/Utils/JwtUtils.js";

const router  = Router();

//GET

//POST

router.post('/login', UserRequest.login,UserController.login);
router.post('/user', Jwt.checkToken,UserRequest.postUser,UserController.postUser);

//PUT

router.put('/password', UserRequest.putPassword,UserController.putPassword);


//DELETE


export default router 