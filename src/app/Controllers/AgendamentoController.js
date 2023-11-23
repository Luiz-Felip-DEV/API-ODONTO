import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";
import AgendamentoUtils from "../Utils/AgendamentoUtils.js";
import UserUtils from "../Utils/UserUtils.js";

class AgendamentoController {
    
    async postAgendamento(req, res)
    {
        const arrDados = await AgendamentoUtils.formataArray(req.body);

        try{
            const row = await AgendamentoRepository.postAgendamento(arrDados);
            
            if (!row) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Erro ao cadastrar agendamento.",
                    msgOriginal: "Erro ao cadastrar agendamento na tabela agendamento."
                });
            }

            return res.status(200).json({
                error: false,
                msgUser: "Agendamento cadastrado com sucesso.",
                msgOriginal: null
            });


        } catch(error) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar agendamento.",
                msgOriginal: "Erro ao cadastrar agendamento. Caiu no catch"
            });
        }
    }

    async statusPagamento(req, res)
    {
        const statusPagamento = req.body.status;
        const agendamentoId   = req.query.agendamento_id;
        const verify          = false;

        try {

            const row = await AgendamentoRepository.statusPagamento(statusPagamento, agendamentoId);

            if (row.affectedRows != 1) {
                verify = true;
            }
            
        } catch(error) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar pagamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar pagamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }


        return res.status(200).json({
            error: false,
            msgUser: "Status de pagamento atualizado com sucesso.",
            msgOriginal: null
        });
    }

    async statusConsulta(req,res) 
    {
        const statusConsulta = req.body.status;
        const agendamentoId   = req.query.agendamento_id;
        const verify          = false;

        try {

            const row = await AgendamentoRepository.statusConsulta(statusConsulta, agendamentoId);

            if (row.affectedRows != 1) {
                verify = true;
            }
            
        } catch(error) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar consulta, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Consulta não encontrada, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }


        return res.status(200).json({
            error: false,
            msgUser: "Status de consulta atualizado com sucesso.",
            msgOriginal: null
        });
    }

    async getAgendamento(req, res)
    {
        const nroProntuario = (req.query.nro_prontuario) ? req.query.nro_prontuario : '';
        const cpf           = (req.query.cpf) ? UserUtils.formatarCpf(req.query.cpf) : '';

        const arrAgendamento = await AgendamentoRepository.getAgendamento(nroProntuario, cpf);
        
        if (!arrAgendamento[0]) {
            return res.status(400).json({
                error: true,
                msgUser: "Nenhum agendamento encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum agendamento encontrado na tabela agendamento"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrAgendamento
        });
    }

    async getAgendamentoData(req, res)
    {
        const data = await AgendamentoUtils.getDataAtual();
        
        const arrAgendamento = await AgendamentoRepository.getAgendamentoData(data);

        if (!arrAgendamento[0]) {
            return res.status(400).json({
                error: true,
                msgUser: "Nenhum agendamento diario encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum agendamento encontrado na tabela agendamento"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrAgendamento
        });
    }
}

export default new AgendamentoController();