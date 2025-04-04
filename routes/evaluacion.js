const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { 
    crearEvaluacion, 
    editarEvaluacion, 
    eliminarEvaluacion, 
    obtenerTodasEvaluaciones, 
    obtenerUnaEvaluacion,
    calcularNotaFinal
} = require('../controllers/evaluacion');

router.get('/', obtenerTodasEvaluaciones);
router.get('/:id', obtenerUnaEvaluacion);

router.post('/', [
    check('titulo')
        .notEmpty()
        .withMessage('El campo título está vacío'),
    check('preguntas')
        .isArray({ min: 1 })
        .withMessage('Debe haber al menos una pregunta'),
    check('preguntas.*.enunciado')
        .notEmpty()
        .withMessage('Cada pregunta debe tener un enunciado'),
    check('preguntas.*.opciones')
        .isArray({ min: 2 })
        .withMessage('Cada pregunta debe tener al menos dos opciones'),
    check('preguntas.*.respuestaCorrecta')
        .notEmpty()
        .withMessage('Cada pregunta debe tener una respuesta correcta'),
    check('notaMaxima')
        .isNumeric()
        .withMessage('La nota máxima debe ser un número')
], crearEvaluacion);

router.put('/:id', editarEvaluacion);
router.delete('/:id', eliminarEvaluacion);
router.post("/calcular-nota", calcularNotaFinal);

module.exports = router;
