import express from "express";
import authenticateToken from "../middlewares/isAuthenicated.js";

import {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
} from "../controllers/applicants.controller.js";

const router=express.Router();

router.route("/apply/:id").post(authenticateToken,applyJob);
router.route("/appliedjobs").get(authenticateToken,getAppliedJobs);
router.route("/applicants/:id").get(authenticateToken,getApplicants);
router.route("/updatestatus/:id/:status").put(authenticateToken,updateStatus);

export default router;
