const unidadeSaudeModel = require('../models/unidadeSaude-model');
const pessoaModel = require('../models/pessoa-model');
const agendamentoModel = require('../models/agendamento-model');

exports.listarTodas = (req, res) => {
    unidadeSaudeModel.find((err, unidades) => {
        if (err) {
            console.log("Não foi possível listar as unidades");
            res.json({
                status: "erro",
                message: "Não foi possível listar as unidades"
            });
        } else {
            console.log("Unidades listadas com sucesso");
            res.json({
                status: "ok",
                unidades: unidades
            });
        }
    });
}

exports.listarUnidadePorID = (req, res) => {
    let id_unidade = req.params.id;

    unidadeSaudeModel.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log(`Não foi possível encontrar a unidade de ID ${id_unidade}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a unidade de ID ${id_unidade}`
            });
        } else {
            console.log("Unidade listada");
            res.json({
                status: "ok",
                unidade: unidade
            });
        }
    });
}

exports.adicionarUnidade = (req, res) => {
    let nomeUnidade = req.body.nome_unidade;
    const query = { nome_unidade: nomeUnidade };

    unidadeSaudeModel.findOne(query, (err, unidade) => {
        if (unidade) {
            console.log(`Já existe uma unidade com o nome ${nomeUnidade}`);
            res.json({
                status: "erro",
                message: `Já existe uma unidade com o nome ${nomeUnidade}`
            })
            return;
        } else {
            let novaUnidadeSaude = new unidadeSaudeModel();
            novaUnidadeSaude.nome_unidade = req.body.nome_unidade;
            novaUnidadeSaude.descricao_unidade = req.body.descricao_unidade;
            novaUnidadeSaude.endereco_unidade = req.body.endereco_unidade;
            novaUnidadeSaude.telefone_unidade = req.body.telefone_unidade;
            novaUnidadeSaude.email_unidade = req.body.email_unidade;
            novaUnidadeSaude.latlong_unidade = req.body.latlong_unidade;
            novaUnidadeSaude.save((err) => {
                if (err) {
                    console.log("Não foi possível inserir a unidade");
                    res.json({
                        status: "erro",
                        message: "Não foi possível inserir a unidade",
                        erro: err
                    });
                } else {
                    console.log("Unidade inserida com sucesso");
                    res.json({
                        status: "ok",
                        message: "Unidade inserida com sucesso"
                    });
                }
            });
        }
    });
}



exports.atualizarUnidade = (req, res) => {
  let id_unidade = req.params.id;

  unidadeSaudeModel.findById(id_unidade, (erro, unidade) => {
      if(erro || !unidade){
          console.log("Unidade não encontrada");
          res.json({
              status: "erro",
              message: `Não foi possível encontrar a unidade de saúde de id ${id_unidade}`
          });
      }else{
        unidade.nome_unidade = req.body.nome_unidade;
        unidade.descricao_unidade = req.body.descricao_unidade;
        unidade.endereco_unidade = req.body.endereco_unidade;
        unidade.telefone_unidade = req.body.telefone_unidade;
        unidade.email_unidade = req.body.email_unidade;
        unidade.latlong_unidade = req.body.latlong_unidade;
        unidade.data_alteracao_unidade = Date.now();
      
        unidade.save((err => {
            if(err){
                console.log("Não foi possível atualizar a unidade de saúde");
                res.json({
                    status: "erro",
                    message: "Não foi possível atualizar a unidade de saúde"
                });
            }else{
                console.log("Não foi possível atualizar a unidade de saúde");
                res.json({
                    status: "ok",
                    message: `Unidade de saúde ${unidade.nome_unidade} atualizada com sucesso`,
                  })
              }
          }))
      }
  });  
}

exports.removerUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadeSaudeModel.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log(`Não foi possível encontrar a unidade de saúde de ID ${id_unidade}`);
            res.json({
                status: "erro",
                message: `Não foi possível encontrar a unidade de saúde de ID ${id_unidade}`
            });
            return;
        } else {
            pessoaModel.findOne({unidade_id: id_unidade}, (err, pessoa) => {
                if (err || pessoa) {
                    console.log("Não é possível remover uma unidade de saúde com pessoas cadastradas");
                    res.json({
                        status: "erro",
                        message: "Não é possível remover uma unidade de saúde com pessoas cadastradas"
                    });
                } else {
                    agendamentoModel.findOne({unidade_id : id_unidade}, (err, agendamento) => {
                        if (err || agendamento) {
                            console.log("Não é possível remover uma unidade de saúde com agendamentos cadastrados");
                            res.json({
                                status: "erro",
                                message: "Não é possível remover uma unidade de saúde com agendamentos cadastrados"
                            });
                        } else {
                            unidadeSaudeModel.deleteOne({
                                _id: id_unidade
                            }, (err) => {
                                if (err) {
                                    console.log("Erro ao remover a unidade de saúde");
                                    res.json({
                                        status: "erro",
                                        message: "Erro ao remover a unidade de saúde",
                                        erro: err
                                    });
                                } else {
                                    console.log("Unidade removida com sucesso");
                                    res.json({
                                        status: "ok",
                                        message: "Unidade removida com sucesso"
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