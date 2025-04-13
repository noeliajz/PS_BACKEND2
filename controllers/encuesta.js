const Encuesta = require("../models/Encuesta");
const { validationResult } = require("express-validator");

// Crear una nueva encuesta
const crearEncuesta = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ mensaje: "Error en la validación", errores: errores.array() });
  }

  try {
    const nuevaEncuesta = new Encuesta(req.body);
    await nuevaEncuesta.save();

    res.status(201).json({
      mensaje: "Encuesta creada exitosamente",
      encuesta: nuevaEncuesta
    });
  } catch (error) {
    console.error("Error al crear la encuesta:", error);
    res.status(500).json({
      mensaje: "Error al crear la encuesta",
      detalles: error.message
    });
  }
};

// Obtener todas las encuestas
const obtenerTodasEncuestas = async (_, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.status(200).json({
      mensaje: "Lista de encuestas encontradas",
      encuestas
    });
  } catch (error) {
    console.error("Error al obtener encuestas:", error);
    res.status(500).json({ mensaje: "Error al obtener encuestas" });
  }
};

// Guardar respuestas a una encuesta existente
const responderEncuesta = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ mensaje: "Error en la validación", errores: errores.array() });
  }

  const { id } = req.params;
  const { respuestas } = req.body;

  try {
    const encuesta = await Encuesta.findById(id);
    if (!encuesta) {
      return res.status(404).json({ mensaje: "Encuesta no encontrada" });
    }

    encuesta.respuestas.push({ respuestas });
    await encuesta.save();

    res.status(200).json({ mensaje: "Respuestas guardadas correctamente", encuesta });
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    res.status(500).json({ mensaje: "Error al guardar respuestas" });
  }
};


const eliminarEncuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const encuesta = await Encuesta.findByIdAndDelete(id);
    if (!encuesta) {
      return res.status(404).json({ mensaje: "Encuesta no encontrada" });
    }

    res.status(200).json({ mensaje: "Encuesta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la encuesta:", error);
    res.status(500).json({ mensaje: "Error al eliminar encuesta" });
  }
};


const editarEncuesta = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const encuestaActualizada = await Encuesta.findByIdAndUpdate(
      req.params.id,
      {
        encuestador: req.body.encuestador,
        encuestado: req.body.encuestado,
        preguntas: req.body.preguntas,
        fecha: req.body.fecha
      },
      { new: true }
    );

    if (!encuestaActualizada) {
      return res.status(404).json({ mensaje: 'Encuesta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Encuesta actualizada', encuesta: encuestaActualizada });
  } catch (error) {
    console.error('Error al actualizar encuesta:', error);
    res.status(500).json({ mensaje: 'Error al actualizar encuesta' });
  }
};


const obtenerUnaEncuesta = async (req, res) => {
  try {
    // Buscar la encuesta por el ID
    const encuesta = await Encuesta.findById(req.params.id);
    
    // Si la encuesta no se encuentra
    if (!encuesta) {
      return res.status(404).json({ mensaje: 'Encuesta no encontrada' });
    }
    
    // Si la encuesta es encontrada, la retornamos con un mensaje de éxito
    res.status(200).json({ mensaje: 'Encuesta encontrada', encuesta });
  } catch (error) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(500).json({ mensaje: 'Error al obtener encuesta', error: error.message });
  }
};



module.exports = {
  editarEncuesta,
  crearEncuesta,
  obtenerTodasEncuestas,
  obtenerUnaEncuesta,
  responderEncuesta,
  eliminarEncuesta
};
