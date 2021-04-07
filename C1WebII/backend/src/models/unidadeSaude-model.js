const mongoose = require("mongoose");

const unidadeSaudeSchema = new mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_criacao_unidade: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_unidade: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }

});


let unidadeSaude = module.exports = mongoose.model('unidadeSaude', unidadeSaudeSchema);
