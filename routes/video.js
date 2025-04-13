const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const upload = require('../middleware/upload'); // multer configurado

const {
    crearVideo,
    editarVideo,
    eliminarVideo,
    obtenerTodosVideos,
    obtenerUnVideo
} = require('../controllers/video');

// Obtener todos los videos
router.get('/', obtenerTodosVideos);

// Obtener un video por ID
router.get('/:id', obtenerUnVideo);

// Crear un nuevo video (con archivo)
router.post('/',
    upload.single('video'),
    [
        check('titulo')
            .notEmpty()
            .withMessage('El campo título está vacío'),
        check('url').optional(),
        check('descripcion').optional()
    ],
    crearVideo
);

// Editar un video (también puede tener archivo)
router.put('/:id',
    upload.single('video'), // ← aquí aplicamos multer
    editarVideo
);

// Eliminar un video
router.delete('/:id', eliminarVideo);

module.exports = router;
