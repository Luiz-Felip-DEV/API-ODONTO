import ClinicaRepository from "../Repositories/ClinicaRepository.js";
import ClinicaUtils from "../Utils/ClinicaUtils.js";

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
        let arrResult = {};

        try {

            arrDados = await ClinicaRepository.getProcedimentos();
            verify   = (!arrDados[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar trazer os procedimentos. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer procedimentos da tabela procedimentos."
            });
        }
    
        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos procedimentos. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Nenhum procedimento encontrado da tabela procedimentos."
            });
        }

        const contador = Object.keys(arrDados).length;

        for(let i = 0; i < contador; i++) {
            arrResult[i] = arrDados[i].nome;
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrResult
        });
    }

    async getProcedimentosHome(req, res)
    {
        let arrDados = [];
        let verify   = false;

        try {

            arrDados = await ClinicaRepository.getProcedimentoHome();
            verify   = (!arrDados[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar trazer os procedimentos. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao trazer procedimentos da tabela procedimentos."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos procedimentos. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Nenhum procedimento encontrado da tabela procedimentos."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            results: arrDados
        });

    }
    
    async postClinica(req,res)
    {
        let arrProcedimento    = [];
        let verify             = false;
        const nomeProcedimento = req.body.nome;

        try {

            arrProcedimento = await ClinicaRepository.getProcedimento(nomeProcedimento);
            verify          = (!arrProcedimento[0]) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar a clínica. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar a clínica. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }
        
        const nomeClinica    = arrProcedimento[0].nome + ' - ' + arrProcedimento[0].dia;
        const procedimentoId = arrProcedimento[0].id;
        const periodo        = req.body.periodo;
        const turno          = req.body.turno;

       const verifyClinica = await ClinicaUtils.verifyClinica(nomeClinica, periodo)

        if (verifyClinica) {
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, uma clínica com esses dados já está cadastrada. Por favor, verifique as informações e tente novamente. Se precisar de ajuda, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }

        const postClinica = {
            'nome': nomeClinica,
            'periodo': periodo,
            'turno': turno,
            'procedimento_id': procedimentoId
        };

        try {

            await ClinicaRepository.postClinica(postClinica);

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar cadastrar a clínica. Verifique se todos os campos foram preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        }
        
        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! O cadastro da sua clínica foi concluído com êxito.",
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
                msgUser: 'Desculpe, ocorreu um erro ao tentar trazer clínicas. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.',
                msgOriginal: 'Erro ao buscar dados da tabela clinica',
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: 'Desculpe, não encontramos nenhuma clínica. Por favor, Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.',
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
                msgUser: "Desculpe, ocorreu um erro ao tentar buscar a clínica. Verifique sua conexão com a internet e tente novamente. Se o problema persistir, entre em contato conosco para assistência",
                msgOriginal: "Erro ao buscar clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não encontramos nenhuma clínica correspondente à sua busca. Talvez os critérios de pesquisa precisem ser ajustados. Se o problema persistir, entre em contato conosco para assistência",
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
        let verify     = false;

        try {

            const arrResult = await ClinicaRepository.putClinica(id, arrDados);
            verify          = (arrResult.changedRows != 1) ? true : false;

        } catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar os dados da clínica. Por favor, verifique as informações e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao atualizar dados da clinica na tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não conseguimos encontrar nenhuma clínica correspondente à sua busca. Verifique os detalhes e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! Os dados da sua clínica foram atualizados com êxito.",
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
                msgUser: "Desculpe, ocorreu um erro ao tentar deletar a clínica. Verifique se todos os pré-requisitos são atendidos e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Erro ao deletar clinica da tabela clinica."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Desculpe, não conseguimos encontrar nenhuma clínica correspondente à sua busca. Verifique os detalhes e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
                msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Sucesso! A clínica foi deletada com êxito.",
            msgOriginal: null
        });

    }
}

export default new ClinicaController();