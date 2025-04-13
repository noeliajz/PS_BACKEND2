const { Router } = require('express');
const { check } = require('express-validator');
const {
  guardarRespuestas,
  crearEntrevista,
  editarEntrevista,
  eliminarEntrevista,
  obtenerTodosEntrevistas,
  obtenerUnEntrevista
} = require('../controllers/entrevista');

const router = Router();

router.get('/', obtenerTodosEntrevistas);
router.get('/:id', obtenerUnEntrevista);
router.post('/:id/responder', guardarRespuestas);

router.post('/', [
  check('entrevistador').notEmpty().withMessage('El campo entrevistador está vacío'),
  check('entrevistado').notEmpty().withMessage('El campo entrevistado está vacío'),
  check('preguntas').isArray().withMessage('El campo preguntas debe ser un array'),
  check('fecha').notEmpty().withMessage('El campo fecha está vacío').isISO8601().withMessage('Debe ser una fecha válida')
], crearEntrevista);

router.put('/:id', editarEntrevista);
router.delete('/:id', eliminarEntrevista);

module.exports = router;
