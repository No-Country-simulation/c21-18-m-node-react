import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers";
import { isAuthenticated } from "../middleware/isAuthenticate";
import { roleCheck } from "../middleware/roleCheck";
const usersRouter = Router();

usersRouter.route("/create-user").post(createUser);
usersRouter.use(isAuthenticated);
usersRouter.get("/users", roleCheck(["ADMIN"]), getAllUsers);

usersRouter
  .route("/users/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

/**
 * @swagger
 * /api/user/create-user:
 *   post:
 *     summary: Create
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
 */

export default usersRouter;
