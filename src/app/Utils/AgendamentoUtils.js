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

    async getDataAtual()
    {
        const dataAtual = new Date();

        const ano = dataAtual.getFullYear();
        const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // O mês é baseado em zero, então é necessário adicionar 1
        const dia = dataAtual.getDate().toString().padStart(2, '0');

        // Formatar a data como "ano-mes-dia"
        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    }

}

export default new AgendamentoUtils();