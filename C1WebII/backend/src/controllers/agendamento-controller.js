const mongoose = require('mongoose');
const agendamentoModel = require('../models/agendamento-model');
const pessoaModel = require('../models/pessoa-model');
const unidadeSaudeModel = require('../models/unidadeSaude-model');

exports.listarTodos = (req, res) => {
    agendamentoModel.find(function(err, agendamentos) {
        if (err) {
            console.log("Não foi possível listar os agendamentos");
            res.json({
                status: "erro",
                message: "Não foi possível listar os agendamentos"
            });
        } else {
            res.json({
                status: "ok",
                agendamentos: agendamentos
            });
        }
    });
}

exports.listarAgendamentoPorId = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, function(err, agendamento) {
        if (err || !agendamento) {
            console.log(`Não foi possível encontrar o agendamento de ID ${id_agendamento}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar o agendamento de ID ${id_agendamento}`
            });
        } else {
            res.json({
                status: "ok",
                agendamento: agendamento
            });
        }
    });
}

exports.adicionarAgendamento = (req, res) => {
    let id_pessoa = req.body.pessoa_id;
    let id_unidade = req.body.unidade_id;

    pessoaModel.findById(id_pessoa, (err, pessoa) => {
        if (err || !pessoa) {
            console.log(`Não foi possível encontrar a pessoa de ID ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a pessoa de ID ${id_pessoa}`
            })
        } else {
             unidadeSaudeModel.findById(id_unidade, (err, unidade) => {
                if (err || !unidade) {
                    console.log(`Não foi possível encontrar a unidade de ID ${id_unidade}`);
                    res.json({
                        status: "erro",
                        message: `Não foi possível encontrar a unidade de ID ${id_unidade}`
                    });
                } else {
                    let novoAgendamento = new agendamentoModel();
                    novoAgendamento.pessoa_id = req.body.pessoa_id;
                    novoAgendamento.unidade_id = req.body.unidade_id;
                    novoAgendamento.data_hora_agendamento = req.body.data_hora_agendamento;
                    novoAgendamento.necessidade_especiais = req.body.necessidade_especiais;
                    novoAgendamento.observacao_agendamento = req.body.observacao_agendamento;
                    novoAgendamento.save((err) => {
                        if (err) {
                            console.log("Não foi possível inserir o agendamento");
                            res.json({
                                status: "erro",
                                message: "Não foi possível inserir o agendamento",
                                erro: err
                            });
                        } else {
                            console.log("Agendamento inserido com sucesso")
                            res.json({
                                status: "ok",
                                message: "Agendamento inserido com sucesso"
                            });
                        }
                    });
                }
            });
        }
    });
      
}

exports.atualizarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            console.log("Agendamento não encontrado");
            res.json({
                status: "erro",
                message: `Não foi possível encontrar o agendamento de id ${id_agendamento}`
            });
        } else {
            pessoaModel.findById(req.body.pessoa_id, function(err, pessoa){
                if (err || !pessoa) {
                    console.log("Pessoa não encontrada");
                    res.json({
                        status: "erro",
                        message: `Não foi possível encontrar a pessoa de id ${req.body.pessoa_id}`
                    });
                } else {
                    unidadeSaudeModel.findById(req.body.unidade_id, function(err, unidade){
                        if (err || !unidade) {
                            console.log("Não existe uma unidade com o ID informado.");
                            res.json({
                                status: "erro",
                                message: `Não foi possível encontrar a unidade de saúde de id ${req.body.unidade_id}`
                            });
                        } else {
                            agendamento.pessoa_id = req.body.pessoa_id;
                            agendamento.unidade_id = req.body.unidade_id;
                            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
                            agendamento.necessidade_especiais = req.body.necessidade_especiais;
                            agendamento.observacao_agendamento = req.body.observacao_agendamento;
                            agendamento.data_alteracao_agendamento = Date.now();

                            agendamento.save((err) => {
                                if (err) {
                                    console.log("Não foi possível atualizar o agendamento");
                                    res.json({
                                        status: "erro",
                                        message: "Não foi possível atualizar o agendamento",
                                        erro: err
                                    });
                                } else {
                                    console.log(`Agendamento de ID ${id_agendamento} atualizado com sucesso`);
                                    res.json({
                                        status: "ok",
                                        message: `Agendamento de ID ${id_agendamento} atualizado com sucesso`
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}


exports.removerAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            console.log(`Não foi possível encontrar o agendamento de ID ${id_agendamento}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar o agendamento de ID ${id_agendamento}`
            });
            return;
        } else {
            agendamentoModel.deleteOne({
                _id: id_agendamento
            }, (err) => {
                if (err) {
                    console.log("Erro ao remover o agendamento");
                    res.json({
                        status: "erro",
                        message: "Erro ao remover o agendamento"
                    });
                } else {
                    console.log("Agendamento removido com sucesso")
                    res.json({
                        status: "ok",
                        message: "Agendamento removido com sucesso"
                    });
                }
            });
        }
    });
}