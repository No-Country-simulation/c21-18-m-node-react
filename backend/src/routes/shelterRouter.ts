import { createShelter, getAllShelters } from '@/controllers';
import { Router } from 'express';
createShelter;

const shelterRouter = Router();

shelterRouter.route('/').get(getAllShelters);
shelterRouter.route('/create-shelter').post(createShelter);
export default shelterRouter;
