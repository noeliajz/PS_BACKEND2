const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
  crearIndicador,
  editarIndicador,
  eliminarIndicador,
  obtenerTodosIndicadores,
  obtenerUnIndicador
} = require('../controllers/indicador');

// Obtener todos los indicadores
router.get('/', obtenerTodosIndicadores);

// Obtener un indicador por ID
router.get('/:id', obtenerUnIndicador);

// Crear un nuevo indicador
router.post('/', [
  check('nombre')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio'),
  check('formula')
    .notEmpty()
    .withMessage('El campo fórmula es obligatorio')
], crearIndicador);

// Editar un indicador por ID
router.put('/:id', editarIndicador);

// Eliminar un indicador por ID
router.delete('/:id', eliminarIndicador);

module.exports = router;
