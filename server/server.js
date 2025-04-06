const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // 👈 importado aquí
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
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api/foro', require('../routes/foro'));
        this.app.use('/api/usuario', require('../routes/usuario'));
        this.app.use('/api/entrevista', require('../routes/entrevista'));
        this.app.use('/api/diagrama', require('../routes/diagrama'));
        this.app.use('/api/evaluacion', require('../routes/evaluacion'));
        this.app.use('/api/simulacion', require('../routes/simulacion'));
        this.app.use('/api/video', require('../routes/video'));
        this.app.use('/api/indicador', require('../routes/indicador'));
    }

    listen() {
        conectarbd();
        this.app.listen(this.port, () => {
            console.log('Servidor en línea en el puerto', this.port);
        });
    }
}

module.exports = Server;
