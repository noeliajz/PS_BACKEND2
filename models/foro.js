const mongoose = require('mongoose');

const ForoSchema = new mongoose.Schema({
    comentario: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios", // 👈 Este nombre debe coincidir con tu modelo de usuario
      }
    
    
});

const Foro = mongoose.model('Foro', ForoSchema);

module.exports = Foro;
