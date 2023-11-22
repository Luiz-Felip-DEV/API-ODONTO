import UserUtils from "./UserUtils.js";
class AgendamentoUtils {

    async formataArray(dados) {

        const data_consulta = (dados.data_consulta) ? UserUtils.formatarData(dados.data_consulta) : '';
        const pacienteId    = dados.paciente_id;
        const clinicaId     = dados.clinica_id;
        const alunoId       = dados.aluno_id;

        const arrDados = {status_pagamento: '', status_consulta: '', data_consulta: data_consulta, paciente_id: pacienteId, clinica_id: clinicaId, aluno_id: alunoId};

        return arrDados;
    }
}

export default new AgendamentoUtils();