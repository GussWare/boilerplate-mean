import catchAsyncHelper from "../helpers/catch.async.helper";
import * as FibonnacciService from "../services/gonet/fibonacci.service";
import * as JerarquiaService from "../services/gonet/jerarquia.service";

export const calculateFibonacci = catchAsyncHelper(async (req, res) => {
	const num = req.body.fib;
	const fibonnacci = await FibonnacciService.calcularFibonacci(num);

	res.send({fibonnacci});
});

export const jerarquia = catchAsyncHelper(async (req, res) => {
	const nombre = req.query.nombre;
	const jerarquia = await JerarquiaService.getJerarquia(nombre);

	res.send({jerarquia});
});