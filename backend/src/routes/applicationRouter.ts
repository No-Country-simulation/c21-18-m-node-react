import express from 'express'
import * as application from '../controllers/application'
const applicationRouter = express.Router()


applicationRouter.post('/create',application.createApplication)

export default applicationRouter