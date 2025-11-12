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
 *                   featured:
 *                     type: boolean
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

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Add a new project to the portfolio
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - stack
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Awesome Project"
 *               description:
 *                 type: string
 *                 example: "A description of what this project does"
 *               stack:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js", "MongoDB"]
 *               githubLink:
 *                 type: string
 *                 example: "https://github.com/username/project"
 *               demoLink:
 *                 type: string
 *                 example: "https://project-demo.com"
 *               featured:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating project
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, stack, githubLink, demoLink, featured } = req.body;

    // Validate required fields
    if (!title || !description || !stack) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, and stack are required' 
      });
    }

    // Validate stack is an array
    if (!Array.isArray(stack) || stack.length === 0) {
      return res.status(400).json({ 
        message: 'Stack must be a non-empty array of strings' 
      });
    }

    const newProject = new Project({
      title,
      description,
      stack,
      githubLink,
      demoLink,
      featured: featured || false
    });

    const savedProject = await newProject.save();
    res.status(201).json({ 
      message: 'Project created successfully',
      project: savedProject 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating project', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Update an existing project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               stack:
 *                 type: array
 *                 items:
 *                   type: string
 *               githubLink:
 *                 type: string
 *               demoLink:
 *                 type: string
 *               featured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, description, stack, githubLink, demoLink, featured } = req.body;

    // Find the project
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields (only if provided in request)
    if (title) project.title = title;
    if (description) project.description = description;
    if (stack) {
      if (!Array.isArray(stack) || stack.length === 0) {
        return res.status(400).json({ 
          message: 'Stack must be a non-empty array of strings' 
        });
      }
      project.stack = stack;
    }
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (demoLink !== undefined) project.demoLink = demoLink;
    if (featured !== undefined) project.featured = featured;

    const updatedProject = await project.save();
    res.status(200).json({ 
      message: 'Project updated successfully',
      project: updatedProject 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating project', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Delete a project by ID
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
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ 
      message: 'Project deleted successfully',
      project: project 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting project', 
      error: error.message 
    });
  }
});

export default router;