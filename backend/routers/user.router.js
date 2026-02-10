import express from 'express';
import { beAdmin, changePassword, editProfile, getUserProfile, login, logout, register, verifyEmail } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/verifyemail').post(verifyEmail);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/edit').put(isAuthenticated, upload.single('profilePicture'), editProfile);
router.route('/getprofile/:userId').get(isAuthenticated, getUserProfile);
router.route('/changepassword').post(isAuthenticated, changePassword);
router.route('/become-admin').post(isAuthenticated, beAdmin);

export default router 