// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegura que la carpeta uploads exista
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Guardar en /uploads
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nombreArchivo = `${Date.now()}-${file.originalname}`;
        cb(null, nombreArchivo);
    }
});

const upload = multer({ storage });

module.exports = upload;
