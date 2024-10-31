import express from 'express';
import * as userController from '../controllers/user.controller';

const usersRouter = express.Router();

usersRouter.post('/create-user', userController.createUser);
usersRouter.get('/users', userController.getAllUsers);
usersRouter.get('/users/:id', userController.getUserById);
usersRouter.put('/users/:id', userController.updateUser);
usersRouter.delete('/users/:id', userController.deleteUser);
usersRouter.get('/users/mail/:email', userController.getUserByEmail);

/**
 * @swagger
 * /api/user/create-user:
 *   post:
 *     summary: Create a user
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
 *     summary: Get all users
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
 *     summary: get a user by ID
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
 *     summary: update a user by ID
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
 *     summary: delete a user by ID
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
