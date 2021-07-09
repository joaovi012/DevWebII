const agendamentoModel = require('../models/agendamento-model-pg');
const pessoaModel = require('../models/pessoa-model-pg');
const unidadeSaudeModel = require('../models/unidadeSaude-model-pg');

exports.adicionarAgendamento = async (req, res) => {
    try {
        const {
            pessoa_id,
            unidade_id,
            data_hora_agendamento,
            necessidade_especiais,
            observacao_agendamento
        } = req.body;

        const pessoa = await pessoaModel.findByPk(pessoa_id);
        const unidade = await unidadeSaudeModel.findByPk(unidade_id);

        if (!pessoa || !unidade) {
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${pessoa_id} ou a unidade de ID ${unidade_id}`
            });
        } else {
            const novoAgendamento = await agendamentoModel.create({
                pessoa_id,
                unidade_id,
                data_hora_agendamento,
                necessidade_especiais,
                observacao_agendamento
            });

            res.json({
                status: "ok",
                message: "Agendamento inserido com sucesso."
            });
        }

    } catch(error) {
        res.json({
            status: "erro",
            messagem: error
        });
    }
}
         
exports.listarTodos = async (req, res) => {
    try {
        const agendamentos = await agendamentoModel.findAll();
        res.json({
            status: "ok",
            agendamentos: agendamentos
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.listarAgendamentoPorId = async (req, res) => {
    let id_agendamento = req.params.id;
    try {
        const agendamento = await agendamentoModel.findByPk(id_agendamento);
        if (agendamento) {
            res.json({
                status: "ok",
                pessoa: agendamento
            });
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível encontrar o agendamento de ID ${id_agendamento}`
            });
        }
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.atualizarAgendamento = async (req, res) => {
    try {
        let id_agendamento = req.params.id;
        
        const {
            pessoa_id,
            unidade_id,
            data_hora_agendamento,
            necessidade_especiais,
            observacao_agendamento
        } = req.body;

        const agendamento = await agendamentoModel.findByPk(id_agendamento);

        if (agendamento) {
            agendamento.update({
                pessoa_id,
                unidade_id,
                data_hora_agendamento,
                necessidade_especiais,
                observacao_agendamento
            },{
                where: {agendamento_id: id_agendamento}
            });

            res.json({
                status: "ok",
                message: "Agendamento atualizado"
            });
        } else {
            res.json({
                status: "erro",
                message: "Agendamento não atualizado."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.removerAgendamento = async (req, res) => {
    let id_agendamento = req.params.id;
    try {
        const agendamento = await agendamentoModel.destroy({where: {agendamento_id: id_agendamento}}).then(count => {
            if (!count) {
                res.json({
                    status: "error",
                    message: "Não foi possível remover o agendamento."
                });
            } else {
                res.json({
                    status: "ok",
                    message: "Agendamento removido com sucesso."
                });
            }
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}