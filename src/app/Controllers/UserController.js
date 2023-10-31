import UserRepository from "../Repositories/UserRepository.js";
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

            const token = jwt.sign({
                id: row[0].code_user,
            },
            secret);

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
        const email = req.body.email;

        if(!email) {
            return res.status(400).json({
                error: true,
                msgUser: "Parametro email é obrigatorio.",
                msgOriginal: "Parametro email é obrigatorio."
            });
        }

    }

}

export default new UserController();