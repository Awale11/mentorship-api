import express from 'express';
import { login, register } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateZod.js';
import { createUserSchema } from '../schemas/userShema.js';

const router = express.Router();

// qeexida API for register
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */

// here for resgiser
// we added here schema validate oo comes from file validateZod.js which means waa validate-gareeya waxa user-ka uuso qoray kadib aya la register-gareen karaa
router.post('/register', validate(createUserSchema),register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
// here for login
router.post('/login', login);
// Protected route 
// bu router waxa iman kara kaliya qofka login soo dhaho,user-ka markuu URL-kan imaado req,iyo res ha u gudbin horto protect-gaan fuli, marki protect so gudbo aya lafasixi userka
router.get('/profile', protect, (req, res)=> {
    // request user-ka dib udir
    res.json(req.user)
})


export default router;

// here waa authentication= login waa inaa ogaanaa user-ka who is?
// authorization= user-kan maloo ogalyhy URL-kaan mise route-kaan
