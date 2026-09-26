import  User from "../models/User.js"
import { generateToken } from '../utils/generateToken.js';

// REGISTER NEW USER

export const register = async (req, res, next)=> {
    // const name = req.body.name;
    // const password = req.body.password;
    // const emai = req.body.email;
    // 3daan waxa undhigma asagidaki
    let { name, password, email, role } = req.body;

    try {
        // qof emailkan wata maku jiraa datebase-keena noo raadi
        email = email.toLowerCase();
        const exists = await User.findOne({email})

        // email-ka la raadinaayo haduu jiro
        if (exists) return res.status(400).json({ message: 'Email already in use'});

        // emailka haduusan jirin, we create now
        const user = await User.create({ name, password, email, role });

        // after creating email, we pass token  
        const token = generateToken(user._id)
        res.status(201).json({ token })

    } catch (err) {
        // hadii qalad dhaco global error-ka ayan usii gudbinayna asaa nooso sheegayo markee cilada jirto
        console.log("err", err)
        next(err)
    }
}

// LOGIN

export const login = async (req, res, next)=> {
    // password and email ayan la baxnay
    let { email, password } = req.body;

    try {
        // lowercase ayan u badalnay si ay waxa dhan same u noqdaan
        email = email.toLowerCase();
        // kadib user-ki ayan email ku raadinay
        const user = await User.findOne({ email });

        // hadii emailka laso wayo ama is barbardhiga hadii isku mid noqon waayan, u dir emailka ama passwordka midkood aya qaldan
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password'})
        }
        // lkn hday sax noqdaan token aya loso gudbaa
        const token = generateToken(user._id);
        res.json({ token })
    } catch (err) {
        next(err)
    }
}