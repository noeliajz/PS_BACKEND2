const Diagrama = require("../models/diagrama");


  const crearDiagrama = async (req, res) => {
    try {
        const nuevoDiagrama = new Diagrama(req.body);
        
        
        await nuevoDiagrama.save();

        res.status(201).json({
            mensaje: 'Se creó el Diagrama con éxito',
            Diagrama: nuevoDiagrama
        });
    } catch (error) {
        console.error('Error al crear Diagrama:', error);
        res.status(400).json({
            mensaje: 'Error al crear Diagrama',
            detalles: error.errors || error.message
        });
    }
}; 




const obtenerTodosDiagramas = async (req, res) => {
    try {
        const diagramas = await Diagrama.find();
        res.status(200).json({
            mensaje: 'Se encontraron los Diagramas',
            diagramas
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar Diagramas'
        });
    }
};

const editarDiagrama = async (req, res) => {
    try {
        const diagrama = await Diagrama.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!diagrama) {
            return res.status(404).json({ mensaje: 'Diagrama no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Diagrama actualizado',
            diagrama
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al actualizar el Diagrama'
        });
    }
};

const obtenerUnDiagrama = async (req, res) => {
    try {
        const diagrama = await Diagrama.findById(req.params.id);
        if (!diagrama) {
            return res.status(404).json({ mensaje: 'Diagrama no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Diagrama encontrado',
            diagrama
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar el Diagrama'
        });
    }
};

const eliminarDiagrama = async (req, res) => {
    try {
        const diagrama = await Diagrama.findByIdAndDelete(req.params.id);
        if (!diagrama) {
            return res.status(404).json({ mensaje: 'Diagrama no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Diagrama eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al eliminar el Diagrama'
        });
    }
};

module.exports = {
    eliminarDiagrama, crearDiagrama, editarDiagrama, obtenerTodosDiagramas, obtenerUnDiagrama
};
