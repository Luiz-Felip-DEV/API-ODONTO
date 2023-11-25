import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";
import AgendamentoUtils from "../Utils/AgendamentoUtils.js";
import UserUtils from "../Utils/UserUtils.js";

class AgendamentoController {

    async getDatas(req, res)
    {
        const dia      = await AgendamentoUtils.formatarDia(req.query.dia);
        const arrDatas = [];

        let param1, param2, param3, param4, param5 = '';

        if (dia == 'Segunda') {
            param1 = 7;
            param2 = 14;
            param3 = 21;
            param4 = 28;
            param5 = 35;
        }

        if (dia == 'Terça') {
            param1 = 8;
            param2 = 15;
            param3 = 22;
            param4 = 29;
            param5 = 36;
        }

        if (dia == 'Quarta') {
            param1 = 9;
            param2 = 16;
            param3 = 23;
            param4 = 30;
            param5 = 37;
        }

        if (dia == 'Quinta') {
            param1 = 10;
            param2 = 17;
            param3 = 24;
            param4 = 31;
            param5 = 38;
        }

        if (dia == 'Sexta') {
            param1 = 11;
            param2 = 18;
            param3 = 25;
            param4 = 32;
            param5 = 39;
        }

        const arrResult = await AgendamentoRepository.getDatas(param1, param2, param3, param4, param5);

        if (!arrResult[0]) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao trazer datas.",
                msgOriginal: "Erro ao trazer datas, retorno vazio"
            });
        }

        for (const elemento of arrResult) {
            arrDatas.push(elemento.proxima_segunda)
          }
        
          return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrDatas
        });
    }
    
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
        const statusConsulta  = req.body.status;
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

    async deleteAgendamento(req,res)
    {
        const id     = req.query.id;
        let verify   = false;

        try {

            const row = await AgendamentoRepository.deleteAgendamento(id);
            verify    = (row['affectedRows'] == 0) ? true : false;

        } catch(error) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao excluir agendamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao deletar agendamento, agendamento não encontrado na tabela agendamento"
            });
        }
        
        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Agendamento não encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao deletar agendamento, agendamento não encontrado na tabela agendamento"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Agendamento excluido com sucesso.",
            msgOriginal: null
        });
    }
}

export default new AgendamentoController();