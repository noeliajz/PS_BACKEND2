const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearEntrevista, editarEntrevista, eliminarEntrevista,
     obtenerTodosEntrevistas, obtenerUnEntrevista}
      =require( '../controllers/entrevista')

router.get('/',  obtenerTodosEntrevistas);
router.get('/:id', obtenerUnEntrevista);

router.post('/',[
    check('entrevistador')
    .notEmpty()
    .withMessage('el campo entrevistador esta vacio'),
    check('entrevistado')
    .notEmpty()
    .withMessage('el campo entrevistado esta vacio'),
    check('preguntas')
    .notEmpty()
    .withMessage('el campo preguntas esta vacio'),
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha ')
], crearEntrevista),
router.put('/:id', editarEntrevista)
router.delete('/:id', eliminarEntrevista);

    

module.exports= router