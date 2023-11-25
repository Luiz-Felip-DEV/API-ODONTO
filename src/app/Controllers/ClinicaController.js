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
        try {
            const row      = await ClinicaRepository.getProcedimentos();
            const contador = Object.keys(row).length;

            for(let i = 0; i < contador; i++) {
                delete row[i].data_log;
                row[i].nome_procedimento = row[i].nome + ' - ' + row[i].dia;
            }
        
            return res.status(200).json({
                error: false,
                msgUser: null,
                msgOriginal: null,
                results: row
            });

        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao trazer procedimentos.",
                msgOriginal: "Erro ao procedimentos da tabela procedimentos."
            });
        } 
    }
    
    async postClinica(req,res)
    {
        try {
            await ClinicaRepository.postClinica(req.body);

            return res.status(200).json({
                error: false,
                msgUser: "Clinica cadastrada com sucesso.",
                msgOriginal: "Clinica cadastrada com sucesso."
            });
        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao cadastrar clinica.",
                msgOriginal: "Erro ao cadastrar clinica na tabela clinica."
            });
        } 
    }

    async getAllClinicas(req, res)
    {
        try {

            const row = await ClinicaRepository.getAllClinica();

            return res.status(200).json({
                error: false,
                msgUser: null,
                msgOriginal: null,
                results: row
            });

        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: 'Erro ao buscar clinicas, Tente Novamente mais tarde.',
                msgOriginal: 'Erro ao buscar dados da tabela clinica',
            });
        }
    }

    async getClinica(req, res)
    {
        const id = req.query.id;
        try {

            const row = await ClinicaRepository.getClinica(id);

            if (!row[0]) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Nenhuma clinica encontrada.",
                    msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
                });
            }

            delete row[0].procedimento_id;

            return res.status(200).json({
                error: false,
                msgUser: null,
                msgOriginal: null,
                results: row
            });

        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao buscar clinica, Por Favor, Tente mais Tarde.",
                msgOriginal: "Erro ao buscar clinica."
            });
        }
    }

    async putClinica(req, res)
    {
        const id       = req.query.id;
        const arrDados = req.body;

        try {
            const row = await ClinicaRepository.putClinica(id, arrDados);

            if (row.affectedRows == 0) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Clinica não encontrada, Por Favor, Tente Novamente mais tarde.",
                    msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
                });
            }

            return res.status(200).json({
                error: false,
                msgUser: "Clinica atualizada com sucesso.",
                msgOriginal: "Clinica atualizada com sucesso."
            });

        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar dados da clinica, Por Favor, Tente mais Tarde.",
                msgOriginal: "Erro ao atualizar dados da clinica na tabela clinica."
            });
        }
    }

    async deleteClinica(req, res)
    {
        const id = req.query.id;

        try {
            const row = await ClinicaRepository.deleteClinica(id);

            if (row.affectedRows == 0) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Clinica não encontrada.",
                    msgOriginal: "Nenhuma clinica encontrada na tabela clinica com o id " + id + "."
                });
            }

            return res.status(200).json({
                error: false,
                msgUser: "Clinica deletada com sucesso.",
                msgOriginal: "Clinica deletada com sucesso."
            });

        } catch(error) {

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao deletar clinica, Por Favor, Tente Novamente mais tarde.",
                msgOriginal: "Erro ao deletar clinica da tabela clinica."
            });

        }
    }
}

export default new ClinicaController();