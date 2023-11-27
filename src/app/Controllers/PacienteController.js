import PacienteRepository from "../Repositories/PacienteRepository.js";
import UserUtils from "../Utils/UserUtils.js";

class PacienteController {

    async getPaciente(req,res)
    { 
        const nroProntuario = req.query.nro_prontuario;
        const cpf           = req.query.cpf;
        let arrDados        = [];
        let verify          = false;

      try {

        arrDados = await PacienteRepository.getPaciente(nroProntuario, cpf);
        verify   = (!arrDados[0]) ? true : false;

      } catch(error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
            error: true,
            msgUser: "Erro ao buscar paciente, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Erro ao buscar paciente da tabela pacientes."
          });
      }

      if (verify) {
          return res.status(404).json({
            error: true,
            msgUser: "Nenhum usuario encontrado, Por Favor, Mude os dados e tente novamente.",
            msgOriginal: "Nenhum usuario encontrado na tabela de pacientes."
          });
      }

        return res.status(200).json({
            error: true,
            msgUser: null,
            msgOriginal: null,
            result: arrDados
        });
    }

    async putPaciente(req,res)
    {
      const id       = req.query.id;
      const arrDados = await UserUtils.retornarArrayFormatadoSemPt(req.body);
      let arrResult  = [];
      let verify     = false;

      try {

        arrResult = await PacienteRepository.putPaciente(id, arrDados);
        verify    = (!arrResult[0]) ? true : false;

      } catch (error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
            error: true,
            msgUser: "Erro ao atualizar dados do paciente, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Erro ao atualizar dados do paciente da tabela pacientes."
          });
      }

        if(verify) {
          return res.status(404).json({
            error: true,
            msgUser: "Paciente não encontrado, Por Favor, Tente Novamente mais tarde.",
            msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
         });
      }
        
      return res.status(200).json({
          error: false,
          msgUser: "Dados do paciente atualizado com sucesso.",
          msgOriginal: null
      });
    }

    async deletePaciente(req,res)
    {
      const id       = req.query.id;
      let arrResult  = [];
      let verify     = false;

      try {

        arrResult = await PacienteRepository.deletePaciente(id);
        verify    = (row.affectedRows != 1) ? true : false;

      }catch (error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
          error: true,
          msgUser: "Erro ao deletar paciente, Por Favor, Tente Novamente mais tarde.",
          msgOriginal: "Erro ao deletar paciente da tabela pacientes."
        });
      }

      if (verify) {
        return res.status(404).json({
          error: true,
          msgUser: "Paciente não encontrado, Por Favor, Tente Novamente mais tarde.",
          msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
        });
      }

      return res.status(200).json({
        error: false,
        msgUser: "Paciente excluido com sucesso.",
        msgOriginal: null
      });
    }
}

export default new PacienteController();