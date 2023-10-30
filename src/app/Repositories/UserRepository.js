import conexao from "../DataBase/conexao.js";

class UserRepository {

    login(cod_user, password)
    {
        const sql = `SELECT code_user, nome, cpf, telefone, endereco,typeuser FROM login where code_user = ${cod_user} and password =  md5('${password}')`;
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    } 
    
    putPassword(email,cpf, password)
    {
        const sql = `UPDATE login SET password = md5('${password}') WHERE email = '${email}' and cpf = '${cpf}'`;

        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })


    }
}
export default new UserRepository();