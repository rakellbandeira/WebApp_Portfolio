import express from 'express';
import User from '../../models/User.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the user profile information
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user data
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching User data', error: error.message });
  }
});


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the portfolio
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Awesome Name"
 *               email:
 *                 type: string
 *                 example: "An email here"
 *               description:
 *                 type: string
 *                 example: "Your awesome self"
 *             
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating user
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, description } = req.body;

    // Validate required fields
    if (!name || !email || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email and description are required' 
      });
    }

    const newUser = new User({
      name,
      email,
      description
    });

    const savedUser = await newUser.save();
    res.status(201).json({ 
      message: 'User created successfully',
      project: savedUser
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
});

export default router;