const unidadeSaudeModel = require('../models/unidadeSaude-model-pg');
const agendamentoModel = require('../models/agendamento-model-pg');
const pessoaModel = require('../models/pessoa-model-pg');


exports.adicionarUnidade = async (req, res) => {
    try {
        const {
            nome_unidade,
            descricao_unidade,
            endereco_unidade,
            telefone_unidade,
            email_unidade,
            latlong_unidade
        } = req.body;

        const novaUnidade = await unidadeSaudeModel.create({
            nome_unidade,
            descricao_unidade,
            endereco_unidade,
            telefone_unidade,
            email_unidade,
            latlong_unidade
        });

        res.json({
            status: "ok",
            message: "Unidade inserida com sucesso."
        });

    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.listarTodas = async (req, res) => {
    try {
        const unidades = await unidadeSaudeModel.findAll();
        res.json({
            status: "ok",
            unidades: unidades
        })
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        })
    }
}

exports.listarUnidadePorId = async (req, res) => {
    let id_unidade = req.params.id;
    try {
        const unidade = await unidadeSaudeModel.findByPk(id_unidade);
        if (unidade) {
            res.json({
                status: "ok",
                unidade: unidade
            });
        } else {
            res.json({
                status: "erro",
                message: "Não foi possível encontrar a unidade."
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


// Faz a atualização de uma unidade (a busca é feita por ID):
exports.atualizarUnidade = async (req, res) => {
    try {
        let id_unidade = req.params.id;
        
        const {
            nome_unidade,
            descricao_unidade,
            endereco_unidade,
            telefone_unidade,
            email_unidade,
            latlong_unidade
        } = req.body;

        const unidade = await unidadeSaudeModel.findByPk(id_unidade);

        if (unidade) {
            unidade.update({
                nome_unidade,
                descricao_unidade,
                endereco_unidade,
                telefone_unidade,
                email_unidade,
                latlong_unidade
            },{where: {unidade_id: id_unidade}});

            res.json({
                status: "ok",
                message: "Unidade atualizada"
            });
        } else {
            res.json({
                status: "erro",
                message: "Unidade não atualizada."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.removerUnidade = async (req, res) => {
    let id_unidade = req.params.id;
    try {
        const unidade = await unidadeSaudeModel.destroy({where: {unidade_id: id_unidade}}).then(count => {
            if (!count) {
                res.json({
                    status: "error",
                    message: "Não foi possível deletar."
                });
            } else {
                    res.json({
                    status: "ok",
                    message: "Unidade deletada com sucesso."
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