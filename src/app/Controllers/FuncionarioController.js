import UserRepository from "../Repositories/FuncionarioRepository.js";
import UserUtils from "../Utils/UserUtils.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class FuncionarioController {

    async login(req,res) {

        const codUser  = req.body.cod_user;
        const password = req.body.password
        let arrDados  = [];
        let verify    = false;

        try {

            arrDados = await UserRepository.login(codUser, password);
            verify   = (!arrDados[0]) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Dados incorretos.",
                msgOriginal: "Dados incorretos passado pelo usuario."
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "Dados incorretos.",
                msgOriginal: "Dados incorretos passado pelo usuario."
            });
        }

        const secret         = process.env.SECRET;
        const tempoExpiracao = 4 * 60 * 60;

        const token = jwt.sign({
            id: arrDados[0].id,
            nro_prontuario: arrDados[0].code_user,
            perfil: arrDados[0].perfil
        },
        secret,{ expiresIn: tempoExpiracao });

        delete arrDados[0].id;
        
        return res.status(200).json({
            error: false,
            msgUser: "Usuario com credenciais aceita.",
            msgOriginal: null,
            jwt: token,
            results: arrDados
        });
    }

    async putPassword(req, res)
    {
        const email    = req.body.email;
        const cpf      = UserUtils.formatarCpf(req.body.cpf);
        const password = req.body.password;
        let verify     = false;

        try {

            const arrResult = await UserRepository.putPassword(email,cpf,password);
            verify          = (arrResult.affectedRows != 1) ? true : false;

        } catch (error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao atualizar senha.",
                msgOriginal: "Erro ao atualizar senha na tabela funcionario."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Usuario não encontrado, Por Favor tente novamente mais tarde.",
                msgOriginal: "Usuario não encontrado na tabela funcionario."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Senha atualizada com sucesso.",
            msgOriginal: null
        });
    }

    async postUser(req, res)
    {
        const arrDados = await UserUtils.retornarArrayFormatado(req.body);

        try {

            await UserRepository.postUser(arrDados);
            
        }catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: 'Algo deu errado ao inserir usuario, Por favor, tente novamente mais tarde.',
                msgOriginal: 'Erro ao inserir usuario na tabela pacientes'
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: 'Usuario cadastrado com sucesso.',
            msgOriginal: null,
            nro_prontuario: arrDados['nro_prontuario']
        });
    }
}

export default new FuncionarioController();