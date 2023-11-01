class UserUtils {

    /**
     * gera um numero de prontuario
     * @returns 
     */
    async gerarNumeroProtuario()
    {
        const campofixo     = 'NP'
        const numero        = Math. random() * 12345
        const nroProntuario = campofixo + numero.toFixed(0.5)

        return nroProntuario;
    }
    /**
     * 
     * @param {*} nome 
     * formata um nome
     * @returns 
     */

    formatarNome(nome)
    {
        const arrNome = nome.split(' ');
        for (let i = 0; i < arrNome.length; i++) {
            arrNome[i] = arrNome[i].charAt(0).toUpperCase() + arrNome[i].slice(1);
        }

        return arrNome.join(' ');
    }
    /**
     * 
     * @param {*} cpf 
     * formata um cpf
     * @returns 
     */

    formatarCpf(cpf)
    {
        const cpfLimpo = cpf.replace(/\D/g, '');

        const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        return cpfLimpo.replace(regex, '$1.$2.$3-$4');
    }

    /**
     * 
     * @param {*} telefone 
     * formata um numero de telefone
     * @returns 
     */
    formatarTelefone(telefone) {
        const telefoneLimpo = telefone.replace(/\D/g, '');

        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return telefoneLimpo.replace(regex, '($1) $2-$3');
    }

    /**
     * 
     * @param {*} email 
     * valida se um email é valido
     * @returns 
     */
    emailValido(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 
     * @param {*} data
     * '2023-09-09 -> formato de entrada' 
     * @returns 
     */
    formatarData(data)
    {
        const date = new Date(data);
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');
        return `${ano}/${mes}/${dia}`;
    }

    async retornarArrayFormatado(dados)
    {
        const nome     = (dados.nome) ? this.formatarNome(dados.nome) : '';
        const cpf      = (dados.cpf) ? this.formatarCpf(dados.cpf) : '';
        const dataNasc = dados.data_nasc;
        const email    = dados.email;
        const telefone = (dados.telefone) ? this.formatarTelefone(dados.telefone) : '';
        const endereco = dados.endereco;

        const nroProntuario = await this.gerarNumeroProtuario();

        const arrDados = {nro_protocolo: nroProntuario, nome: nome, cpf: cpf, dataNasc: dataNasc, email: email, telefone: telefone, endereco: endereco};

        return arrDados;
    }
}

export default new UserUtils();