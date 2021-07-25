import loggerHelper from "./logger.helper";

export const search = (searchOption, columns) => {
	let searchOr = [];

	if (!searchOption) return searchOr;

	columns.forEach((column) => {
		let item = {};
		item[column] = { $regex: searchOption, $options: "i" };
		searchOr.push(item);
	});

	return searchOr;
};

export const sortBy = (sortByy) => {
	let sort = "";

	if (sortByy) {
		const sortingCriteria = [];

		sortByy.split(",").forEach((sortOption) => {
			const [key, order] = sortOption.split(":");
			sortingCriteria.push((order === "desc" ? "-" : "") + key);
		});

		sort = sortingCriteria.join(" ");
	} else {
		sort = "createdAt";
	}

	return sort;
};

/**
 *
 * @param {*} page
 * @returns
 */
export const limit = (limitOption) => {
	const limit =
		limitOption && parseInt(limitOption, 10) > 0
			? parseInt(limitOption, 10)
			: 10;

	return limit;
};

/**
 *
 * @param {*} pageOption
 * @returns
 */
export const page = (pageOption) => {
	const page =
		pageOption && parseInt(pageOption, 10) > 0 ? parseInt(pageOption, 10) : 1;

	return page;
};

/**
 *
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const skip = (page, limit) => {
	const skip = (page - 1) * limit;

	return skip;
};
