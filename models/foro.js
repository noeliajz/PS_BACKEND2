const mongoose = require('mongoose');

const ForoSchema = new mongoose.Schema({
    comentario: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
    }
    
    
});

const Foro = mongoose.model('Foro', ForoSchema);

module.exports = Foro;
