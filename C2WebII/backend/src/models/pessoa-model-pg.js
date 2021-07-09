const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

const pessoaModel = sequelize.define('pessoa', {
    pessoa_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    unidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone_pessoa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    grupo_prioritario: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    endereco_pessoa: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email_pessoa: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

pessoaModel.sync();

module.exports = pessoaModel;