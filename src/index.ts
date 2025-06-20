import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/users';
import { swaggerUi, specs } from './config/swagger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     tags: [Health]
 *     description: Check if the API is running
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shows API is running!"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: string
 *                       example: "/api/users"
 *                     createUser:
 *                       type: string
 *                       example: "POST /api/users"
 *                     seedUsers:
 *                       type: string
 *                       example: "POST /api/users/seed"
 *                     documentation:
 *                       type: string
 *                       example: "/api-docs"
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Shows API is running!',
    endpoints: {
      users: '/api/users',
      createUser: 'POST /api/users',
      seedUsers: 'POST /api/users/seed',
      documentation: '/api-docs'
    }
  });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Shows API Documentation'
}));

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});