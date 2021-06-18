const { version } = require("../../../package.json");
const config = require("../config/vars.config");

const swagger = {
	openapi: "3.0.0",
	info: {
		title: "Boilerplate Babel Mean(Mongo, Express, Angular y NodeJS)",
		version: version,
		license: {
			name: "MIT",
			url: "https://github.com/gussware/bolerplate-mean/master/LICENSE",
		},
	},
	servers: [
		{
			url: `http://localhost:${config.port}/api/v1`,
		},
	],
};

export default swagger;
