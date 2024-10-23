import * as shelterController from '../controllers/shelter.controller';
// import { Router } from "express";
import express from 'express';
import { roleCheck } from '../middleware/roleCheck';
import { isAuthenticated } from '../middleware/isAuthenticate';

// const shelterRouter = Router();
const shelterRouter = express.Router();

shelterRouter.post('/create-shelter', shelterController.createShelter);
shelterRouter.get('/', shelterController.getAllShelters);
shelterRouter.get('/:id', shelterController.getAshelter);
shelterRouter.put('/:id', shelterController.updateShelter);
shelterRouter.delete('/:id', shelterController.deleteShelter);

/**
 * @swagger
 * /api/shelter/create-shelter:
 *   post:
 *     summary: Create a shelter
 *     tags: [Shelter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Shelters'
 *     responses:
 *        201:
 *          description: new shelter
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  data:
 *                    $ref: '#/components/schemas/Shelters'
 *        400:
 *          description: fail
 */

/**
 * @swagger
 * /api/shelter:
 *   get:
 *     summary: Get all shelters
 *     tags: [Shelter]
 *     responses:
 *       200:
 *         description: A list of shelters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shelters'
 *       500:
 *         description: Internal server Error
 */

/**
 * @swagger
 * /api/shelter/{id}:
 *   get:
 *     summary: Get a refuge
 *     tags: [Shelter]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the shelter id
 *     responses:
 *       200:
 *         description: a shelter
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Shelters'
 *       404:
 *         description: shelter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "The shelter does not exists!"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */

/**
 * @swagger
 * /api/shelter/{id}:
 *   put:
 *     summary: update a shelter by id
 *     tags: [Shelter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type:
 *         description: Id to update a shelter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Shelters'
 *     responses:
 *       200:
 *         description: Shelter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                     type: string
 *                     description: updated shelter name
 *                 address:
 *                     type:: string
 *                     description: updated shelter address
 *                 email:
 *                     type: string
 *                     description: updated email shelter
 *                 phone:
 *                     type: string
 *                     description: updated phone shelter
 *       404:
 *         description: Shelter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Shelter does not exist, nothing to update!"
 *       500:
 *         description: fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/shelter/{id}:
 *   delete:
 *     summary: delete a shelter and reassign its pets to another shelter
 *     tags: [Shelter]
 *     description: Deletes a specified shelter and reassigns all pets to a random available shelter. If no other shelters are available, a 400 error is returned
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the shelter to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Shelter deleted successfully and pets reassigned
 *       400:
 *         description: There are no available shelters to reassign pets to
 *       500:
 *         description: Internal server error
 */

export default shelterRouter;
