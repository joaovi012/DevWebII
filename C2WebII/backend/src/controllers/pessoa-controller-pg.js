const pessoaModel = require('../models/pessoa-model-pg');
const agendamentoModel = require('../models/agendamento-model-pg');
const unidadeSaudeModel = require('../models/unidadeSaude-model-pg');

exports.adicionarPessoa = async (req, res) => {
    try {
        const {
            unidade_id,
            nome_pessoa,
            cpf_pessoa,
            data_nascimento,
            telefone_pessoa,
            grupo_prioritario,
            endereco_pessoa,
            email_pessoa
        } = req.body;

        const novaPessoa = await pessoaModel.create({
            unidade_id,
            nome_pessoa,
            cpf_pessoa,
            data_nascimento,
            telefone_pessoa,
            grupo_prioritario,
            endereco_pessoa,
            email_pessoa
        });

        res.json({
            status: "ok",
            message: "Pessoa inserida com sucesso."
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
        const pessoas = await pessoaModel.findAll();
        res.json({
            status: "ok",
            pessoas: pessoas
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.listarPessoaPorId = async (req, res) => {
    let id_pessoa = req.params.id;
    try {
        const pessoa = await pessoaModel.findByPk(id_pessoa);
        if (pessoa) {
            res.json({
                status: "ok",
                pessoa: pessoa
            });
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${id_pessoa}`
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

exports.atualizarPessoa = async (req, res) => {
    try {
        let id_pessoa = req.params.id;
        
        const {
            unidade_id,
            nome_pessoa,
            cpf_pessoa,
            data_nascimento,
            telefone_pessoa,
            grupo_prioritario,
            endereco_pessoa,
            email_pessoa
        } = req.body;

        const pessoa = await pessoaModel.findByPk(id_pessoa);

        if (pessoa) {
            pessoa.update({
                unidade_id,
                nome_pessoa,
                cpf_pessoa,
                data_nascimento,
                telefone_pessoa,
                grupo_prioritario,
                endereco_pessoa,
                email_pessoa
            },{where: {pessoa_id: id_pessoa}});

            res.json({
                status: "ok",
                message: `Pessoa de ID ${id_pessoa} atualizada`
            });
        } else {
            res.json({
                status: "erro",
                message: "Pessoa não atualizada."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

exports.removerPessoa = async (req, res) => {
    let id_pessoa = req.params.id;
    try {
        const pessoa = await pessoaModel.destroy({
            where: {pessoa_id: id_pessoa}}).then(count => {
                if (!count) {
                    res.json({
                        status: "error",
                        message: `Não foi possível remover a pessoa de ID ${id_pessoa}`
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: "Pessoa removida com sucesso."
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