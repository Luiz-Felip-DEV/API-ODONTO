import ClinicaRepository from "../Repositories/ClinicaRepository.js";

class ClinicaUtils {

    async verifyClinica(nome, periodo)
    {
        let dados = [];
        let verify = false;

        try {

            dados  = await ClinicaRepository.getVerifyClinica(nome, periodo);
            verify = (dados[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
        }   

        return verify;
    }

}

export default new ClinicaUtils();