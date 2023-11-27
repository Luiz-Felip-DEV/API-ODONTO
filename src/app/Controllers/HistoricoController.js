import HistoricoRepository from "../Repositories/HistoricoRepository.js";
import UserUtils from "../Utils/UserUtils.js";

class HistoricoController {

    async getHistoricoClinica(req, res)
    {
        const idClinica  = req.query.id_clinica
        let arrHistorico = [];
        let verify       = false;

        try {

            arrHistorico = await HistoricoRepository.getHistoricoClinica(idClinica);
            verify       = (arrHistorico[0].nome == null && arrHistorico[0].procedimento == null) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar historico da clinica, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao buscar historico da clinica. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhum dado foi encontrado referente a essa clinica, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum historico encontrado dessa clinica na tabela agendamento"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal:null,
            result: arrHistorico
        });
    }

    async getHistoricoPaciente(req, res)
    {
        const nroProntuario = (req.query.nro_prontuario) ? req.query.nro_prontuario : '';
        const cpf           = (req.query.cpf) ? UserUtils.formatarCpf(req.query.cpf) : '';
        let arrHistorico    = [];
        const verify          = false;

        try {

            arrHistorico = await HistoricoRepository.getHistoricoPaciente(nroProntuario, cpf);
            verify       = (!arrHistorico[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar historico do paciente, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao buscar historico do paciente. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhum dado foi encontrado referente a esse paciente, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum historico encontrado desse paciente na tabela agendamento"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal:null,
            result: arrHistorico
        });
    }
}

export default new HistoricoController();