const mongoose = require('mongoose');

const EntrevistaSchema = new mongoose.Schema({
    entrevistador: {
        type: String,
        required: true
    },
    entrevistado: {
        type: String,
        required: true
    },
    preguntas: {
        type: [String],
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now // Guarda la fecha actual automáticamente
    }
    
});

const Entrevista = mongoose.model('Entrevista', EntrevistaSchema);

module.exports = Entrevista;
