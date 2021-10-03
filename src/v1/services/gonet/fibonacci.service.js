export const calcularFibonacci = async (n) => {
	let fibonacci = [0, 1];

	for (let i = 2; i <= n; i++) {
		let fib = fibonacci[i - 1] + fibonacci[i - 2];
		fibonacci.push(fib);
	}
	return fibonacci[n];
};