import faker from "faker";
import * as userService from "../services/users/user.service";

export const userInitFaker = async () => {
	let contaInserts = 0;

	const userAdmin = await userService.createUser({
		name: "Gustavo",
		surname: "Avila Medina",
		username: "gussware",
		email: "gussware@gmail.com",
		password: "123qweAA",
		repeatPassword: "123qweAA",
		role: "admin",
		enabled:true
	});

	if (userAdmin) {
		contaInserts++;
	}

	for (let i = 0; i < 500; i++) {
		let password = faker.internet.password();
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();

		await userService.createUser({
			name: firstName,
			surname: lastName,
			username: faker.internet.userName(firstName, lastName),
			email: faker.internet.email(),
			password: password,
			repeatPassword: password,
			enabled:faker.random.boolean()
		});

		contaInserts++;
	}

	return contaInserts;
};
