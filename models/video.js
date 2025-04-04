const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    url: {  // URL o ruta del archivo subido
        type: String,
        required: true
    },
    fechaSubida: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
