// import express and router
// create the router path

import express from 'express'

import isAuthenticated from '../middleware/isAuthenticated.js';
import { login, register } from '../controlllers/userData.js';
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);


export default router;