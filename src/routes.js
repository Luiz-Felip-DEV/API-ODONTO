import { Router } from "express";
import FuncionarioController from "./app/Controllers/FuncionarioController.js";
import FuncionarioRequest from "./app/Requests/FuncionarioRequest.js";
import ClinicaController from "./app/Controllers/ClinicaController.js";
import ClinicaRequest from "./app/Requests/ClinicaRequest.js";
import PacienteController from "./app/Controllers/PacienteController.js";
import PacienteRequest from "./app/Requests/PacienteRequest.js";
import Jwt from "./app/Utils/JwtUtils.js";

const router  = Router();

//GET

router.get('/periodos', Jwt.checkToken, ClinicaController.getPeriodos);
router.get('/horarios', Jwt.checkToken, ClinicaController.getHorarios);
router.get('/procedimentos', Jwt.checkToken, ClinicaController.getProcedimentos);
router.get('/clinicas-all', Jwt.checkToken, ClinicaController.getAllClinicas);
router.get('/clinica', Jwt.checkToken, ClinicaRequest.getClinica, ClinicaController.getClinica);
router.get('/get-user', Jwt.checkToken, PacienteRequest.getPaciente, PacienteController.getPaciente);

//POST

router.post('/login', FuncionarioRequest.login,FuncionarioController.login);
router.post('/user', Jwt.checkToken,FuncionarioRequest.postUser,FuncionarioController.postUser);
router.post('/clinica', Jwt.checkToken,ClinicaRequest.postClinica, ClinicaController.postClinica);

//PUT

router.put('/password', FuncionarioRequest.putPassword,FuncionarioController.putPassword);
router.put('/update-clinica', Jwt.checkToken, ClinicaRequest.putClinica, ClinicaController.putClinica);


//DELETE

router.delete('/delete-clinica', Jwt.checkToken, ClinicaRequest.deleteClinica,ClinicaController.deleteClinica);



router.use((req, res) => {res.status(404).json({error: true,msgUser: "Rota não encontrada.",msgOriginal: "Rota não encontrada." })});

export default router 