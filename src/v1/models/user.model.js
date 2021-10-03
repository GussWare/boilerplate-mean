import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";

const imgSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	thumbnailUrl: {
		type: String,
		required: false,
	},
});

imgSchema.plugin(toJSONPlugin);

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},

		picture: imgSchema,

		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 8,
			private: true, // used by the toJSON plugin
		},
		role: {
			type: String,
			default: "user",
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		enabled: {
			type:Boolean,
			default: true,
		}
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSONPlugin);

userSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por filtrado avanzado
	if (filter.hasOwnProperty("username")) {
		advancedFilter.push({
			username: filter.username,
		});
	}

	if (filter.hasOwnProperty("email")) {
		advancedFilter.push({
			email: filter.email,
		});
	}

	if (advancedFilter.length > 0) {
		filterFind["$and"] = advancedFilter;
	}

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["name", "surname", "username", "email"];
		searchFilter = paginationHelper.search(options.search, columns);

		if (searchFilter.length > 0) {
			filterFind["$or"] = searchFilter;
		}
	}

	const sort = paginationHelper.sortBy(options.sortBy);
	const limit = paginationHelper.limit(options.limit);
	const page = paginationHelper.page(options.page);
	const skip = paginationHelper.skip(page, limit);

	const countPromise = this.countDocuments(filterFind).exec();
	let docsPromise = this.find(filterFind).sort(sort).skip(skip).limit(limit);

	if (options.populate) {
		options.populate.split(",").forEach((populateOption) => {
			docsPromise = docsPromise.populate(
				populateOption
					.split(".")
					.reverse()
					.reduce((a, b) => ({ path: b, populate: a }))
			);
		});
	}

	docsPromise = docsPromise.exec();

	return Promise.all([countPromise, docsPromise]).then((values) => {
		const [totalResults, results] = values;
		const totalPages = Math.ceil(totalResults / limit);
		const result = {
			results,
			page,
			limit,
			totalPages,
			totalResults,
		};

		return Promise.resolve(result);
	});
};

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

export default User;
