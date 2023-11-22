import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";
import AgendamentoUtils from "../Utils/AgendamentoUtils.js";

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
}

export default new AgendamentoController();