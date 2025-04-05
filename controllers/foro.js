const Foro = require("../models/foro");


/*   const crearcomentario = async (req, res) => {
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
 */
const crearcomentario = async (req, res) => {
    try {
      const { comentario } = req.body;
  
      if (!req.user || !req.user._id) {
        return res.status(401).json({ mensaje: "Usuario no autenticado" });
      }
  
      const nuevocomentario = new Foro({
        comentario,
        usuario: req.user._id, // 👈 este es clave
      });
  
      await nuevocomentario.save();
  
      const comentarioConUsuario = await Foro.findById(nuevocomentario._id).populate("usuario", "usuario");
  
      res.status(201).json({
        mensaje: "Se creó el comentario con éxito",
        comentario: comentarioConUsuario,
      });
    } catch (error) {
      console.error("Error al crear comentario:", error);
      res.status(400).json({
        mensaje: "Error al crear comentario",
        detalles: error.errors || error.message,
      });
    }
  };
  


/* const obtenerTodoscomentarios = async (req, res) => {
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
}; */
const obtenerTodoscomentarios = async (req, res) => {
    try {
      const comentarios = await Foro.find().populate("usuario", "usuario"); // 👈 esto es lo importante
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
