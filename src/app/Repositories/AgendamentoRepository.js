import conexao from "../DataBase/conexao.js";

class AgendamentoRepository {

    async postAgendamento(dados)
    {
        const sql = 'INSERT INTO agendamento SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new AgendamentoRepository();