const mongoose = require("mongoose");

const pessoaSchema = new mongoose.Schema({
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        default: Date.now,
        require: false
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_nascimento: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    endereco_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_criacao_pessoa: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_pessoa: {
        type: mongoose.Schema.Types.Date,
        required: false,
        default: null
    }
    
});


module.exports = mongoose.model('pessoa', pessoaSchema);
