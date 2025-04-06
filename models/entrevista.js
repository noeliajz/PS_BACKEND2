const mongoose = require('mongoose');

const EntrevistaSchema = new mongoose.Schema({
    entrevistador: { type: String, required: true },
    entrevistado: { type: String, required: true },
    preguntas: { type: [String], required: true },
    respuestas: [{
        respuestas: [String],
        fecha: { type: Date, default: Date.now }
    }],
    fecha: { type: Date, default: Date.now }
});

const Entrevista = mongoose.model('Entrevista', EntrevistaSchema);
module.exports = Entrevista;
