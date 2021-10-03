import express from "express";
import * as GonetController from "../controllers/gonet.controller";
import * as fibonacciValidation from "../validations/fibonacci.validation";
import * as jerarquiaValidation from "../validations/jerarquia.validation";
import validateMiddleware from "../middlewares/validation.middleware";

const router = express.Router();

router.post(
	"/fibonacci",
	[validateMiddleware(fibonacciValidation.fibonacci)],
	GonetController.calculateFibonacci
);

router.get(
	"/jerarquia",
	[],
	GonetController.jerarquia
);



export default router;
