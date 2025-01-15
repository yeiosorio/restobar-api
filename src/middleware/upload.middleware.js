const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenamiento temporal
const storage = multer.memoryStorage();

// Filtro para aceptar solo imágenes JPEG
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos JPEG'), false);
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
});

module.exports = upload; 