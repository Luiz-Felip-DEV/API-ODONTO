import PacienteRepository from "../Repositories/PacienteRepository.js";
import UserUtils from "../Utils/UserUtils.js";

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

    async putPaciente(req,res)
    {
      const id       = req.query.id;
      const arrDados = await UserUtils.retornarArrayFormatadoSemPt(req.body);

      try {
        const row = await PacienteRepository.putPaciente(id, arrDados);

        if (row.affectedRows == 0) {

          return res.status(404).json({
            error: true,
            msgUser: "Paciente não encontrado, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
          });
        }

        return res.status(200).json({
          error: false,
          msgUser: "Dados do paciente atualizado com sucesso.",
          msgOriginal: "Dados do paciente atualizado com sucesso."
        });

      } catch (error) {

        return res.status(400).json({
          error: true,
          msgUser: "Erro ao atualizar dados do paciente, Por Favor, Tente Novamente mais tarde.",
          msgOriginal: "Erro ao atualizar dados do paciente da tabela pacientes."
        });
      }
    }

    async deletePaciente(req,res)
    {
      const id = req.query.id;

      try {
        const row = await PacienteRepository.deletePaciente(id);
        
        if (row.affectedRows == 0) {

          return res.status(404).json({
            error: true,
            msgUser: "Paciente não encontrado, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
          });
        }

        return res.status(200).json({
          error: false,
          msgUser: "Paciente excluido com sucesso.",
          msgOriginal: "Paciente excluido com sucesso."
        });

      }catch (error) {

        return res.status(400).json({
          error: true,
          msgUser: "Erro ao deletar paciente, Por Favor, Tente Novamente mais tarde.",
          msgOriginal: "Erro ao deletar paciente da tabela pacientes."
        });

      }
    }
}

export default new PacienteController();