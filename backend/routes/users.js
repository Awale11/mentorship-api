// const express = require('express');
import express from 'express';
import { getUsers, createUser, updatedUser, deleteUser, getUserInfo }  from '../controllers/users.js';

const router = express.Router();

// for GET
router.get('/', getUsers);
// seraching 1 user
router.get('/:id', getUserInfo)
// for POST
router.post('/create', createUser);
// for PUT
router.put('/update/:id', updatedUser);
// for DELETE
router.delete('/delete/:id', deleteUser)



// export the router
// module.exports = router;
// bu da default ayan ku dalaynaa asagidaki gibi
export default router;
