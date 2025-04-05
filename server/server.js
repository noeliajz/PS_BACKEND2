// server.js
const express = require('express');
const morgan = require('morgan');
const conectarbd = require('../dataBase/config');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.middleware();
        this.routes();
        this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api/foro', require('../routes/foro')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/usuario', require('../routes/usuario')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/entrevista', require('../routes/entrevista')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/diagrama', require('../routes/diagrama')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/evaluacion', require('../routes/evaluacion')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/simulacion', require('../routes/simulacion')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/video', require('../routes/video')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/evaluacion', require('../routes/evaluacion')); // Asegúrate de que 'user' esté bien definido


    }

    listen() {
        conectarbd();
        this.app.listen(this.port, () => {
            console.log('Servidor en linea', this.port);
        });
    }
}

module.exports = Server;
