const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
  crearEncuesta,
  obtenerTodasEncuestas,
  responderEncuesta,
  eliminarEncuesta
} = require('../controllers/encuesta');

// Obtener todas las encuestas
router.get('/', obtenerTodasEncuestas);

// Crear una nueva encuesta
router.post('/', [
  check('encuestador').notEmpty().withMessage('El encuestador es obligatorio'),
  check('encuestado').notEmpty().withMessage('El encuestado es obligatorio'),
  check('preguntas').isArray({ min: 1 }).withMessage('Debe incluir al menos una pregunta'),
  check('preguntas.*').notEmpty().withMessage('Las preguntas no pueden estar vacías')
], crearEncuesta);

// Enviar respuestas a una encuesta
router.post('/:id/responder', [
  check('respuestas')
    .isArray({ min: 1 }).withMessage('Debes responder al menos una pregunta'),
  check('respuestas.*').notEmpty().withMessage('Las respuestas no pueden estar vacías')
], responderEncuesta);

// Eliminar una encuesta
router.delete('/:id', eliminarEncuesta);

module.exports = router;
