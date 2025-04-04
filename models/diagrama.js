const mongoose = require('mongoose');

const DiagramaSchema = new mongoose.Schema({
    imagen: {
        type: String,
        required: true
    }
    
    
});

const Diagrama = mongoose.model('Diagrama', DiagramaSchema);

module.exports = Diagrama;
