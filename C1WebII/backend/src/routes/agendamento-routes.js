let router = require('express').Router();

const apiController = require('../controllers/agendamento-controller');

router.post('/', apiController.adicionarAgendamento);

router.get('/', apiController.listarTodos);

router.get('/:id', apiController.listarAgendamentoPorId);

router.put('/:id', apiController.atualizarAgendamento);

router.delete('/:id', apiController.removerAgendamento);

module.exports = router;