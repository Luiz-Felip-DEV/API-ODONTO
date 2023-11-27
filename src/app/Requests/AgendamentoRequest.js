class AgendamentoRequest {

    getDatas(req, res, next)
    {
        if (!req.query.dia) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro dia é obrigatorio.',
                msgOriginal: 'Parametro dia é obrigatorio.'
            });
        }

        next();
    }

    getHorario(req, res, next)
    {
        if (!req.query.id_procedimento) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro id_procedimento é obrigatorio.',
                msgOriginal: 'Parametro id_procedimento é obrigatorio.'
            });
        }

        next();
    }

    getAlunosClinica(req, res, next)
    {
        if (!req.query.periodo) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro periodo é obrigatorio.',
                msgOriginal: 'Parametro periodo é obrigatorio.'
            });
        }

        next();
    }

    postAgendamento(req, res, next)
    {
        let msg = '';

        if (!req.body.horario_consulta) {
            msg = 'Parametro horario_consulta é obrigatorio.';
        }

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
    
    deleteAgendamento(req, res, next)
    {
        if (!req.query.id) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro id é obrigatorio.',
                msgOriginal: 'Parametro status é obrigatorio.'
            });
        }

        next();
    }
}

export default new AgendamentoRequest();