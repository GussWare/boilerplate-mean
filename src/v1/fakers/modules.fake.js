import faker from "faker";
import * as moduleService from "../services/modules/module.service";

export const moduleInitFaker = async () => {
	let contaInserts = 0;

	for (let i = 0; i < 100; i++) {
		await moduleService.createModule({
			name: faker.lorem.word(),
			slug:faker.lorem.slug(),
            guard:faker.lorem.slug(),
            description:faker.lorem.paragraph()
		});

		contaInserts++;
	}

	return contaInserts;
};
