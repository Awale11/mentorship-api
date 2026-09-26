// const User = require('../modules/User');
import User from '../models/User.js'

// here ayni sekilde export const ayan u badalaynaa

//  exports.getUsers = async (req, res) => {
//   const users = await User.find();

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

// new user POST
 export const createUser = async (req, res) => {
  const user = new User(req.body);

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

// UPDATE User PUT
export const updatedUser = async(req, res) => {
    const { id } = req.params;

    try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});

        if(!updatedUser) {
            return res.status(404).send('User not found')
        }
        res.json(updatedUser)
    }catch (err) {
        res.status(500).send('Server error')
    }
}

// DELETE User

export const deleteUser = async(req, res)=> {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).send('User not found')
        }
        res.json(`User with id ${id} deleted`)
    } catch (error) {
        res.status(500).send('Server error')
    }
}

// searching 1 single User

export const getUserInfo = async(req, res)=> {
    const userInfo = await User.findById(req.params.id)

    if(!userInfo) return res.status(404).send('User not found');

    res.json(userInfo)
}

// REGISTER NEW USER
export const register = async (req, res, next)=> {
    // const name = req.body.name;
    // const password = req.body.password;
    // const emai = req.body.email;
    // 3daan waxa undhigma asagidaki
    let { name, password, email } = req.body;

    try {
        // qof emailkna wata maku jiraa datebase-keena noo raadi
        email = email.toLowerCase();
        const exists = await User.findOne({email})

        // email-ka la raadinaayo haduu jiro
        if (exists) return res.status(400).json({ message: 'Email already in use'});

        // emailka haduusan jirin, we create now
        const user = await User.create({ name, password, email });

        // after creating email, we pass token  
        const token = generateToken(user_id)
        res.status(201).json({ token })

    } catch (error) {
        // hadii qalad dhaco global error-ka ayan usii gudbinayna asaa nooso sheegayo markee cilada jirto
        console.log("error", err)
        next(err)
    }
}

