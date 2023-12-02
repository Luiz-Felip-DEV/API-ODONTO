import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";
import AgendamentoUtils from "../Utils/AgendamentoUtils.js";
import UserUtils from "../Utils/UserUtils.js";

class AgendamentoController {

    async getNomesClinicas(req, res)
    {
        let arrDados  = [];
        let objResult = {};
        let verify    = false;

        try {

            arrDados = await AgendamentoRepository.getNomesClinicas();
            verify   = (!arrDados[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar trazer as clinicas. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer clinicas, caiu no catch"
            });
        }
        
        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos clinicas disponiveis. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer clinicas, retorno vazio"
            });
        }

        const contador = Object.keys(arrDados).length;

        for(let i = 0; i < contador; i++) {
            objResult[i] = arrDados[i].nome;
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: objResult
        });
    }

    async getDatas(req, res)
    {
        const dia      = await AgendamentoUtils.pegarDia(req.query.nome_clinica);
    
        const ObjDatas = {};
        let arrResult  = [];
        let verify     = false;

        let param1, param2, param3, param4, param5 = '';

        switch(dia) {

            case ' SEGUNDA ':
                param1 = 7;
                param2 = 14;
                param3 = 21;
                param4 = 28;
                param5 = 35;
                break;
            case ' TERCA ':
                param1 = 8;
                param2 = 15;
                param3 = 22;
                param4 = 29;
                param5 = 36;
                break;
            case ' QUARTA ':
                param1 = 9;
                param2 = 16;
                param3 = 23;
                param4 = 30;
                param5 = 37;
                break;
            case ' QUINTA ':
                param1 = 10;
                param2 = 17;
                param3 = 24;
                param4 = 31;
                param5 = 38;
                break;
            case ' SEXTA ':
                param1 = 11;
                param2 = 18;
                param3 = 25;
                param4 = 32;
                param5 = 39;
                break;
        }

        try {

            arrResult = await AgendamentoRepository.getDatas(param1, param2, param3, param4, param5);
            verify    = (!arrResult[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar trazer as datas. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer datas, caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos datas. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
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
        const nome         = req.query.nome_clinica.split('(')[0];
        let arrClinica     = [];
        let verify         = false;
        let horario1,horario2, horario3 = '';
        
        try {

            arrClinica = await AgendamentoRepository.getHorario(nome);
            verify     = (!arrClinica[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar buscar clinica. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer clinica, caiu no catch"
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos nenhum horario. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer clinica, retorno vazio"
            });
        }

        const turno       = arrClinica[0].turno;
        const nomeClinica = req.query.nome_clinica;

        switch(turno) {

            case 'Manhã':
                horario1 = '09:00';
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
                'nome_clinica': nomeClinica,
                'horarios': [horario1, horario2, horario3]
            }
        });

    }

    async getAlunosClinica(req, res)
    {
        const nomeClinica = req.query.nome_clinica.split('(')[0];
        let arrDados      = [];
        let verify        = false;

        try {

            arrDados = await AgendamentoRepository.getAlunosClinica(nomeClinica);
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: 'Desculpe, ocorreu um erro ao tentar buscar alunos. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.',
                msgOriginal: 'Nenhum aluno encontrado na tabela funcionario com periodo: ' + periodo
            });
        }
        
        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: 'Desculpe, não encontramos nenhum aluno. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.',
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
        const nomeClinica = req.body.nome_clinica.split('(')[0];
        let clinicaId     = '';
        let verify        = false;

        try {

            const arrClinica = await AgendamentoRepository.getHorario(nomeClinica);
            verify           = (!arrClinica[0]) ? true : false;
            clinicaId        = (!arrClinica[0]) ? '' : arrClinica[0].id;

        } catch (error)  {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar agendamento. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar agendamento. Caiu no catch"
            });
        }
        
        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar agendamento. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar agendamento. retorno vazio"
            });
        }

        const arrDados = await AgendamentoUtils.formataArray(req.body, clinicaId);

        try{

            await AgendamentoRepository.postAgendamento(arrDados);

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar agendamento. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar agendamento. Caiu no catch"
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! O agendamento foi concluído com êxito.",
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
        const authHeader = req.headers['authorization'];
        const token      = authHeader && authHeader.split(" ")[1];

        const info         = req.query.info;
        const contador     = Object.keys(info.split('NP')).length;
        let arrAgendamento = [];
        let verify         = false;

        console.log("TOKEN: " + token);
        console.log("PARAMETRO: " + info);

        const sql = (contador == 1) ? `T4.cpf = '${UserUtils.formatarCpf(info)}'` : `T4.nro_prontuario = '${info}'`;

        try {

            arrAgendamento = await AgendamentoRepository.getAgendamento(sql);
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

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhum agendamento encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum agendamento encontrado na tabela agendamento"
            });
        }

        const ObjReturn = {
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrAgendamento
        };

        console.log("OBJETO RETORNO: " + JSON.stringify(ObjReturn))

        return res.status(200).json(ObjReturn);
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