const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearSimulacion, editarSimulacion, eliminarSimulacion,
     obtenerTodasSimulaciones, obtenerUnaSimulacion}
      =require( '../controllers/simulacion')

router.get('/',  obtenerTodasSimulaciones);
router.get('/:id', obtenerUnaSimulacion);

router.post('/',[
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha '),
    check('precondicion')
    .notEmpty()
    .withMessage('el campo precondicion esta vacio'),
    check('capacitador')
    .notEmpty()
    .withMessage('el campo capacitador esta vacio'),
    check('personalQueAsiste')
    .notEmpty()
    .withMessage('el personal que asiste esta vacio')
], crearSimulacion),
router.put('/:id', editarSimulacion)
router.delete('/:id', eliminarSimulacion);

    

module.exports= router