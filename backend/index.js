// here we make changing , commonjs to es modules yani all wixi require()ah waxan ku badalaynaa import
 
// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
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

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000
// stpos scripts
app.use(helmet());

app.use(express.json());
app.use(cors());
// swagger
// swaggerUi.serve=wuxu no bilaabo doona server-ka ama UI-ga, 
// swaggerUi.setup=kadib UI-ga ayuu setUp-gareen doona asoo isticmaalaya swaggerSpec-gii an uso sheegnay
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiter
app.use(limiter)


// Morgan
// if (process.env.NODE_ENV == 'developement'){
//     app.use(morgan('dev'))
// }
 
// custom middlewares/logger
app.use(logger);

// halkan api ayan kuso darnay for frontend and backend
// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tasks', tasksRoute);

app.get('/api/health', (req, res)=> {
  res.json('Server is working👌...')
})

// Server frontend in Production
if(process.env.NODE_ENV === 'production') {
  const _dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static(path.join(_dirname, '../frontend/dist')))

  // Server the frontend app
   app.get(/.*/, (req, res) => {
    res.send(path.join(_dirname, '..', 'frontend', 'dist', 'index.html'))
   })
}


// Not found middleware/last route
app.use(notFound)

// for errorHandler
app.use(errorHandler)

const mongoUri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PRO;

// const username = mongoUri?.match(/mongodb\+srv:\/\/([^:]+):/)?.[1];



// Hadii developent-ga aan joogno use the local one 'Mongo_uri_dev', hadii kale use the online one 'mongo_uri_pro'
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Connection err:", err);
  });