// here we make changing , commonjs to es modules yani all wixi require()ah waxan ku badalaynaa import
 
// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
// here for middleWare logger waye
import { logger } from './middlewares/logger.js';

// const userRoutes = require('./routes/users');
import userRoutes from './routes/users.js'
import { notFound } from './middlewares/notfound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from "./routes/auth.js"
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import tasksRoute from './routes/tasks.js'
import helmet from 'helmet';
import { limiter } from './middlewares/rateLimiter.js';

const app = express();
// stpos scripts
app.use(helmet());

app.use(express.json());
// swagger
// swaggerUi.serve=wuxu no bilaabo doona server-ka ama UI-ga, 
// swaggerUi.setup=kadib UI-ga ayuu setUp-gareen doona asoo isticmaalaya swaggerSpec-gii an uso sheegnay
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiter
app.use(limiter)


// Morgan
// if (process.env.NODE_ENV == 'developement'){
//     app.use(morgan('dev'))
// }
 
// custom middlewares/logger
app.use(logger);

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/upload', uploadRoutes);
app.use('/tasks', tasksRoute);



// Not found middleware/last route
app.use(notFound)

// for errorHandler
app.use(errorHandler)

// Hadii developent-ga aan joogno use the local one 'Mongo_uri_dev', hadii kale use the online one 'mongo_uri_pro'
mongoose 
    .connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(()=> {
        console.log('MongoDB connected');
        
        app.listen(process.env.PORT, ()=> {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error)
    })