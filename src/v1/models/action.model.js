import mongoose from "mongoose";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";

const actionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
		},
		
		description: {
			type: String,
			required: true,
			trim: true,
		},
        module: {
            type: mongoose.Schema.Types.ObjectId, ref:'Module'
        }
	},
	{
		timestamps: true,
	}
);

actionSchema.plugin(toJSONPlugin);

actionSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por filtrado avanzado
	if (filter.hasOwnProperty("name")) {
		advancedFilter.push({
			name: filter.name,
		});
	}

	if (filter.hasOwnProperty("slug")) {
		advancedFilter.push({
			slug: filter.slug,
		});
	}

	if (filter.hasOwnProperty("guard")) {
		advancedFilter.push({
			guard: filter.guard,
		});
	}

	if (filter.hasOwnProperty("moduleId")) {
		advancedFilter.push({
			module: filter.moduleId,
		});
	}

	if (advancedFilter.length > 0) {
		filterFind["$and"] = advancedFilter;
	}

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["name", "slug", "guard"];
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

const Action = mongoose.model("Action", actionSchema);

export default Action;
