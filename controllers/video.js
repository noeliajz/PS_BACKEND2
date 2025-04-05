const Video = require('../models/video');

// Crear un nuevo video
const crearVideo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        // Verificar que se haya subido un archivo
        if (!req.file) {
            return res.status(400).json({ mensaje: 'No se subió ningún archivo de video' });
        }

        const nuevoVideo = new Video({
            titulo,
            descripcion,
            /* url: req.file.path, */ // Ruta del archivo subido
            url: `uploads/${req.file.filename}` // NO req.file.path

        });

        await nuevoVideo.save();

        res.status(201).json({
            mensaje: 'Video creado con éxito',
            video: nuevoVideo
        });
    } catch (error) {
        console.error('Error al crear video:', error);
        res.status(400).json({
            mensaje: 'Error al crear video',
            detalles: error.message
        });
    }
};

// Obtener todos los videos
const obtenerTodosVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json({
            mensaje: 'Videos encontrados',
            videos
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: 'Error al obtener los videos'
        });
    }
};

// Obtener un video por ID
const obtenerUnVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ mensaje: 'Video no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Video encontrado',
            video
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: 'Error al obtener el video'
        });
    }
};

// Editar un video
const editarVideo = async (req, res) => {
    try {
        const videoActualizado = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!videoActualizado) {
            return res.status(404).json({ mensaje: 'Video no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Video actualizado',
            video: videoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: 'Error al actualizar el video'
        });
    }
};

// Eliminar un video
const eliminarVideo = async (req, res) => {
    try {
        const videoEliminado = await Video.findByIdAndDelete(req.params.id);
        if (!videoEliminado) {
            return res.status(404).json({ mensaje: 'Video no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Video eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: 'Error al eliminar el video'
        });
    }
};

module.exports = {
    crearVideo,
    obtenerTodosVideos,
    obtenerUnVideo,
    editarVideo,
    eliminarVideo
};
