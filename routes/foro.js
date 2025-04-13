const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearcomentario, editarcomentario, eliminarcomentario, obtenerTodoscomentarios, obtenerUncomentario} =require( '../controllers/foro')
const verificarToken = require("../middleware/verificarToken"); // 👈 tu middleware JWT

router.get('/', obtenerTodoscomentarios);
router.get('/:id', obtenerUncomentario);
router.delete('/:id', eliminarcomentario);

router.post('/',[
    check('comentario')
    .notEmpty()
    .withMessage('el campo nombre esta vacio')
    .isLength({min:3 , max: 250 })
    .withMessage(' el campo nombre debe tener entre 3 y 250 caracteres máximo')
], verificarToken, crearcomentario),
router.put('/:id', editarcomentario)
    
    

module.exports= router