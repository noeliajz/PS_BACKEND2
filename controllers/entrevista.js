const { validationResult } = require('express-validator');
const Entrevista = require("../models/entrevista");

const guardarRespuestas = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuestas } = req.body;

    // Validación adicional opcional
    if (!Array.isArray(respuestas) || respuestas.length === 0) {
      return res.status(400).json({ mensaje: 'Respuestas inválidas o vacías' });
    }

    const entrevista = await Entrevista.findById(id);
    if (!entrevista) {
      return res.status(404).json({ mensaje: 'Entrevista no encontrada' });
    }

    entrevista.respuestas.push({ respuestas });
    await entrevista.save();

    res.status(200).json({ mensaje: 'Respuestas guardadas', entrevista });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al guardar respuestas' });
  }
};

const crearEntrevista = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const nueva = new Entrevista(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: 'Entrevista creada', entrevista: nueva });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al crear entrevista', detalles: error.message });
  }
};

const editarEntrevista = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const entrevista = await Entrevista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entrevista) {
      return res.status(404).json({ mensaje: 'Entrevista no encontrada' });
    }
    res.status(200).json({ mensaje: 'Entrevista actualizada', entrevista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar entrevista' });
  }
};

const eliminarEntrevista = async (req, res) => {
  try {
    const entrevista = await Entrevista.findByIdAndDelete(req.params.id);
    if (!entrevista) {
      return res.status(404).json({ mensaje: 'Entrevista no encontrada' });
    }
    res.status(200).json({ mensaje: 'Entrevista eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar entrevista' });
  }
};

const obtenerTodosEntrevistas = async (req, res) => {
  try {
    const entrevistas = await Entrevista.find();
    // Corregido: ahora devuelve "Entrevistas" con mayúscula como espera el frontend
    res.status(200).json({ mensaje: 'Entrevistas encontradas', Entrevistas: entrevistas });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener entrevistas' });
  }
};

const obtenerUnEntrevista = async (req, res) => {
  try {
    const entrevista = await Entrevista.findById(req.params.id);
    if (!entrevista) {
      return res.status(404).json({ mensaje: 'Entrevista no encontrada' });
    }
    res.status(200).json({ mensaje: 'Entrevista encontrada', entrevista });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener entrevista' });
  }
};

module.exports = {
  guardarRespuestas,
  crearEntrevista,
  editarEntrevista,
  eliminarEntrevista,
  obtenerTodosEntrevistas,
  obtenerUnEntrevista
};
