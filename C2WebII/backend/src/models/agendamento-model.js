const mongoose = require("mongoose");

const agendamentoSchema = new mongoose.Schema({
    pessoa_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        require: true
    },
    necessidade_especiais: {
        type: mongoose.Schema.Types.Boolean,
        require: true
    },
    observacao_agendamento: {
        type: mongoose.Schema.Types.String,
        require: false,
        default:null
    },
    data_criacao_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_agendamento: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }
   });


let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);