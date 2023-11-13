import AgendamentoRepository from "../Repositories/AgendamentoRepository.js";

class AgendamentoController {
    
    async postAgendamento(req, res)
    {
        try{
            const row = await AgendamentoRepository.postAgendamento(req.body);
            
            if (!row) {
                return res.status(404).json({
                    error: true,
                    msgUser: "Erro ao cadastrar agendamento.",
                    msgOriginal: "Erro ao cadastrar agendamento na tabela agendamento."
                });
            }

            return res.status(200).json({
                error: false,
                msgUser: "Agendamento cadastrado com sucesso.",
                msgOriginal: null
            });


        } catch(error) {
            return res.status(400).json({
                error: false,
                msgUser: "Agendamento cadastrado com sucesso.",
                msgOriginal: null
            });
        }
    }

}

export default new AgendamentoController();