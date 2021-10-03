import faker from "faker";
import * as moduleService from "../services/modules/module.service";
import * as actionService from "../services/actions/actions.service";

export const moduleInitFaker = async () => {
	let contaInserts = 0;

	const userModule = await moduleService.createModule({
		name: "Usuarios",
		slug: "users",
		guard: "",
		description: "Catálogo de usuarios",
	});

	if (userModule) {
		await actionService.createAction({
			name: "Listado de Usuarios",
			slug: "users_list",
			guard: "",
			description: "Listado de usuarios",
			module: userModule.id
		});

		await actionService.createAction({
			name: "Crear Usuario",
			slug: "users_create",
			guard: "",
			description: "Crear un nuevo usuario",
			module: userModule.id
		});

		await actionService.createAction({
			name: "Actualizar Usuario",
			slug: "users_update",
			guard: "",
			description: "Actualizar usuario",
			module: userModule.id
		});

		await actionService.createAction({
			name: "Eliminar Usuario",
			slug: "users_delete",
			guard: "",
			description: "Actualizar usuario",
			module: userModule.id
		});

		await actionService.createAction({
			name: "Editar Usuario",
			slug: "users_patch",
			guard: "",
			description: "Editar usuario",
			module: userModule.id
		});
	}

	return contaInserts;
};
