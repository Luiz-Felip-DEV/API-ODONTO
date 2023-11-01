import UserRepository from "../Repositories/UserRepository.js";
import UserUtils from "../Utils/UserUtils.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import LogsUtils from "../Utils/LogsUtils.js";

class UserController {

    async login(req,res) {
        try {
            const row = await UserRepository.login(req.body.cod_user, req.body.password);

            const secret = process.env.SECRET;
            const tempoExpiracao = 30 * 60;

            const token = jwt.sign({
                id: row[0].id,
                nro_prontuario: row[0].code_user,
                perfil: row[0].perfil
            },
            secret,{ expiresIn: tempoExpiracao });
            delete row[0].id;
            
            await LogsUtils.gravarLog('info','Login efetuado com sucesso. [UserController - login]');
            return res.status(400).json({
                error: false,
                msgUser: "Usuario com credenciais aceita.",
                msgOriginal: "Usuario com credenciais aceita.",
                jwt: token,
                results: row
            });

        } catch (error) {
            await LogsUtils.gravarLog('error','Erro ao efetuar login. [UserController - login]');
            return res.status(400).json({
                error: true,
                msgUser: "Dados incorretos.",
                msgOriginal: "Dados incorretos passado pelo usuario."
            });
        }   
    }

    async putPassword(req, res)
    {
        const email    = req.body.email;
        const cpf      = UserUtils.formatarCpf(req.body.cpf);
        const password = req.body.password;

        try {
            const row = await UserRepository.putPassword(email,cpf,password);

            if (row.affectedRows == 0 ) {
                await LogsUtils.gravarLog('error','Usuario não encontrado na base de dados. [UserController - putPassword]');
                return res.status(404).json({
                    error: true,
                    msgUser: "Usuario não encontrado.",
                    msgOriginal: "Usuario não encontrado na tabela funcionario."
                });
            }
            await LogsUtils.gravarLog('info','Alteração de senha feita com sucesso. [UserController - putPassword]');

            return res.status(200).json({
                error: false,
                msgUser: "Senha atualizada com sucesso.",
                msgOriginal: "Senha atualizada com sucesso."
            });

        } catch (error) {
            await LogsUtils.gravarLog('error','Erro ao alterar Senha. [UserController - putPassword]');

            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar senha.",
                msgOriginal: "Erro ao atualizar senha na tabela login."
            });
        }
    }

    async postUser(req, res)
    {
        const arrDados = await UserUtils.retornarArrayFormatado(req.body);

        try {
            await UserRepository.postUser(arrDados);

            await LogsUtils.gravarLog('info','Usuario cadastrado com sucesso. [UserController - postUser]');

            return res.status(200).json({
                error: false,
                msgUser: 'Usuario cadastrado com sucesso.',
                msgOriginal: 'Usuario cadastrado com sucesso.'
            });

        }catch(erro) {
            await LogsUtils.gravarLog('error','Erro ao cadastrar Usuario. [UserController - postUser]');

            return res.status(400).json({
                error: true,
                msgUser: 'Algo deu errado ao inserir usuario, Por favor, tente novamente mais tarde.',
                msgOriginal: 'Erro ao inserir usuario na tabela pacientes'
            });
        }
    }

}

export default new UserController();