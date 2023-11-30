import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";
import AgendamentoUtils from "../Utils/AgendamentoUtils.js";
import UserUtils from "../Utils/UserUtils.js";

class AgendamentoController {

    async getDatas(req, res)
    {
        const dia      = await AgendamentoUtils.formatarDia(req.query.dia);
        const ObjDatas = {};
        let arrResult  = [];
        let verify     = false;

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

        try {

            arrResult = await AgendamentoRepository.getDatas(param1, param2, param3, param4, param5);
            verify    = (!arrResult[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Prezado, ocorreu um erro ao trazer datas, Por favor, tente novamente mais tarde.",
                msgOriginal: "Erro ao trazer datas, caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Prezado, nenhuma data encontrada, Por Favor, tente novamente mais tarde.",
                msgOriginal: "Erro ao trazer datas, retorno vazio"
            });
        }

        const contador = Object.keys(arrResult).length;

        for(let i = 0; i < contador; i++) {
            ObjDatas[i] = arrResult[i].proxima_segunda;
        }
        
          return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: ObjDatas
        });
    }

    async getHorario(req, res)
    {
        const idProcedimento  = req.query.id_procedimento;
        let arrClinica        = [];
        let verify            = false;
        let horario1,horario2, horario3 = '';
        
        try {

            arrClinica = await AgendamentoRepository.getHorario(idProcedimento);
            verify     = (!arrClinica[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Prezado, ocorreu um erro ao buscar clinica, Por Favor, tente novamente mais tarde.",
                msgOriginal: "Erro ao trazer clinica, caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Prezado, nenhuma clinica disponivel para esse procedimento, Por Favor, tente novamente mais tarde.",
                msgOriginal: "Erro ao trazer clinica, retorno vazio"
            });
        }

        const turno       = arrClinica[0].turno;
        const nomeClinica = arrClinica[0].nome;
        const idClinica   = arrClinica[0].id

        switch(turno) {

            case 'Manhã':
                horario1 = '9:00';
                horario2 = '10:00'
                horario3 = '11:00';
                break;
            case 'Tarde':
                horario1 = '14:00';
                horario2 = '15:30';
                horario3 = '17:00';
                break;
            case 'Noite':
                horario1 = '19:00';
                horario2 = '19:30';
                horario3 = '20:00';
                break;
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: {
                'id_clinica': idClinica,
                'nome_clinica': nomeClinica,
                'horarios': [horario1, horario2, horario3]
            }
        });

    }

    async getAlunosClinica(req, res)
    {
        const periodo = req.query.periodo;
        let arrDados  = [];
        let verify    = false;

        try {
            arrDados = await AgendamentoRepository.getAlunosClinica(periodo);
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: 'Erro ao buscar alunos, Por Favor, tente novamente mais tarde.',
                msgOriginal: 'Nenhum aluno encontrado na tabela funcionario com periodo: ' + periodo
            });
        }
        
        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: 'Nenhum aluno encontrado, Por favor, tente novamente mais tarde.',
                msgOriginal: 'Nenhum aluno encontrado na tabela funcionario com periodo: ' + periodo
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrDados
        });
    }
    
    async postAgendamento(req, res)
    {
        const arrDados = await AgendamentoUtils.formataArray(req.body);

        try{

            await AgendamentoRepository.postAgendamento(arrDados);

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar agendamento.",
                msgOriginal: "Erro ao cadastrar agendamento. Caiu no catch"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Agendamento cadastrado com sucesso.",
            msgOriginal: null
        });
    }

    async statusPagamento(req, res)
    {
        const statusPagamento = req.body.status;
        const agendamentoId   = req.query.agendamento_id;
        let verify            = false;

        try {

            const arrResult = await AgendamentoRepository.statusPagamento(statusPagamento, agendamentoId);
            verify          = (arrResult.affectedRows != 1) ? true : false;
            
        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar pagamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Agendamento não encontrado, Por Favor tente novamente mais tarde.",
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
        let   verify          = false;

        try {

            const arrResult = await AgendamentoRepository.statusConsulta(statusConsulta, agendamentoId);
            verify          = (arrResult.affectedRows != 1) ? true : false;
    
        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar consulta, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao atualizar agendamento. Caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Agendamento não encontrado, Por Favor tente novamente mais tarde.",
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
        let arrAgendamento  = [];
        let verify          = false;

        try {

            arrAgendamento = await AgendamentoRepository.getAgendamento(nroProntuario, cpf);
            verify         = (!arrAgendamento[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao Buscar Agendamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao buscar agendamento, caiu no catch"
            });
        }

        arrAgendamento = await AgendamentoRepository.getAgendamento(nroProntuario, cpf);
        
        if (verify) {
            return res.status(404).json({
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
        let verify = false;
        let arrAgendamento = [];

        try {

            arrAgendamento = await AgendamentoRepository.getAgendamentoData(data);
            verify         = (!arrAgendamento[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar agendamento diario, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao buscar agendamento diario, caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
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
            verify    = (row.affectedRows != 1) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao excluir agendamento, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao deletar agendamento, agendamento não encontrado na tabela agendamento"
            });
        }
        
        if (verify) {
            return res.status(404).json({
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