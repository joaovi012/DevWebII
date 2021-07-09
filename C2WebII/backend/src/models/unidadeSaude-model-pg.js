const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

const unidadeSaudeModel = sequelize.define('unidade', {
    unidade_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco_unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone_unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email_unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latlong_unidade: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

unidadeSaudeModel.sync();

module.exports = unidadeSaudeModel;