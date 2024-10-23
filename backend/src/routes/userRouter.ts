import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controllers';

const usersRouter = Router();

usersRouter.route('/create-user').post(createUser);

usersRouter.get('/users', getAllUsers);
usersRouter.route('/users/:id').get(getUserById);
usersRouter.route('/users/:id').put(updateUser);
usersRouter.route('/users/:id').delete(deleteUser);

/**
 * @swagger
 * /api/user/create-user:
 *   post:
 *     summary: Create (No authentication required)
 *     tags: [Users]
 *     description: This endpoint creates a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *        201:
 *          description: User created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  data:
 *                    $ref: '#/components/schemas/Users'
 *        400:
 *          description: Bad request, missing information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: fail
 *                  data:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Missing information
 */

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Get all users (Admin access required)
 *     tags: [Users]
 *     security:
 *       - cookie: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad request, missing information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 data:
 *                   type: object
 *                   example: {"error": "Invalid request"}
 */

/**
 * @swagger
 * /api/user/users/{id}:
 *   get:
 *     summary: get a user by ID (Authenticated access required)
 *     tags: [Users]
 *     security:
 *       - cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieve the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Users'
 *       404:
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: fail
 *                  message:
 *                    type: string
 *                    example: User not found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 data:
 *                   type: object
 *                   example: {"error": "Invalid request"}
 */

/**
 * @swagger
 * /api/user/users/{id}:
 *   put:
 *     summary: update a user by ID (Authenticated access required)
 *     tags: [Users]
 *     security:
 *        - cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       requestBody: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Users'
 *     responses      :
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Users'
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: error updating user
 *                 data:
 *                   type: object
 *                   example: {"error": "Invalid request"}
 */

/**
 * @swagger
 * /api/user/users/{id}:
 *   delete:
 *     summary: delete a user by ID (Authenticated access required)
 *     tags: [Users]
 *     security:
 *       - cookie: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: success
 *               message:
 *                 type: string
 *                 example: user deleted successfully
 *               data:
 *                 type: object
 *                 example: null
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 data:
 *                   type: object
 *                   example: {"error", "Invalid request"}
 */

export default usersRouter;
