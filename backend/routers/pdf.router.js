import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAdmin from '../middlewares/isAdmin.js';
import { bookmarkPDF, deletePDF, downloadPDF, editPDF, getLatestPDFs, getPDF, getUploadedPDFs, searchPDF, sendEmail, testPdfExtraction, uploadPDF } from '../controllers/pdf.controller.js';
import upload from '../middlewares/multer.js';
import { chatWithAIPDF, enhanceDescription, enhanceTitle, generateQuestions, generateSummary } from '../controllers/ai.controller.js';

const router = express.Router();

router.route('/upload').post(isAuthenticated, isAdmin, upload.single("pdfFile"), uploadPDF);
router.route('/edit/:pdfId').put(isAuthenticated, isAdmin, editPDF);
router.route('/delete/:pdfId').post(isAuthenticated, isAdmin, deletePDF);
router.route('/getlatest').get(isAuthenticated, getLatestPDFs);
router.route('/getuploaded').get(isAuthenticated, isAdmin, getUploadedPDFs);
router.route('/search').post(isAuthenticated, searchPDF);
router.route('/download/:pdfId').get(isAuthenticated, downloadPDF);
router.route('/extract/:pdfId').get(isAuthenticated, testPdfExtraction);
router.route('/getpdf/:pdfId').get(isAuthenticated, getPDF);
router.route('/:pdfId/sendemail').post(isAuthenticated, sendEmail);
router.route('/:pdfId/bookmark').get(isAuthenticated, bookmarkPDF);
// AI features routes
router.route('/:pdfId/summary').post(isAuthenticated, generateSummary);
router.route('/:pdfId/questions').post(isAuthenticated, generateQuestions);
router.route('/enhance-title').post(isAuthenticated, isAdmin, enhanceTitle);
router.route('/enhance-description').post(isAuthenticated, isAdmin, enhanceDescription);
router.route('/:pdfId/chat').post(isAuthenticated, chatWithAIPDF);

export default router