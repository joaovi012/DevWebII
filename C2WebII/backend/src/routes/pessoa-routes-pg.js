let router = require('express').Router();

const pessoaController = require('../controllers/pessoa-controller-pg');


router.post('/', pessoaController.adicionarPessoa);

router.get('/', pessoaController.listarTodas);
router.get('/:id', pessoaController.listarPessoaPorId);

router.put('/:id', pessoaController.atualizarPessoa);

router.delete('/:id', pessoaController.removerPessoa);

module.exports = router;