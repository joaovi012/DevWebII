const mongodb = require('../infra/mongodb');

const unidadeSaudeModel = require("../models/unidadeSaude-model");
const pessoaModel = require("../models/pessoa-model");
const agendamentoModel = require("../models/agendamento-model");



exports.listarTodas = (req, res) => {
    pessoaModel.find((erro, pessoas) => {
        if (erro) {
            console.log("Não foi possível listar as pessoas");
            res.json({
                status: "erro",
                message: "Não foi possível listar as pessoas"
            });
        } else {
            console.log("Pessoas listadas com sucesso");
            res.json({
                status: "ok",
                pessoas: pessoas
            });
        }
    });
}

exports.listarPessoaPorID = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.findById(id_pessoa, (erro, pessoa) => {
        if (erro || !pessoa) {
            console.log(`Não foi possível encontrar a pessoa de ID ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${id_pessoa}`
            });
        } else {
            console.log("Pessoa listada");
            res.json({
                status: "ok",
                pessoa: pessoa
            });
        }
    });
}

exports.adicionarPessoa = (req, res) => {
    let pessoa_cpf = req.body.cpf_pessoa;
    const query = { cpf_pessoa: pessoa_cpf };


    pessoaModel.findOne(query, (err, pessoa) => {
        if (pessoa) {
            console.log(`Já existe um cadastro com o CPF ${pessoa_cpf}`);
            res.json({
                status: "erro",
                message: `Já existe um cadastro com o CPF ${pessoa_cpf}`
            });
            return;
        } else {
            unidadeSaudeModel.findById(req.body.unidade_id, (err, unidade) => {
                if (err || !unidade) {
                    console.log("Unidade não encontrada");
                    res.json({
                        status: "erro",
                        message: `Não foi possível encontrar a unidade de saúde de ID ${req.body.unidade_id}`
                    });
                } else {
                    let novaPessoa = new pessoaModel();
                    novaPessoa.unidade_id = req.body.unidade_id;
                    novaPessoa.nome_pessoa = req.body.nome_pessoa;
                    novaPessoa.cpf_pessoa = req.body.cpf_pessoa;
                    novaPessoa.data_nascimento = req.body.data_nascimento;
                    novaPessoa.telefone_pessoa = req.body.telefone_pessoa;
                    novaPessoa.grupo_prioritario = req.body.grupo_prioritario;
                    novaPessoa.endereco_pessoa = req.body.endereco_pessoa;
                    novaPessoa.email_pessoa = req.body.email_pessoa;
                    novaPessoa.save((err) => {
                        if (err) {
                            console.log("Não foi possível inserir a pessoa");
                            res.json({
                                status: "erro",
                                message: "Não foi possível inserir a pessoa",
                                erro: err
                            });
                        } else {
                            console.log("Pessoa inserida com sucesso");
                            res.json({
                                status: "ok",
                                message: "Pessoa inserida com sucesso"
                            });
                        }
                    });
                }
            });
        }
    });
}



exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;
    pessoaModel.findById(id_pessoa, (erro, pessoa) => {
        if(erro || !pessoa){
            console.log("Pessoa não encontrada");
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${id_pessoa}`
            });
        }else{
            unidadeSaudeModel.findById(req.body.unidade_id, (erro, unidade) => {
                if(erro || !unidade){
                    console.log("Unidade não encontrada");
                    res.json({
                        status: "erro",
                        message: `Não foi possível encontrar a unidade de saúde de ID ${req.body.unidade_id}`
                    });
                }else{
                    pessoa.nome_pessoa = req.body.nome_pessoa;
                    pessoa.cpf_pessoa = req.body.cpf_pessoa;
                    pessoa.data_nascimento = req.body.data_nascimento;
                    pessoa.grupo_prioritario = req.body.grupo_prioritario;
                    pessoa.endereco_pessoa = req.body.endereco_pessoa;
                    pessoa.telefone_pessoa = req.body.telefone_pessoa;
                    pessoa.email_pessoa = req.body.email_pessoa;
                    pessoa.data_alteracao_pessoa = Date.now();
                    pessoa.save((err) => {
                        if(err){
                            console.log("Não foi possível atualizar a pessoa");
                            res.json({
                                status: "erro",
                                message: `Não foi possível atualizar a pessoa ${pessoa.nome_pessoa}`,
                                erro: err
                            });
                        }else{
                            console.log("Pessoa atualizada com sucesso");
                            res.json({
                                status: "ok",
                                message: `Pessoa ${pessoa.nome_pessoa} atualizada com sucesso`,
                            });
                        }
                    })

                }
            });  
        }
    })
}

exports.removerPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.findById(id_pessoa, (err, pessoa) => {
        if (err || !pessoa) {
            console.log(`Não foi possível encontrar a pessoa de ID ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${id_pessoa}`
            });
            return;
        } else {
            agendamentoModel.findOne({pessoa_id: id_pessoa}, (err, agendamento) => {
                if (err || agendamento) {
                    console.log("Não é possível remover pessoas com agendamentos cadastrados");
                    res.json({
                        status: "erro",
                        message: "Não é possível remover pessoas com agendamentos cadastrados"
                    });
                } else {
                    pessoaModel.deleteOne({
                        _id: id_pessoa
                    }, (err) => {
                        if (err) {
                            console.log("Erro ao remover a pessoa");
                            res.json({
                                status: "erro",
                                message: "Erro ao remover a pessoa",
                                erro: err
                            });
                        } else {
                            console.log("Pessoa removida com sucesso");
                            res.json({
                                status: "ok",
                                message: "Pessoa removida com sucesso"
                            });
                        }
                    });
                }
            });            
        }
    });
}