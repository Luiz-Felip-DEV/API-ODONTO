import conexao from "../DataBase/conexao.js";

class AgendamentoRepository {

    async getDatas(param1, param2, param3, param4, param5)
    {
        const sql = "SELECT DATE_FORMAT(CURDATE() + INTERVAL (? - WEEKDAY(CURDATE())) DAY, '%Y-%m-%d') AS proxima_segunda" +
                                        ' UNION' +
                                    " SELECT DATE_FORMAT( CURDATE() + INTERVAL (? - WEEKDAY(CURDATE())) DAY, '%Y-%m-%d')" +
                                        ' UNION' +
                                    " SELECT DATE_FORMAT( CURDATE() + INTERVAL (? - WEEKDAY(CURDATE())) DAY,'%Y-%m-%d')" +
                                        ' UNION' +
                                    " SELECT DATE_FORMAT( CURDATE() + INTERVAL (? - WEEKDAY(CURDATE())) DAY,'%Y-%m-%d')" +
                                        ' UNION' +
                                    " SELECT DATE_FORMAT( CURDATE() + INTERVAL (? - WEEKDAY(CURDATE())) DAY, '%Y-%m-%d')";

        return new Promise((resolve, reject) => {
            conexao.query(sql,[param1, param2, param3, param4, param5],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getHorario(idProcedimento)
    {
        const sql = 'SELECT * FROM clinica WHERE procedimento_id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,idProcedimento,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    getAlunosClinica(periodo)
    {
        const sql = "SELECT id, nome, cod_user FROM funcionario WHERE perfil = 'Alu' and periodo = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,periodo,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }

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
        const sql = "SELECT T1.id AS id_agendamento, T4.nro_prontuario, T4.nome, T2.nome AS procedimento,  DATE_FORMAT(T1.data_consulta, '%Y-%m-%d') AS data, T1.horario_consulta horario, T2.turno, T1.status_pagamento, T1.status_consulta , T3.nome AS aluno, T3.cod_user cod_alu " +
                                                    'FROM agendamento T1 ' + 
                                                            ' INNER JOIN clinica T2' +
                                                                ' ON (T1.clinica_id = T2.id)' +
                                                            ' INNER JOIN funcionario T3' +
                                                                ' ON (T1.aluno_id = T3.id)' +
                                                            ' INNER JOIN pacientes T4' +
                                                                ' ON (T1.paciente_id = T4.id)' +
                                                            ' WHERE T4.nro_prontuario = ? OR T4.cpf = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[nroProntuario, cpf],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getAgendamentoData(dataConsulta)
    {
        const sql =  "SELECT T4.nro_prontuario, T4.nome, T2.nome procedimento, DATE_FORMAT(T1.data_consulta, '%Y-%m-%d') data_consulta, T1.status_pagamento, T1.status_consulta, T1.horario_consulta, T3.nome aluno, T3.cod_user cod_alu " + 
                                                'FROM agendamento T1 ' +
                                                            ' INNER JOIN clinica T2' +
                                                                ' ON (T1.clinica_id = T2.id)' +
                                                            ' INNER JOIN funcionario T3' +
                                                                ' ON (T1.aluno_id = T3.id)' +
                                                            ' INNER JOIN pacientes T4' +
                                                                ' ON (T1.paciente_id = T4.id)' +
                                                            ' WHERE T1.data_consulta = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dataConsulta,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async deleteAgendamento(id)
    {
        const sql = "DELETE FROM agendamento WHERE id = ?";
    
        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

}

export default new AgendamentoRepository();