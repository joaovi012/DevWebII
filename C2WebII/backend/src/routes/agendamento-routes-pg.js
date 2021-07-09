let router = require('express').Router();
const agendamentoController = require('../controllers/agendamento-controller-pg');


router.post('/', agendamentoController.adicionarAgendamento);


router.get('/', agendamentoController.listarTodos);
router.get('/:id', agendamentoController.listarAgendamentoPorId);


router.put('/:id', agendamentoController.atualizarAgendamento);


router.delete('/:id', agendamentoController.removerAgendamento);


module.exports = router;