import PacienteRepository from "../Repositories/PacienteRepository.js";

class PacienteController {

    async getPaciente(req,res)
    {
        const nroProntuario = req.query.nro_prontuario;
        const cpf           = req.query.cpf;
        
      try {

        const row = await PacienteRepository.getPaciente(nroProntuario, cpf);
        delete row[0].data_cadastro;
        
        if (!row[0]) {
            return res.status(404).json({
                error: true,
                msgUser: "Nenhum usuario encontrado, Por Favor, Mude os dados e tente novamente.",
                msgOriginal: "Nenhum usuario encontrado na tabela de pacientes."
            });
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
            msgUser: "Erro ao buscar paciente, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Erro ao buscar paciente da tabela pacientes."
        });
      }
    }
}

export default new PacienteController();