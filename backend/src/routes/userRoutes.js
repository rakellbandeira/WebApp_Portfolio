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

export default router;