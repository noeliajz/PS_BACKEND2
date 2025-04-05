const Indicador = require("../models/indicador");

// Crear un nuevo indicador
const crearIndicador = async (req, res) => {
  try {
    const nuevoIndicador = new Indicador(req.body);
    await nuevoIndicador.save();

    res.status(201).json({
      mensaje: 'Indicador creado con éxito',
      indicador: nuevoIndicador
    });
  } catch (error) {
    console.error('Error al crear Indicador:', error);
    res.status(400).json({
      mensaje: 'Error al crear Indicador',
      detalles: error.errors || error.message
    });
  }
};

// Obtener todos los indicadores
const obtenerTodosIndicadores = async (req, res) => {
  try {
    const indicadores = await Indicador.find();
    res.status(200).json({
      mensaje: 'Indicadores encontrados',
      indicadores
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: 'Error al obtener los indicadores'
    });
  }
};

// Obtener un solo indicador por ID
const obtenerUnIndicador = async (req, res) => {
  try {
    const indicador = await Indicador.findById(req.params.id);
    if (!indicador) {
      return res.status(404).json({ mensaje: 'Indicador no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Indicador encontrado',
      indicador
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: 'Error al obtener el Indicador'
    });
  }
};

// Editar un indicador
const editarIndicador = async (req, res) => {
  try {
    const indicador = await Indicador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!indicador) {
      return res.status(404).json({ mensaje: 'Indicador no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Indicador actualizado',
      indicador
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: 'Error al actualizar el Indicador'
    });
  }
};

// Eliminar un indicador
const eliminarIndicador = async (req, res) => {
  try {
    const indicador = await Indicador.findByIdAndDelete(req.params.id);
    if (!indicador) {
      return res.status(404).json({ mensaje: 'Indicador no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Indicador eliminado'
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: 'Error al eliminar el Indicador'
    });
  }
};

module.exports = {
  crearIndicador,
  obtenerTodosIndicadores,
  obtenerUnIndicador,
  editarIndicador,
  eliminarIndicador
};
