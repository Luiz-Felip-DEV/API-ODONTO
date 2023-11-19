import conexao from "../DataBase/conexao.js";

class ClinicaRepository {
    
    async getProcedimentos()
    {
        const sql = "SELECT * FROM procedimentos";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }

    async postClinica(dados)
    {
        const sql = "INSERT INTO clinica SET ?";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getAllClinica()
    {
        const sql = "SELECT * FROM clinica";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getClinica(id)
    {
        const sql = "SELECT * FROM clinica WHERE id = ?";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async putClinica(id, dados)
    {
        const sql = "UPDATE clinica SET nome = ?, periodo = ?, horario = ? WHERE id = ? ";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,[dados.nome,dados.periodo,dados.horario, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }   

    async deleteClinica(id)
    {
        const sql = "DELETE FROM clinica WHERE id = ?";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new ClinicaRepository();