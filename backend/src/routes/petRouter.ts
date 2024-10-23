import { Router } from 'express';
import * as petController from '../controllers/pet.controller';

import {
	uploadPhoto,
	resizeAndUploadImage,
} from '../middleware/imageUploadMiddleware';
import { roleCheck } from '../middleware/roleCheck';

const petRouter = Router();

petRouter.post(
	'/create-pet',
	uploadPhoto.single('picture'),
	resizeAndUploadImage,
	petController.createPet
);
petRouter.get('/', petController.getPets);
petRouter.get('/:id', petController.getPetById);
petRouter.put('/:id', petController.updatePet);
petRouter.delete('/:id', petController.deletePet);

/**
 * @swagger
 * /api/pet/create-pet:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Pets'
 *     responses:
 *       201:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Pets'
 *       400:
 *         description: Missing Information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing Information"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 data:
 *                   type: string
 *                   example: "Error message"
 */

/**
 * @swagger
 * /api/pet/:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pets'
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
 * /api/pet/{id}:
 *   get:
 *     summary: Get a single pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the pet id
 *     responses:
 *       200:
 *         description: a pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Pets'
 *       404:
 *         description: pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "The pet does not exist"
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
 * /api/pet/{id}:
 *  put:
 *    summary: Update a pet by Id
 *    tags: [Pets]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Id to update a pet
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Pets'
 *    responses:
 *      200:
 *        description: Pet updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                    type: string
 *                    description: updated pet name
 *                    example: new name
 *                age:
 *                   type: integer
 *                   description: updated pet description
 *                   example: new age
 *                shelterId:
 *                    type: string
 *                    description: updated pet
 *                    example: new shelterId
 *                picture:
 *                    type: string
 *                    description: updated picture
 *                    example: new picture
 *                description:
 *                    type: string
 *                    description: updated description
 *                    example: new description
 *                status:
 *                    type: string
 *                    description: updated status
 *                    example: new status
 *      500:
 *        description: fail
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "fail"
 *                message:
 *                  type: string
 *                  example: "Internal server error."
 */

/**
 * @swagger
 * /api/pet/{id}:
 *  delete:
 *   summary: delete a pet
 *   tags: [Pets]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: the pet id
 *   responses:
 *     204:
 *       description: Pet deleted successfully
 *
 *     500:
 *       description: fail
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "fail"
 *               message:
 *                 type: string
 *                 example: "Internal server error."
 */

export default petRouter;
