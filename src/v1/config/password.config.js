const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

import UserModel from "../models/user.model";
import config from "./vars.config";
import constants from "./constants.config";

const jwtOptions = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
	try {
		if (payload.type !== constants.TOKEN.TYPE_ACCESS) {
			throw new Error("Invalid token type");
		}

		const user = await UserModel.findById(payload.sub);

		if (!user) {
			return done(null, false);
		}

		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
