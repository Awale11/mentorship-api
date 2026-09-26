// this file waxa loogu tala galay user-ka markuu login dhaho kadib inaan aqoonsi siino. waa secret file so waxan ku qarinaynaa .env

// waxa jira verify iyo sign. verify waa marka hadhow user-ka uu dhihi doono waa aniga, kadib we verify the user.

// {id: userId}= payload-ka wax walba ayan dhigan karnaa waa information aan rabno inaan ku aqoonsano

import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    // .sign waa first time aan sameeneeno verification-ka iyo id aqoonsi ah 
    return jwt.sign(
        {id: userId}, 
        process.env.JWT_SECRET, {
        // wuxu ku dhici doona 7da maalin
        expiresIn: '7d'
    })
}

//return jwt.sign(payload, secret, option)
// anag halkan payload-ka waa id: userId, secret-ka=process.env.JWT_SECRET, option-ka= expiresIn: '7d'