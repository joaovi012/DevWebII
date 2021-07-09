let router = require('express').Router();

const apiController = require('../controllers/unidadeSaude-controller');

router.post('/', apiController.adicionarUnidade);

router.get('/', apiController.listarTodas);

router.get('/:id', apiController.listarUnidadePorID);

router.put('/:id', apiController.atualizarUnidade);

router.delete('/:id', apiController.removerUnidade);

module.exports = router;