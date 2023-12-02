import UserRepository from "../Repositories/FuncionarioRepository.js";
import UserUtils from "../Utils/UserUtils.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { json } from "express";

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
                msgUser: "Desculpe, ocorreu um erro ao validar seus dados. Por favor, tente novamente mais tarde.",
                msgOriginal: "Erro ao tentar fazer o processo de login."
            });
        }

        if (verify) {
            return res.status(400).json({
                error: true,
                msgUser: "O acesso foi negado devido a informações incorretas. Verifique suas credenciais e faça login novamente.",
                msgOriginal: "Dados incorretos fornecido pelo usuario."
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
            msgUser: "Acesso concedido! Você entrou com sucesso. Explore todas as funcionalidades disponíveis.",
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
                msgUser: "Desculpe, ocorreu um erro ao tentar atualizar sua senha. Verifique suas informações e tente novamente.",
                msgOriginal: "Erro ao atualizar senha na tabela funcionario."
            });
        }

        if (verify) {
            return res.status(404).json({
                error: true,
                msgUser: "Infelizmente, não conseguimos localizar um usuário com as informações fornecidas. Certifique-se de que está inserindo as informações corretas.",
                msgOriginal: "Usuario não encontrado na tabela funcionario."
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Parabéns! Sua senha foi atualizada com êxito. Continue aproveitando nossos serviços de forma segura.",
            msgOriginal: null
        });
    }

    async postUser(req, res)
    {
        const authHeader = req.headers['authorization'];
        const token      = authHeader && authHeader.split(" ")[1];

        console.log("TOKEN: " + token);
        console.log("OBJETO: " + JSON.stringify(req.body));

        if (await UserUtils.RepeatedCPF(req.body.cpf)) {
            return res.status(400).json({
                error: true,
                msgUser: 'Desculpe, parece que o CPF fornecido já está associado a um cadastro existente. Se precisar criar um novo cadastro, por favor, utilize um CPF diferente ou entre em contato conosco para obter assistência.',
                msgOriginal: 'Cpf já consta na base de dados.'
            });
        }

        if (await UserUtils.RepeatedPhone(req.body.telefone)) {
            return res.status(400).json({
                error: true,
                msgUser: 'Desculpe, o número de telefone fornecido já está associado a um cadastro existente. Se deseja cadastrar um novo usuário, por favor, utilize um número de telefone diferente ou entre em contato conosco para obter assistência.',
                msgOriginal: 'Telefone já consta na base de dados.'
            });
        }

        if (await UserUtils.RepeatedEmail(req.body.email)) {
            return res.status(400).json({
                error: true,
                msgUser: 'Desculpe, o e-mail fornecido já está associado a um cadastro existente. Se deseja cadastrar um novo usuário, por favor, utilize um endereço de e-mail diferente ou entre em contato conosco para obter assistência.',
                msgOriginal: 'Telefone já consta na base de dados.'
            });
        }

        const arrDados = await UserUtils.retornarArrayFormatado(req.body);

        try {

            await UserRepository.postUser(arrDados);
            
        }catch(error) {
            console.error(error.message);
            console.log(error.stack);
            return res.status(400).json({
                error: true,
                msgUser: 'Desculpe, ocorreu um erro ao tentar inserir seus dados para o cadastro. Verifique se todas as informações estão corretas e tente novamente. Se o problema persistir, entre em contato conosco para assistência.',
                msgOriginal: 'Erro ao inserir usuario na tabela pacientes'
            });
        }

        const ObjReturn = {
            error: false,
            msgUser: 'Sucesso! O cadastro do paciente foi realizado com êxito',
            msgOriginal: null,
            nro_prontuario: arrDados['nro_prontuario']
        };

        console.log("OBJETO RETORNADO: " + JSON.stringify(ObjReturn));

        return res.status(200).json(ObjReturn);
    }
}

export default new FuncionarioController();