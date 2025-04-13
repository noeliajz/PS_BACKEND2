const mongoose = require("mongoose");

const indicadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del indicador es obligatorio"]
  },
  formula: {
    type: String,
    required: [true, "La fórmula del indicador es obligatoria"]
  }
});

module.exports = mongoose.model("Indicador", indicadorSchema);
