/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la imagen
 *         originalName:
 *           type: string
 *           description: Nombre original del archivo
 *         processedUrl:
 *           type: string
 *           description: URL de la imagen procesada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *     ImageStats:
 *       type: object
 *       properties:
 *         totalImages:
 *           type: integer
 *           description: Total de imágenes procesadas
 *         dateRange:
 *           type: object
 *           properties:
 *             start:
 *               type: string
 *               format: date
 *             end:
 *               type: string
 *               format: date
 */

module.exports = {
  imageSchema: {
    upload: {
      tags: ['Images'],
      summary: 'Subir y procesar una imagen',
      consumes: ['multipart/form-data'],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Archivo de imagen a procesar'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Imagen procesada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Image'
              }
            }
          }
        }
      }
    },
    getStats: {
      tags: ['Images'],
      summary: 'Obtener estadísticas de imágenes procesadas',
      parameters: [
        {
          in: 'query',
          name: 'startDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Fecha inicial para filtrar estadísticas'
        },
        {
          in: 'query',
          name: 'endDate',
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Fecha final para filtrar estadísticas'
        }
      ],
      responses: {
        200: {
          description: 'Estadísticas obtenidas exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ImageStats'
              }
            }
          }
        }
      }
    },
    getHourlyStats: {
      tags: ['Images'],
      summary: 'Obtener estadísticas por hora',
      description: 'Retorna la cantidad de imágenes procesadas por hora',
      parameters: [
        {
          in: 'query',
          name: 'startDate',
          required: true,
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Fecha inicial para filtrar estadísticas'
        },
        {
          in: 'query',
          name: 'endDate',
          required: true,
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Fecha final para filtrar estadísticas'
        }
      ],
      responses: {
        200: {
          description: 'Estadísticas por hora obtenidas exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'number'
                },
                description: 'Array de 24 elementos con el conteo por hora'
              }
            }
          }
        }
      }
    }
  }
}; 