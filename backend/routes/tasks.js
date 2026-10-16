import express from 'express';
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middlewares/auth.js'


const router = express.Router();

// API for get all tasks
// tags=isku group ayay ka dhigayaan

// sida loo qeexo API Tasks
/**
 * @swagger
 * /tasks:
 *  get: 
 *      summary: Get All tasks for the logged-in user
 * 
 *      tags: [Tasks]
 *      security:
 *          -bearerAuth: []
 *      responses:
 *          200:
 *              description: A List of tasks
 */
// now waxa la rabaa swagger-ka inuu no diyaariyo API oo kahadlaayo URL-ka 1aad.kadib wixi user ah meeeshas ayan ka arkaynaa
router.get('/', protect, getMyTasks);

// swagger Api for creater
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', protect, createTask);

// /tasks/{id}: bu parameter ahaan ayaa loo aqoonsanaa yani id-iiga la update gareenaayo ayaan baasaynaa waa dynamic.
// API for update 
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 */

router.put('/:id', protect, updateTask);

// API for delete
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', protect, deleteTask);

export default router;