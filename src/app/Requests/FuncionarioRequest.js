import UserUtils from "../Utils/UserUtils.js";

class FuncionarioRequest {

    login(req, res, next)
    {
        let msg = '';

        if (!req.body.cod_user) {
            msg = 'Parametro cod_user é obrigatorio.';
        }

        if (!req.body.password) {
            msg = 'Parametro password é obrigatorio.';
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

    putPassword(req, res, next)
    {
        let msg = '';

        if (!req.body.email) {
            msg = 'Parametro email é obrigatorio.';
        }

        if (!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.';
        }

        if (!req.body.password) {
            msg = 'Parametro password é obrigatorio.';
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

    postUser(req, res, next)
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


}

export default new FuncionarioRequest();