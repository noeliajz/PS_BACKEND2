const Evaluacion = require("../models/evaluacion");
const { validationResult } = require("express-validator");

const crearEvaluacion = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ mensaje: "Error en la validación", errores: errores.array() });
  }

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
      detalles: error.message
    });
  }
};

const obtenerTodasEvaluaciones = async (_, res) => {
  try {
    const evaluaciones = await Evaluacion.find();
    res.status(200).json({ mensaje: "Se encontraron las Evaluaciones", evaluaciones });
  } catch (error) {
    console.error(error);
    res.status(404).json({ mensaje: "Error al encontrar Evaluaciones" });
  }
};

const calcularNotaFinal = async (req, res) => {
  try {
    const { evaluacionId, respuestasUsuario, usuario } = req.body;
    const evaluacion = await Evaluacion.findById(evaluacionId);
    if (!evaluacion) return res.status(404).json({ mensaje: "Evaluación no encontrada" });

    let notaFinal = 0;
    const puntosPorPregunta = 2;

    evaluacion.preguntas.forEach((pregunta, index) => {
      if (respuestasUsuario[index] === pregunta.respuestaCorrecta) {
        notaFinal += puntosPorPregunta;
      }
    });

    evaluacion.notas.push({
      usuario,
      nota: notaFinal,
      fecha: new Date()
    });

    await evaluacion.save();

    res.status(200).json({
      mensaje: "Nota calculada y guardada correctamente",
      notaFinal,
      notaMaxima: evaluacion.notaMaxima
    });
  } catch (error) {
    console.error("Error al calcular la nota:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
const eliminarEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await Evaluacion.findByIdAndDelete(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: "Evaluación no encontrada" });
    }

    res.status(200).json({ mensaje: "Evaluación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar Evaluación:", error);
    res.status(500).json({ mensaje: "Error al eliminar Evaluación" });
  }
};


const editarEvaluacion = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación no encontrada' });
    }

    res.status(200).json({
      mensaje: 'Evaluación actualizada correctamente',
      evaluacion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al actualizar la evaluación'
    });
  }
};

const obtenerEvaluacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await Evaluacion.findById(id);

    if (!evaluacion) {
      return res.status(404).json({ mensaje: "Evaluación no encontrada" });
    }

    res.status(200).json({ mensaje: "Evaluación encontrada", evaluacion });
  } catch (error) {
    console.error("Error al obtener Evaluación por ID:", error);
    res.status(500).json({ mensaje: "Error al obtener Evaluación" });
  }
};


module.exports = {
  obtenerEvaluacionPorId,
  crearEvaluacion,
  obtenerTodasEvaluaciones,
  calcularNotaFinal, 
  eliminarEvaluacion,
  editarEvaluacion
};
