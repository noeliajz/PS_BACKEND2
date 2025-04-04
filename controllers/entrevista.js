const Entrevista = require("../models/entrevista");


  const crearEntrevista = async (req, res) => {
    try {
        const nuevoEntrevista = new Entrevista(req.body);
        await nuevoEntrevista.save();

        res.status(201).json({
            mensaje: 'Se creó el Entrevista con éxito',
            Entrevista: nuevoEntrevista
        });
    } catch (error) {
        console.error('Error al crear Entrevista:', error);
        res.status(400).json({
            mensaje: 'Error al crear Entrevista',
            detalles: error.errors || error.message
        });
    }
}; 

/* const crearEntrevista = async (req, res) => {
    try {
        const { Entrevista } = req.body;
        
        // Buscar si el Entrevista ya existe
        let EntrevistaExistente = await Entrevista.findOne({ Entrevista });
        
        

        // Si el Entrevista no existe, crearlo
        const nuevoEntrevista = new Entrevista(req.body);
        await nuevoEntrevista.save();

        res.status(201).json({
            mensaje: 'Se creó el Entrevista con éxito',
            Entrevista: nuevoEntrevista
        });
    } catch (error) {
        console.error('Error al crear o actualizar Entrevista:', error);
        res.status(400).json({
            mensaje: 'Error al crear o actualizar Entrevista',
            detalles: error.errors || error.message
        });
    }
}; */



const obtenerTodosEntrevistas = async (req, res) => {
    try {
        const Entrevistas = await Entrevista.find();
        res.status(200).json({
            mensaje: 'Se encontraron los Entrevistas',
            Entrevistas
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar Entrevistas'
        });
    }
};

const editarEntrevista = async (req, res) => {
    try {
        const entrevista = await Entrevista.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entrevista) {
            return res.status(404).json({ mensaje: 'Entrevista no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Entrevista actualizado',
            entrevista
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al actualizar el Entrevista'
        });
    }
};

const obtenerUnEntrevista = async (req, res) => {
    try {
        const entrevista = await Entrevista.findById(req.params.id);
        if (!entrevista) {
            return res.status(404).json({ mensaje: 'Entrevista no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Entrevista encontrado',
            entrevista
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar el Entrevista'
        });
    }
};

const eliminarEntrevista = async (req, res) => {
    try {
        const entrevista = await Entrevista.findByIdAndDelete(req.params.id);
        if (!entrevista) {
            return res.status(404).json({ mensaje: 'Entrevista no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Entrevista eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al eliminar el Entrevista'
        });
    }
};

module.exports = {
    eliminarEntrevista, crearEntrevista, editarEntrevista, obtenerTodosEntrevistas, obtenerUnEntrevista
};
