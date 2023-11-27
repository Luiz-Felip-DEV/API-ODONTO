import conexao from "../DataBase/conexao.js";

class HistoricoRepository {

    async getHistoricoClinica(idClinica)
    {
        const sql = "SELECT T1.nome, T1.periodo, T4.nome AS procedimento,COUNT(*) AS total_atendimentos, COUNT(CASE WHEN T2.status_consulta = 'R' THEN 1 ELSE NULL END) AS   consultas_realizadas, COUNT(CASE WHEN T2.status_consulta = 'NR' THEN 1 ELSE NULL END) AS consultas_nao_realizadas,COUNT(CASE WHEN T2.status_pagamento = 'P' THEN 1 ELSE NULL END) AS consultas_pagas,COUNT(CASE WHEN T2.status_pagamento = 'NP' THEN 1 ELSE NULL END) AS consultas_nao_pagas, CONCAT ('R$',ROUND(T4.valor, 2)) AS valor_consulta," +
        " CONCAT('R$ ', FORMAT(SUM(CASE WHEN T2.status_pagamento = 'P' THEN T4.valor ELSE 0 END), 2)) AS total_valor_consultas_pagas" +
                                                                        ' FROM clinica T1' +
                                                                            ' INNER JOIN agendamento T2' +
                                                                            ' ON (T1.id = T2.clinica_id)' +
                                                                            ' INNER JOIN clinica T3' +
                                                                            ' ON (T2.clinica_id = T3.id)' +
                                                                            ' INNER JOIN procedimentos T4' +
                                                                            ' ON (T3.procedimento_id = T4.id)' +
                                                                        'WHERE T1.id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,idClinica,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getHistoricoPaciente(nroProntuario, cpf)
    {
        const sql = "SELECT DISTINCT T1.nome, T2.status_pagamento pagamento, T2.status_consulta consulta, T2.horario_consulta, T3.turno, DATE_FORMAT(T2.data_consulta, '%Y-%m-%d') data_consulta," + " T5.nome procedimento, T5.valor, T4.nome nome_aluno, T4.cod_user cod_alu" +
                                                        " FROM pacientes T1" +
                                                            " INNER JOIN agendamento T2" +
                                                                " ON (T1.id = T2.paciente_id)" +
                                                            " INNER JOIN clinica T3" +
                                                                " ON (T2.clinica_id = T3.id)" +
                                                            " INNER JOIN funcionario T4" +
                                                                " ON (T2.aluno_id = T4.id)" +
                                                            " INNER JOIN procedimentos T5" +
                                                                " ON (T3.procedimento_id = T5.id)" +
                                                        " WHERE T1.nro_prontuario = ? OR T1.cpf = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,[nroProntuario, cpf],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new HistoricoRepository();