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

    async getAgendamento(nroProntuario, cpf)
    {
        const sql = "SELECT T4.nro_prontuario, T4.nome, T2.nome AS procedimento, DATE_FORMAT(T1.data_consulta, '%Y-%m-%d') AS data_consulta, " + ' T1.status_pagamento, T1.status_consulta ,T2.horario, T3.nome AS aluno FROM agendamento T1 ' + 
                                                            ' INNER JOIN clinica T2' +
                                                                ' ON (T1.clinica_id = T2.id)' +
                                                            ' INNER JOIN funcionario T3' +
                                                                ' ON (T1.aluno_id = T3.id)' +
                                                            ' INNER JOIN pacientes T4' +
                                                                ' ON (T1.paciente_id = T4.id)' +
                                                            ' WHERE T4.nro_prontuario = ? OR T4.cpf = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[nroProntuario, cpf],(error, result) => {
                console.log(error);
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }



}

export default new AgendamentoRepository();