const sharp = require('sharp');
const { bucket, db } = require('../config/firebase.config');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    }

    // Procesar la imagen con Sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .png() // Convertir a PNG
      .resize(800) // Redimensionar manteniendo el aspect ratio
      .toBuffer();

    // Generar nombre único para el archivo
    const fileName = `images/${Date.now()}-${req.file.originalname.split('.')[0]}.png`;

    // Subir a Firebase Storage
    const file = bucket.file(fileName);
    await file.save(processedImageBuffer, {
      metadata: {
        contentType: 'image/png',
      },
    });

    // Obtener URL pública
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500', // URL permanente
    });

    // Guardar metadata en Firestore
    const imageDoc = {
      fileName,
      url,
      uploadDate: new Date(),
      userName: req.body.userName || 'Anonymous',
      originalName: req.file.originalname,
    };

    await db.collection('images').add(imageDoc);

    res.status(200).json({
      message: 'Imagen procesada y guardada exitosamente',
      data: imageDoc
    });

  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    res.status(500).json({ error: 'Error al procesar la imagen' });
  }
};

const getImagesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Se requieren fechas de inicio y fin' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const imagesRef = db.collection('images');
    const snapshot = await imagesRef
      .where('uploadDate', '>=', start)
      .where('uploadDate', '<=', end)
      .orderBy('uploadDate', 'desc')
      .get();

    const images = [];
    snapshot.forEach(doc => {
      images.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(images);

  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
};

const getImagesPerHour = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Se requieren fechas de inicio y fin' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const snapshot = await db.collection('images')
      .where('uploadDate', '>=', start)
      .where('uploadDate', '<=', end)
      .get();

    // Agrupar por hora
    const hourlyCount = new Array(24).fill(0);
    
    snapshot.forEach(doc => {
      const uploadDate = doc.data().uploadDate.toDate();
      const hour = uploadDate.getHours();
      hourlyCount[hour]++;
    });

    res.status(200).json(hourlyCount);

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

module.exports = {
  uploadImage,
  getImagesByDateRange,
  getImagesPerHour
}; 