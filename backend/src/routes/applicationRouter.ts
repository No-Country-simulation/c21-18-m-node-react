import express from 'express';
import * as application from '../controllers/application';
const applicationRouter = express.Router();
applicationRouter.get('/', application.getAllApplications);
applicationRouter.post('/create', application.createApplication);
applicationRouter.put('/update/:id', application.updateApplicationStatus);
export default applicationRouter;

