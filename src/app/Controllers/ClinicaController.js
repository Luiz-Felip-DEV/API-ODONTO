import ClinicaRepository from "../Repositories/ClinicaRepository.js";

class ClinicaController {

    async getPeriodos(req,res)
    {
        const periodos = {
            0: "5º",
            1: "6º",
            2: "7º",
            3: "8º",
            4: "9º",
            5: "10º"
        };

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: JSON.parse(JSON.stringify(periodos))
        });
    }

    async getTurnos(req,res)
    {
        const horarios = {
            0:'Manhã',
            1:'Tarde',
            2:'Noite'
        };

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: JSON.parse(JSON.stringify(horarios))
        });
    }

    async getProcedimentos(req,res)
    {
        let arrDados  = [];
        let verify    = false;
        let arrResult = [];

        try {

            arrDados = await ClinicaRepository.getProcedimentos();
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao trazer procedimentos, Por Favor tente novamente mais tarde.",
                msgOriginal: "Erro ao trazer procedimentos da tabela procedimentos."
            });
        }
    
        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhum procedimento encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Nenhum procedimento encontrado da tabela procedimentos."
            });
        }

        const contador = Object.keys(arrDados).length;

        for(let i = 0; i < contador; i++) {
            arrResult.push(arrDados[i].nome);
            // delete arrDados[i].data_log;
            // arrDados[i].nome_procedimento = arrDados[i].nome + ' - ' + arrDados[i].dia;
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrResult
        });
    }
    
    async postClinica(req,res)
    {
        let arrProcedimento   = [];
        let verify            = false;
        const nomeProcedimento = req.body.nome;

        try {

            arrProcedimento = await ClinicaRepository.getProcedimento(nomeProcedimento);
            verify          = (!arrProcedimento[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar clinica.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Erro ao cadastrar clinica.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }

        const postClinica = {
            'nome': arrProcedimento[0].nome + ' - ' + arrProcedimento[0].dia,
            'periodo': req.body.periodo,
            'turno': req.body.turno,
            'procedimento_id': arrProcedimento[0].id
        };

        try {

            await ClinicaRepository.postClinica(postClinica);

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar clinica.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }
        
        return res.status(200).json({
            error: false,
            msgUser: "Clinica cadastrada com sucesso.",
            msgOriginal: "Clinica cadastrada com sucesso."
        });
    }

    async getAllClinicas(req, res)
    {
        let arrDados = [];
        let verify   = false

        try {

            arrDados = await ClinicaRepository.getAllClinica();
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: 'Erro ao buscar clinicas, Por Favor tente novamente mais tarde.',
                msgOriginal: 'Erro ao buscar dados da tabela clinica',
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: 'Nenhuma clinica encontrada, Por Favor tente novamente mais tarde.',
                msgOriginal: 'Erro ao buscar dados da tabela clinica',
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrDados
        });
    }

    async getClinica(req, res)
    {
        const id     = req.query.id;
        let arrDados = [];
        let verify   = false

        try {
            console.error(error.message);
            console.log(error.stack);
            arrDados = await ClinicaRepository.getClinica(id);
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar clinica, Por Favor, Tente mais Tarde.",
                msgOriginal: "Erro ao buscar clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhuma clinica encontrada.",
                msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
            });
        }

        delete arrDados[0].procedimento_id;

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrDados
        });
    }

    async putClinica(req, res)
    {
        const id       = req.query.id;
        const arrDados = req.body;
        let arrResult  = [];
        let verify     = false;

        try {

            arrResult = await ClinicaRepository.putClinica(id, arrDados);
            verify    = (row.affectedRows != 1) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar dados da clinica, Por Favor, Tente mais Tarde.",
                msgOriginal: "Erro ao atualizar dados da clinica na tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Clinica não encontrada, Por Favor, Tente Novamente mais tarde.",
                msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Clinica atualizada com sucesso.",
            msgOriginal: null
        });
    }

    async deleteClinica(req, res)
    {
        const id       = req.query.id;
        let verify     = false;

        try {

            const arrDados = await ClinicaRepository.deleteClinica(id);
            verify         = (arrDados.affectedRows != 1) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao deletar clinica, Por Favor, Tente Novamente mais tarde.",
                msgOriginal: "Erro ao deletar clinica da tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhuma clinica encontrada, Por Favor, Tente Novamente mais tarde.",
                msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Clinica deletada com sucesso.",
            msgOriginal: null
        });

    }
}

export default new ClinicaController();