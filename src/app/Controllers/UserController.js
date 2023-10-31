import UserRepository from "../Repositories/UserRepository.js";
import UserUtils from "../Utils/UserUtils.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class UserController {

    async login(req,res) {
        const codUser  = req.body.cod_user;
        const password = req.body.password

        if (!codUser) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro code_user é obrigatorio.",
                msgOriginal: "Parametro code_user é obrigatorio."
            });
        }

        if (!password) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro password é obrigatorio.",
                msgOriginal: "Parametro password é obrigatorio."
            });
        }

        try {
            const row = await UserRepository.login(codUser, password);

            const secret = process.env.SECRET;
            const tempoExpiracao = 30 * 60;

            const token = jwt.sign({
                id: row[0].id,
                nro_prontuario: row[0].code_user,
                perfil: row[0].perfil
            },
            secret,{ expiresIn: tempoExpiracao });

            return res.status(400).json({
                error: false,
                msgUser: "Usuario com credenciais aceita.",
                msgOriginal: "Usuario com credenciais aceita.",
                jwt: token,
                results: row
            });

        } catch (error) {
            return res.status(400).json({
                error: true,
                msgUser: "Dados incorretos.",
                msgOriginal: "Dados incorretos passado pelo usuario."
            });
        }   
    }

    async putPassword(req, res)
    {
        const email = req.body.email;
        const cpf   = req.body.cpf;
        const newPassword = req.body.password;

        if (!email) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro email é obrigatorio.",
                msgOriginal: "Parametro email é obrigatorio."
            });
        }

        if (!cpf) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro cpf é obrigatorio.",
                msgOriginal: "Parametro cpf é obrigatorio."
            });
        }

        if(!newPassword) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro password é obrigatorio.",
                msgOriginal: "Parametro password é obrigatorio."
            });
        }

        try {

            const row = await UserRepository.putPassword(email,cpf,newPassword);

            const check = row.affectedRows

            if (check == 0 ) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Usuario não encontrado.",
                    msgOriginal: "Usuario não encontrado na base de dados."
                });
            }

            return res.status(200).json({
                error: false,
                msgUser: "Senha atualizada com sucesso.",
                msgOriginal: "Senha atualizada com sucesso."
            });

        } catch (error) {
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar senha.",
                msgOriginal: "Erro ao atualizar senha na tabela login."
            });
        }
    }

    async postUser(req, res)
    {
        const nome     = (req.body.nome) ? UserUtils.formatarNome(req.body.nome) : '';
        const cpf      = (req.body.cpf) ? UserUtils.formatarCpf(req.body.cpf) : '';
        const dataNasc = req.body.data_nasc;
        const email    = req.body.email;
        const telefone = (req.body.telefone) ? UserUtils.formatarTelefone(req.body.telefone) : '';
        const endereco = req.body.endereco;

        let msg = '';

        if (!nome) {
            msg = 'Parametro nome é obrigatorio.';
        }

        if (!cpf) {
            msg = 'Parametro cpf é obrigatorio.';
        }

        if (!dataNasc) {
            msg = 'Parametro data_nasc é obrigatorio.'
        }

        if (!email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if (!telefone) {
            msg = 'Parametro telefone é obrigatorio.'
        }

        if (!endereco) {
            msg = 'Parametro endereco é obrigatorio.'
        }

        if(msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        if (!UserUtils.emailValido(email)) {
            return res.status(400).json({
                error: true,
                msgUser: 'Email inválido, informe um email valido.',
                msgOriginal: 'Email inválido, informe um email valido.'
            });
        }

        const nroProntuario = await UserUtils.gerarNumeroProtuario();

        const arrDados = {nro_protocolo: nroProntuario, nome: nome, cpf: cpf, dataNasc: dataNasc, email: email, telefone: telefone, endereco: endereco};

        const row = await UserRepository.postUser(arrDados);
        
        if (!row) {
            return res.status(400).json({
                error: true,
                msgUser: 'Algo deu errado ao inserir usuario, Por favor, tente novamente mais tarde.',
                msgOriginal: 'Erro ao inserir usuario na tabela pacientes.'
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: 'Usuario cadastrado com sucesso.',
            msgOriginal: 'Usuario cadastrado com sucesso.'
        });
    }

}

export default new UserController();