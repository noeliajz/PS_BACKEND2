const mongoose = require('mongoose');

const EvaluacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  preguntas: [
    {
      enunciado: { type: String, required: true },
      opciones: [{ type: String, required: true }],
      respuestaCorrecta: { type: String, required: true }
    }
  ],
  notaMaxima: {
    type: Number,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  notas: [
    {
      usuario: { type: String },
      nota: { type: Number },
      fecha: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Evaluacion', EvaluacionSchema);
