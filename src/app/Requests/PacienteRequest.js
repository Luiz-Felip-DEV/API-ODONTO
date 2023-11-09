import UserUtils from "../Utils/UserUtils.js";

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

        if (req.query.nro_prontuario && req.query.cpf) {
 
            return res.status(400).json({
                error: true,
                msgUser: 'Passe somente 1 parametro, sendo nro_prontuario ou cpf.',
                msgOriginal: 'Passe somente 1 parametro, sendo nro_prontuario ou cpf.'
            });
        }

        next();
    }

    putPaciente(req, res, next)
    {
        let msg = '';

        if (!req.body.nome) {
            msg = 'Parametro nome é obrigatorio.';
        }

        if (!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.';
        }

        if (!req.body.data_nasc) {
            msg = 'Parametro data_nasc é obrigatorio.';
        }

        if (!req.body.email) {
            msg = 'Parametro email é obrigatorio.';
        }

        if (!req.body.telefone) {
            msg = 'Parametro telefone é obrigatorio.';
        }

        if (!req.body.endereco) {
            msg = 'Parametro endereco é obrigatorio.';
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
        
        if (!UserUtils.emailValido(req.body.email)) {
            return res.status(400).json({
                error: true,
                msgUser: 'Email inválido, informe um email valido',
                msgOriginal: 'Email inválido, informe um email valido'
            });
        }

        next();
    }

    deletePaciente(req, res, next)
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

export default new PacienteRequest();