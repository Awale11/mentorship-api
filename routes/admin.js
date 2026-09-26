// this only waa admin-ka
import express from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
const router = express.Router();

// this dashboard waa protect qof aan login eheen masoo gali karo kadib kasii checkgaree inuu role kiis admin yhy qybta authorize-ka
router.get('/dashboard', protect, authorize('admin'), (req, res)=>{
    res.json({
        message: `Welcome to the admin dashboard, ${req.user.name}`
    })
})


export default router;