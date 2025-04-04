const Simulacion = require("../models/simulacion");

// Crear una nueva simulación
const crearSimulacion = async (req, res) => {
    try {
        const nuevaSimulacion = new Simulacion(req.body);
        await nuevaSimulacion.save();

        res.status(201).json({
            mensaje: "Se creó la Simulación con éxito",
            simulacion: nuevaSimulacion
        });
    } catch (error) {
        console.error("Error al crear Simulación:", error);
        res.status(400).json({
            mensaje: "Error al crear Simulación",
            detalles: error.errors || error.message
        });
    }
};

// Obtener todas las simulaciones
const obtenerTodasSimulaciones = async (req, res) => {
    try {
        const simulaciones = await Simulacion.find();
        res.status(200).json({
            mensaje: "Se encontraron las Simulaciones",
            simulaciones
        });
    } catch (error) {
        console.error("Error al obtener Simulaciones:", error);
        res.status(404).json({
            mensaje: "Error al encontrar Simulaciones"
        });
    }
};

// Obtener una simulación por ID
const obtenerUnaSimulacion = async (req, res) => {
    try {
        const simulacion = await Simulacion.findById(req.params.id);
        if (!simulacion) {
            return res.status(404).json({ mensaje: "Simulación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Simulación encontrada",
            simulacion
        });
    } catch (error) {
        console.error("Error al obtener la Simulación:", error);
        res.status(404).json({
            mensaje: "Error al encontrar la Simulación"
        });
    }
};

// Editar una simulación por ID
const editarSimulacion = async (req, res) => {
    try {
        const simulacion = await Simulacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!simulacion) {
            return res.status(404).json({ mensaje: "Simulación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Simulación actualizada",
            simulacion
        });
    } catch (error) {
        console.error("Error al actualizar la Simulación:", error);
        res.status(400).json({
            mensaje: "Error al actualizar la Simulación"
        });
    }
};

// Eliminar una simulación por ID
const eliminarSimulacion = async (req, res) => {
    try {
        const simulacion = await Simulacion.findByIdAndDelete(req.params.id);
        if (!simulacion) {
            return res.status(404).json({ mensaje: "Simulación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Simulación eliminada"
        });
    } catch (error) {
        console.error("Error al eliminar la Simulación:", error);
        res.status(400).json({
            mensaje: "Error al eliminar la Simulación"
        });
    }
};

module.exports = {
    crearSimulacion,
    obtenerTodasSimulaciones,
    obtenerUnaSimulacion,
    editarSimulacion,
    eliminarSimulacion
};
