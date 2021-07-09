let router = require('express').Router();

const apiController = require('../controllers/pessoa-controller');

router.post('/', apiController.adicionarPessoa);

router.get('/', apiController.listarTodas);

router.get('/:id', apiController.listarPessoaPorID);

router.put('/:id', apiController.atualizarPessoa);

router.delete('/:id', apiController.removerPessoa);

module.exports = router;