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
                msgUser: "Desculpe, ocorreu um erro ao tentar buscar o histórico da clínica. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao buscar historico da clinica. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos nenhum dado referente à clínica que você está procurando. Certifique-se de que os critérios de busca estão corretos ou entre em contato conosco para assistência.",
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
        const info       = req.query.info;
        const contador   = Object.keys(info.split('NP')).length;
        let arrHistorico = [];
        let verify       = false;

        const sql = (contador == 1) ? `T1.cpf = '${UserUtils.formatarCpf(info)}'` : `T1.nro_prontuario = '${info}'`

        try {

            arrHistorico = await HistoricoRepository.getHistoricoPaciente(sql);
            verify       = (!arrHistorico[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar buscar o histórico do paciente. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao buscar historico do paciente. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos nenhum dado referente ao paciente que você está procurando. Certifique-se de que os critérios de busca estão corretos ou entre em contato conosco para assistência.",
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