import express from "express";
import * as TestController from "../controllers/test.controller";

const router = express.Router();

router.post("/test-fs", TestController.testFs);
router.get("/test/faker", TestController.faker);
router.get("/test/polyglot", TestController.polyglot);

export default router;
