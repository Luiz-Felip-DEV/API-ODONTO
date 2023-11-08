import conexao from "../DataBase/conexao.js";
import UserUtils from "../Utils/UserUtils.js";

class PacienteRepository {

    async getPaciente(nro_prontuario, cpf)
    {
        const verificacao = (!nro_prontuario) ? 'cpf = ?' : 'nro_prontuario = ?';
        const variavel    = (!nro_prontuario) ? UserUtils.formatarCpf(cpf) : nro_prontuario;
        const sql         = "SELECT * FROM pacientes WHERE " + verificacao;
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,variavel,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new PacienteRepository();