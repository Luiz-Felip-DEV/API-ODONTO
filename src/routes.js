import { Router } from "express";
import FuncionarioController from "./app/Controllers/FuncionarioController.js";
import FuncionarioRequest from "./app/Requests/FuncionarioRequest.js";
import ClinicaController from "./app/Controllers/ClinicaController.js";
import ClinicaRequest from "./app/Requests/ClinicaRequest.js";
import PacienteController from "./app/Controllers/PacienteController.js";
import PacienteRequest from "./app/Requests/PacienteRequest.js";
import AgendamentoController from "./app/Controllers/AgendamentoController.js";
import AgendamentoRequest from "./app/Requests/AgendamentoRequest.js";
import HistoricoController from "./app/Controllers/HistoricoController.js";
import HistoricoRequest from "./app/Requests/HistoricoRequest.js";
import Jwt from "./app/Utils/JwtUtils.js";

const router  = Router();

//GET

router.get('/periodos', Jwt.checkToken, ClinicaController.getPeriodos);
router.get('/turnos', Jwt.checkToken, ClinicaController.getTurnos);
router.get('/procedimentos', Jwt.checkToken, ClinicaController.getProcedimentos);
router.get('/procedimentos-home', Jwt.checkToken, ClinicaController.getProcedimentosHome);
router.get('/clinicas-all', Jwt.checkToken, ClinicaController.getAllClinicas);
router.get('/clinica', Jwt.checkToken, ClinicaRequest.getClinica, ClinicaController.getClinica);
router.get('/get-user', Jwt.checkToken, PacienteRequest.getPaciente, PacienteController.getPaciente);
router.get('/alunos-clinica', Jwt.checkToken, AgendamentoRequest.getAlunosClinica, AgendamentoController.getAlunosClinica);
router.get('/agendamento', Jwt.checkToken, AgendamentoController.getAgendamento);
router.get('/agendamentos-data', Jwt.checkToken, AgendamentoController.getAgendamentoData);
router.get('/datas', Jwt.checkToken, AgendamentoRequest.getDatas, AgendamentoController.getDatas);
router.get('/horario', Jwt.checkToken, AgendamentoRequest.getHorario, AgendamentoController.getHorario);
router.get('/historico-clinica', Jwt.checkToken, HistoricoRequest.getHistoricoClinica, HistoricoController.getHistoricoClinica);
router.get('/historico-paciente', Jwt.checkToken, HistoricoRequest.getHistoricoPaciente,HistoricoController.getHistoricoPaciente);
router.get('/clinicas', Jwt.checkToken, AgendamentoController.getNomesClinicas);

//POST

router.post('/login', FuncionarioRequest.login,FuncionarioController.login);
router.post('/user', Jwt.checkToken,FuncionarioRequest.postUser,FuncionarioController.postUser);
router.post('/clinica', Jwt.checkToken,ClinicaRequest.postClinica, ClinicaController.postClinica);
router.post('/agendamento', Jwt.checkToken, AgendamentoRequest.postAgendamento, AgendamentoController.postAgendamento);

//PUT

router.put('/password', FuncionarioRequest.putPassword,FuncionarioController.putPassword);
router.put('/update-clinica', Jwt.checkToken, ClinicaRequest.putClinica, ClinicaController.putClinica);
router.put('/update-paciente', Jwt.checkToken, PacienteRequest.putPaciente, PacienteController.putPaciente);
router.put('/status-pagamento', Jwt.checkToken, AgendamentoRequest.statusPagamento, AgendamentoController.statusPagamento);
router.put('/status-consulta', Jwt.checkToken,AgendamentoRequest.statusConsulta, AgendamentoController.statusConsulta);


//DELETE

router.delete('/delete-clinica', Jwt.checkToken, ClinicaRequest.deleteClinica,ClinicaController.deleteClinica);
router.delete('/delete-paciente', Jwt.checkToken, PacienteRequest.deletePaciente, PacienteController.deletePaciente);
router.delete('/delete-agendamento', Jwt.checkToken, AgendamentoRequest.deleteAgendamento, AgendamentoController.deleteAgendamento);



router.use((req, res) => {res.status(404).json({error: true,msgUser: "Rota não encontrada.",msgOriginal: "Rota não encontrada." })});

export default router 