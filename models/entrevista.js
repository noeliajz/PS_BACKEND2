const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  pregunta: String,
  respuesta: String
}, { _id: false }); // _id: false evita crear un _id para cada subdocumento

const EntrevistaSchema = new mongoose.Schema({
  entrevistador: {
    type: String,
    required: true,
  },
  entrevistado: {
    type: String,
    required: true,
  },
  preguntas: {
    type: [String],
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  respuestas: {
    type: [RespuestaSchema],
    default: []
  }
});

module.exports = mongoose.model('Entrevista', EntrevistaSchema);
