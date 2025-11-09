import express from 'express';
import User from '../../models/User.js';

const router = express.Router();


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error fetching users
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;