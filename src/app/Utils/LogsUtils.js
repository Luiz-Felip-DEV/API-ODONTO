import winston from 'winston';

class LogsUtils {

    async gravarLog(type,mensagem)
    {
        let caminho = (type == 'info') ? "C:/xampp/htdocs/API-ODONTO/src/Logs/logs_sucess.txt" : "C:/xampp/htdocs/API-ODONTO/src/Logs/logs_error.txt";

        const logger = winston.createLogger({
          transports: [
            new winston.transports.File({ filename: caminho })
          ]
        });

        try {
            logger.log({
                level: type,
                message: mensagem,
                timestamp: await this.gerarDataLog()
            });
        } catch(error) {
            console.log(error);
        }
    }

    async gerarDataLog()
    {
        const dataAtual = new Date();

        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
        const ano = dataAtual.getFullYear();

        const hora = String(dataAtual.getHours()).padStart(2, '0');
        const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
        const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`;

    }



}

export default new LogsUtils();