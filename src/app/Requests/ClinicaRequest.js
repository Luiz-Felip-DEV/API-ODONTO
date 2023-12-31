class ClinicaRequest {

    postClinica(req, res, next)
    {
        let msg = '';

        if (!req.body.periodo) {
            msg = 'Parametro periodo é obrigatorio.';
        }

        if (!req.body.turno) {
            msg = 'Parametro turno é obrigatorio.';
        }

        if (!req.body.id_procedimento) {
            msg = 'Parametro id_procedimento é obrigatorio.';
        }

        if(msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    getClinica(req, res, next)
    {

        if(!req.query.id) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro id é obrigatorio.',
                msgOriginal: 'Parametro id é obrigatorio.'
            });
        }

        next();
    }

    putClinica(req, res, next)
    {
        let msg = '';

        if(!req.body.nome) {
            msg = 'Parametro nome é obrigatorio.';
        }

        if(!req.body.periodo) {
            msg = 'Parametro periodo é obrigatorio.';
        }

        if(!req.body.turno) {
            msg = 'Parametro horario é obrigatorio.';
        }

        if (!req.query.id) {
            msg = 'Parametro id é obrigatorio.';
        }

        if(msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    deleteClinica(req, res, next)
    {
        if (!req.query.id) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro id é obrigatorio.',
                msgOriginal: 'Parametro id é obrigatorio.'
            });
        }

        next();
    }
}

export default new ClinicaRequest();