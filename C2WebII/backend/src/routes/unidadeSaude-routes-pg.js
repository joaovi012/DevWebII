let router = require('express').Router();

const unidadeSaudeController = require('../controllers/unidadeSaude-controller-pg');


router.post('/', unidadeSaudeController.adicionarUnidade);

router.get('/', unidadeSaudeController.listarTodas);
router.get('/:id', unidadeSaudeController.listarUnidadePorId);

router.put('/:id', unidadeSaudeController.atualizarUnidade);

router.delete('/:id', unidadeSaudeController.removerUnidade);

module.exports = router;