const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

const agendamentoModel = sequelize.define('agendamento', {
    agendamento_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    unidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_hora_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    necessidade_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    observacao_agendamento: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

agendamentoModel.sync();

module.exports = agendamentoModel;