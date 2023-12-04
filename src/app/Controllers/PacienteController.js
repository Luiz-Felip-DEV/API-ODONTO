import PacienteRepository from "../Repositories/PacienteRepository.js";
import UserUtils from "../Utils/UserUtils.js";

class PacienteController {

    async getPaciente(req,res)
    { 
        const info      = req.query.info;
        const contador  = Object.keys(info.split('NP')).length;
        let arrDados    = [];
        let verify      = false;

        const sql = (contador == 1) ? `cpf = '${UserUtils.formatarCpf(info)}'` : `nro_prontuario = '${info}'`

      try {

        arrDados = await PacienteRepository.getPaciente(sql);
        verify   = (!arrDados[0]) ? true : false;

      } catch(error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
            error: true,
            msgUser: "Desculpe, ocorreu um erro ao tentar buscar informações sobre o paciente. Tente Novamente. Se o problema persistir, entre em contato conosco para assistência.",
            msgOriginal: "Erro ao buscar paciente da tabela pacientes."
          });
      }

      if (verify) {
          return res.status(404).json({
            error: true,
            msgUser: "Desculpe, não encontramos nenhum paciente correspondente à sua busca. Certifique-se de que os critérios de pesquisa estão corretos ou entre em contato conosco para assistência.",
            msgOriginal: "Nenhum usuario encontrado na tabela de pacientes."
          });
      }

        return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            result: arrDados
        });
    }

    async putPaciente(req,res)
    {
      const authHeader = req.headers['authorization'];
      const token      = authHeader && authHeader.split(" ")[1];

      console.log("TOKEN: " + token);
      console.log("OBJETO: " + JSON.stringify(req.body));

      const id       = req.query.id;
      const arrDados = await UserUtils.retornarArrayFormatadoSemPt(req.body);
      let verify     = false;

      try {

        const arrResult = await PacienteRepository.putPaciente(id, arrDados);
        verify          = (arrResult.changedRows != 1) ? true : false;

      } catch (error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
            error: true,
            msgUser: "Desculpe, ocorreu um erro ao tentar atualizar os dados do paciente. Por favor, verifique as informações inseridas e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
            msgOriginal: "Erro ao atualizar dados do paciente da tabela pacientes."
          });
      }

        if(verify) {
          return res.status(404).json({
            error: true,
            msgUser: "Desculpe, não encontramos nenhum paciente correspondente à sua busca. Certifique-se de que os critérios de pesquisa estão corretos ou entre em contato conosco para assistência.",
            msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
         });
      }

        const arrReturn = {
          error: false,
          msgUser: "Sucesso! Os dados do paciente foram atualizados com êxito.",
          msgOriginal: null
      };

      console.log("OBJETO RETORNADO: " + JSON.stringify(arrReturn));
        
      return res.status(200).json(arrReturn);
    }

    async deletePaciente(req,res)
    {
      const authHeader = req.headers['authorization'];
      const token      = authHeader && authHeader.split(" ")[1];

      const id    = req.query.id;
      let verify  = false;

      console.log("TOKEN: " + token);
      console.log("PARAMETRO: " + id);

      try {

        const arrResult = await PacienteRepository.deletePaciente(id);
        verify          = (arrResult.affectedRows != 1) ? true : false;

      }catch (error) {
        console.error(error.message);
        console.log(error.stack);
        return res.status(400).json({
          error: true,
          msgUser: "Desculpe, ocorreu um erro ao tentar deletar os dados do paciente. Verifique se todos os pré-requisitos são atendidos e tente novamente. Se o problema persistir, entre em contato conosco para assistência.",
          msgOriginal: "Erro ao deletar paciente da tabela pacientes."
        });
      }

      if (verify) {
        return res.status(404).json({
          error: true,
          msgUser: "Desculpe, não encontramos nenhum paciente correspondente à sua busca. Certifique-se de que os critérios de pesquisa estão corretos ou entre em contato conosco para assistência.",
          msgOriginal: "Nenhum paciente encontrado na tabela pacientes com o id " + id + "."
        });
      }

      const arrResult = {
        error: false,
        msgUser: "Sucesso! Os dados do paciente foram deletados com êxito.",
        msgOriginal: null
      };

      console.log("OBJETO RETORNO: " + JSON.stringify(arrResult));

      return res.status(200).json(arrResult);
    }
}

export default new PacienteController();