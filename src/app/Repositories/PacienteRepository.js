import conexao from "../DataBase/conexao.js";
import UserUtils from "../Utils/UserUtils.js";

class PacienteRepository {

    async getPaciente(nro_prontuario, cpf)
    {
        const verificacao = (!nro_prontuario) ? 'cpf = ?' : 'nro_prontuario = ?';
        const variavel    = (!nro_prontuario) ? UserUtils.formatarCpf(cpf) : nro_prontuario;
        const sql         = "SELECT id, nro_prontuario, nome, cpf, DATE_FORMAT(datanasc, '%Y-%m-%d') as data_nascimento, email, telefone, endereco FROM pacientes WHERE " + verificacao;
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,variavel,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async putPaciente(id, dados)
    {
        const sql = 'UPDATE pacientes SET nome = ?, cpf = ?, datanasc = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[dados.nome, dados.cpf, dados.dataNasc,dados.email,dados.telefone,dados.endereco, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async deletePaciente(id)
    {
        const sql = 'DELETE FROM pacientes WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async verifyTelephone(telefone)
    {
        const sql = 'SELECT * FROM pacientes WHERE telefone = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,telefone,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async verifyCPF(cpf)
    {
        const sql = 'SELECT * FROM pacientes WHERE cpf = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,cpf,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async verifyEmail(email)
    {
        const sql = 'SELECT * FROM pacientes WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new PacienteRepository();