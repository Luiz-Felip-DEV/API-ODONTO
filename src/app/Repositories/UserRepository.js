import conexao from "../DataBase/conexao.js";

class UserRepository {

    login(cod_user, password)
    {
        const sql = "SELECT nome,code_user, perfil,cpf, telefone, endereco FROM funcionario where code_user = ? and password =  md5(?)";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,[cod_user,password],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    } 
    
    putPassword(email,cpf, password)
    {
        const sql = "UPDATE funcionario SET password = md5(?) WHERE email = ? and cpf = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,[password, email,cpf],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }

    postUser(dados) {
        const sql = "INSERT INTO pacientes SET ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }
}
export default new UserRepository();