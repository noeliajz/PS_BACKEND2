const Evaluacion = require("../models/evaluacion");

const crearEvaluacion = async (req, res) => {
    try {
        const nuevaEvaluacion = new Evaluacion(req.body);
        await nuevaEvaluacion.save();

        res.status(201).json({
            mensaje: "Se creó la Evaluación con éxito",
            evaluacion: nuevaEvaluacion
        });
    } catch (error) {
        console.error("Error al crear Evaluación:", error);
        res.status(400).json({
            mensaje: "Error al crear Evaluación",
            detalles: error.errors || error.message
        });
    }
};

const obtenerTodasEvaluaciones = async (req, res) => {
    try {
        const evaluaciones = await Evaluacion.find();
        res.status(200).json({
            mensaje: "Se encontraron las Evaluaciones",
            evaluaciones
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: "Error al encontrar Evaluaciones"
        });
    }
};

const obtenerUnaEvaluacion = async (req, res) => {
    try {
        const evaluacion = await Evaluacion.findById(req.params.id);
        if (!evaluacion) {
            return res.status(404).json({ mensaje: "Evaluación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Evaluación encontrada",
            evaluacion
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: "Error al encontrar la Evaluación"
        });
    }
};

const editarEvaluacion = async (req, res) => {
    try {
        const evaluacion = await Evaluacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evaluacion) {
            return res.status(404).json({ mensaje: "Evaluación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Evaluación actualizada",
            evaluacion
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: "Error al actualizar la Evaluación"
        });
    }
};

const eliminarEvaluacion = async (req, res) => {
    try {
        const evaluacion = await Evaluacion.findByIdAndDelete(req.params.id);
        if (!evaluacion) {
            return res.status(404).json({ mensaje: "Evaluación no encontrada" });
        }
        res.status(200).json({
            mensaje: "Evaluación eliminada"
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            mensaje: "Error al eliminar la Evaluación"
        });
    }
};

const calcularNotaFinal = async (req, res) => {
    try {
        const { evaluacionId, respuestasUsuario } = req.body;

        // Buscar la evaluación por ID
        const evaluacion = await Evaluacion.findById(evaluacionId);
        if (!evaluacion) {
            return res.status(404).json({ mensaje: "Evaluación no encontrada" });
        }

        // Inicializar la nota
        let notaFinal = 0;
        const puntosPorPregunta = 2; // Cada respuesta correcta vale 2 puntos

        // Comparar respuestas del usuario con las correctas
        evaluacion.preguntas.forEach((pregunta, index) => {
            if (respuestasUsuario[index] === pregunta.respuestaCorrecta) {
                notaFinal += puntosPorPregunta;
            }
        });

        // Enviar la nota final
        res.status(200).json({
            mensaje: "Nota calculada correctamente",
            notaFinal,
            notaMaxima: evaluacion.notaMaxima
        });

    } catch (error) {
        console.error("Error al calcular la nota:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};



module.exports = {
    crearEvaluacion,
    obtenerTodasEvaluaciones,
    obtenerUnaEvaluacion,
    editarEvaluacion,
    eliminarEvaluacion,
    calcularNotaFinal
};
