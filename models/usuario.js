const mongoose = require('mongoose')
const UsuarioSchema= new mongoose.Schema({
    
    usuario:{
        type: String,
        unique: true,
        require: true
    },
    contrasenia: String,
    token: String,
    role: {
        type: String,
        default: 'user'
    }
    
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema)
module.exports = UsuarioModel 
