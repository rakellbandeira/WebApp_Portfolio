import express from 'express';
import Project from '../../models/Project.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects from the portfolio
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   stack:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Error fetching projects
 */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve a specific project by its MongoDB ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project MongoDB ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error fetching project details
 */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching project details',
      error: error.message
    });
  }
});

export default router;