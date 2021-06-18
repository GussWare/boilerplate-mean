import mongoose from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugin";
import constants from "../config/constants.config";

const tokenSchema = new mongoose.Schema(
	{
		token: {
			type: String,
			required: true,
			index: true,
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: [
				constants.TOKEN.TYPE_REFRESH,
				constants.TOKEN.TYPE_RESET_PASSWORD,
				constants.TOKEN.TYPE_VERIFY_EMAIL,
			],
			required: true,
		},
		expires: {
			type: Date,
			required: true,
		},
		blacklisted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSONPlugin);

tokenSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

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
 * @typedef Token
 */
const Token = mongoose.model("Token", tokenSchema);

export default Token;
