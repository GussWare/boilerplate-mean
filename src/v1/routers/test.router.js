import express from "express";
import * as TestController from "../controllers/test.controller";

const router = express.Router();

router.post("/test-fs", TestController.testFs);

export default router;
