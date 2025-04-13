const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {
  crearEvaluacion,
  obtenerTodasEvaluaciones,
  calcularNotaFinal,
  eliminarEvaluacion,
  editarEvaluacion,
  obtenerEvaluacionPorId
} = require('../controllers/evaluacion');

router.get('/', obtenerTodasEvaluaciones);
router.get('/:id', obtenerEvaluacionPorId);

router.post('/', [
  check('titulo').notEmpty().withMessage('El campo título está vacío'),
  check('notaMaxima').isNumeric().withMessage('La nota máxima debe ser un número'),
  check('preguntas').isArray({ min: 1 }).withMessage('Debe haber al menos una pregunta'),
  check('preguntas.*.enunciado').notEmpty().withMessage('Cada pregunta debe tener un enunciado'),
  check('preguntas.*.opciones')
    .custom((opciones) => Array.isArray(opciones) && opciones.filter(opt => opt && opt.trim()).length >= 2)
    .withMessage('Cada pregunta debe tener al menos dos opciones no vacías'),
  check('preguntas.*.respuestaCorrecta').notEmpty().withMessage('Cada pregunta debe tener una respuesta correcta')
], crearEvaluacion);

router.post("/calcular", calcularNotaFinal);
router.delete('/:id', eliminarEvaluacion);
router.put('/:id', editarEvaluacion);


module.exports = router;
