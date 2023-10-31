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

// function checkToken(req, res, next) {

//     const authHeader = req.headers['authorization'];
//     const token      = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({msg: "Acesso Negado"});
//     }

//     try {

//         jwt.verify(token, process.env.SECRET);

//         next()

//     } catch(error) {
//         res.status(400).json({msg: "Token Invalido!"})
//     }
// }

export default router 