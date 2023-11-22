class AgendamentoRequest {

    postAgendamento(req, res, next)
    {
        let msg = '';

        if (!req.body.data_consulta) {
            msg = 'Parametro data_consulta é obrigatorio.';
        }

        if (!req.body.paciente_id) {
            msg = 'Parametro paciente_id é obrigatorio.';
        }

        if (!req.body.clinica_id) {
            msg = 'Parametro clinica_id é obrigatorio.';
        }

        if (!req.body.aluno_id) {
            msg = 'Parametro aluno_id é obrigatorio.';
        }

        if (msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    statusPagamento(req, res, next)
    {
        let msg = '';

        if (!req.query.agendamento_id) {
            msg = 'Parametro agendamento_id é obrigatorio.';
        }

        if (!req.body.status) {
            msg = 'Parametro status é obrigatorio.'
        }

        if (msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    statusConsulta(req, res, next)
    {
        let msg = '';

        if (!req.query.agendamento_id) {
            msg = 'Parametro agendamento_id é obrigatorio.';
        }

        if (!req.body.status) {
            msg = 'Parametro status é obrigatorio.'
        }

        if (msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }
    
}

export default new AgendamentoRequest();