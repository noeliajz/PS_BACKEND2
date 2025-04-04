const Foro = require("../models/foro");


  const crearcomentario = async (req, res) => {
    try {
        const nuevocomentario = new Foro(req.body);
        
        
        await nuevocomentario.save();

        res.status(201).json({
            mensaje: 'Se creó el comentario con éxito',
            comentario: nuevocomentario
        });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(400).json({
            mensaje: 'Error al crear comentario',
            detalles: error.errors || error.message
        });
    }
}; 

/* const crearcomentario = async (req, res) => {
    try {
        const { comentario } = req.body;
        
        // Buscar si el comentario ya existe
        let comentarioExistente = await comentario.findOne({ comentario });
        
        

        // Si el comentario no existe, crearlo
        const nuevocomentario = new comentario(req.body);
        await nuevocomentario.save();

        res.status(201).json({
            mensaje: 'Se creó el comentario con éxito',
            comentario: nuevocomentario
        });
    } catch (error) {
        console.error('Error al crear o actualizar comentario:', error);
        res.status(400).json({
            mensaje: 'Error al crear o actualizar comentario',
            detalles: error.errors || error.message
        });
    }
}; */



const obtenerTodoscomentarios = async (req, res) => {
    try {
        const comentarios = await Foro.find();
        res.status(200).json({
            mensaje: 'Se encontraron los comentarios',
            comentarios
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar comentarios'
        });
    }
};

const editarcomentario = async (req, res) => {
    try {
        const comentario = await Foro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comentario) {
            return res.status(404).json({ mensaje: 'comentario no encontrado' });
        }
        res.status(200).json({
            mensaje: 'comentario actualizado',
            comentario
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al actualizar el comentario'
        });
    }
};

const obtenerUncomentario = async (req, res) => {
    try {
        const comentario = await Foro.findById(req.params.id);
        if (!comentario) {
            return res.status(404).json({ mensaje: 'comentario no encontrado' });
        }
        res.status(200).json({
            mensaje: 'comentario encontrado',
            comentario
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar el comentario'
        });
    }
};

const eliminarcomentario = async (req, res) => {
    try {
        const comentario = await Foro.findByIdAndDelete(req.params.id);
        if (!comentario) {
            return res.status(404).json({ mensaje: 'comentario no encontrado' });
        }
        res.status(200).json({
            mensaje: 'comentario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al eliminar el comentario'
        });
    }
};

module.exports = {
    eliminarcomentario, crearcomentario, editarcomentario, obtenerTodoscomentarios, obtenerUncomentario
};
