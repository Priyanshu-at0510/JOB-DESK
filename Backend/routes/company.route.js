import express from 'express';
import {registerCompany, getAllCompanies, getCompanyById,updateCompanyDetails} from '../controllers/company.controller.js';
import authenticateToken from '../middlewares/isAuthenicated.js';

const router=express.Router();

router.post('/register',authenticateToken,registerCompany);
router.get('/get',authenticateToken,getAllCompanies);
router.put('/update/:id',authenticateToken,updateCompanyDetails);
router.get('/get/:id',authenticateToken,getCompanyById);


export default router;
