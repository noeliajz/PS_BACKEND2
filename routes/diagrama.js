const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearDiagrama, editarDiagrama, eliminarDiagrama,
     obtenerTodosDiagramas, obtenerUnDiagrama}
      =require( '../controllers/Diagrama')

router.get('/',  obtenerTodosDiagramas);
router.get('/:id', obtenerUnDiagrama);

router.post('/',[
    check('imagen')
    .notEmpty()
    .withMessage('el campo imagen esta vacio')
], crearDiagrama),
router.put('/:id', editarDiagrama)
router.delete('/:id', eliminarDiagrama);

    

module.exports= router