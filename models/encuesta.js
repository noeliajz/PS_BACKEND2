const mongoose = require('mongoose');

const EncuestaSchema = new mongoose.Schema({
    encuestador: { type: String, required: true },
    encuestado: { type: String, required: true },
    preguntas: { type: [String], required: true },
    respuestas: [{
        respuestas: [String],
        fecha: { type: Date, default: Date.now }
    }],
    fecha: { type: Date, default: Date.now }
});

const Encuesta = mongoose.model('Encuesta', EncuestaSchema);
module.exports = Encuesta;
