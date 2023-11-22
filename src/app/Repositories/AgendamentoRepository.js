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

    async statusPagamento(statusPagamento, id)
    {
        const sql = 'UPDATE agendamento SET status_pagamento = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[statusPagamento, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async statusConsulta(statusConsulta, id)
    {
        const sql = 'UPDATE agendamento SET status_consulta = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[statusConsulta, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }


}

export default new AgendamentoRepository();