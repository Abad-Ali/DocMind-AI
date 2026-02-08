import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAdmin from '../middlewares/isAdmin.js';
import { deletePDF, downloadPDF, editPDF, getLatestPDFs, getUploadedPDFs, searchPDF, testPdfExtraction, uploadPDF } from '../controllers/pdf.controller.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route('/upload').post(isAuthenticated, isAdmin, upload.single("pdfFile"), uploadPDF);
router.route('/edit/:pdfId').put(isAuthenticated, isAdmin, editPDF);
router.route('/delete/:pdfId').post(isAuthenticated, isAdmin, deletePDF);
router.route('/getlatest').get(isAuthenticated, getLatestPDFs);
router.route('/getuploaded').get(isAuthenticated, isAdmin, getUploadedPDFs);
router.route('/search').get(isAuthenticated, searchPDF);
router.route('/download/:pdfId').get(isAuthenticated, downloadPDF);
router.route('/extract/:pdfId').get(isAuthenticated, testPdfExtraction);

export default router