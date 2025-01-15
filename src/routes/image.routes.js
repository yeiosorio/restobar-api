const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getImagesByDateRange, getImagesPerHour } = require('../controllers/image.controller');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     $ref: '#/components/schemas/imageSchema/upload'
 */
router.post('/upload', upload.single('image'), uploadImage);

/**
 * @swagger
 * /api/images/by-date-range:
 *   get:
 *     $ref: '#/components/schemas/imageSchema/getStats'
 */
router.get('/by-date-range', getImagesByDateRange);

/**
 * @swagger
 * /api/images/stats/hourly:
 *   get:
 *     $ref: '#/components/schemas/imageSchema/getHourlyStats'
 */
router.get('/stats/hourly', getImagesPerHour);

module.exports = router; 