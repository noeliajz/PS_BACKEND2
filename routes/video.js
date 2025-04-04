const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const upload = require('../middleware/upload'); // El middleware multer que mencionamos antes

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

// Crear un nuevo video (subida de archivo + datos)
router.post('/', 
    upload.single('video'), // middleware para manejar la subida del archivo
    [
        check('titulo')
            .notEmpty()
            .withMessage('El campo título está vacío'),
        check('url')
            .optional(), // El campo `url` se genera automáticamente con `req.file.path`
        check('descripcion')
            .optional()
    ],
    crearVideo
);

// Editar un video existente
router.put('/:id', editarVideo);

// Eliminar un video
router.delete('/:id', eliminarVideo);

module.exports = router;
