import express from 'express';
import User from '../models/User';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching users', 
      error: error instanceof Error ? error.message : error 
    });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Create a new user with name, email, and age
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      data: savedUser
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Error creating user', 
      error: error instanceof Error ? error.message : error 
    });
  }
});

/**
 * @swagger
 * /api/users/seed:
 *   post:
 *     summary: Create sample users
 *     tags: [Users]
 *     description: Create multiple sample users for testing purposes
 *     responses:
 *       201:
 *         description: Sample users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Sample users created successfully"
 *                 count:
 *                   type: integer
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/seed', async (req, res) => {
  try {
    // Clear existing users first
    await User.deleteMany({});
    
    const sampleUsers = [
      { name: 'John Doe', email: 'john@example.com', age: 25 },
      { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
      { name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
      { name: 'Alice Brown', email: 'alice@example.com', age: 28 }
    ];

    const users = await User.insertMany(sampleUsers);
    res.status(201).json({
      success: true,
      message: 'Sample users created successfully',
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Error creating sample users', 
      error: error instanceof Error ? error.message : error 
    });
  }
});

export default router;