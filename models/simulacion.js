const mongoose = require("mongoose");

const SimulacionSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    precondicion: {
        type: String,
        required: true
    },
    capacitador: {
        type: String,
        required: true
    },
    personalQueAsiste: {
        type: String,
        required: true
    }
});

const Simulacion = mongoose.model("Simulacion", SimulacionSchema);

module.exports = Simulacion;
