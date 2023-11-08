class PacienteRequest {

    getPaciente(req, res, next)
    {
        if (!req.query.nro_prontuario && !req.query.cpf) {
 
            return res.status(400).json({
                error: true,
                msgUser: 'Passe um parametro com nro_prontuario ou cpf.',
                msgOriginal: 'Passe um parametro com nro_prontuario ou cpf.'
            });
        }

        next();
    }
}

export default new PacienteRequest();