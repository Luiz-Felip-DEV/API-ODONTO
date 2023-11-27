class HistoricoRequest {

    getHistoricoClinica(req, res, next)
    {
        if (!req.query.id_clinica) {
            return res.status(400).json({
                error: true,
                msgUser: 'Parametro id_clinica é obrigatorio.',
                msgOriginal: 'Parametro id_clinica é obrigatorio.'
            });
        }

        next();
    }
}

export default new HistoricoRequest();