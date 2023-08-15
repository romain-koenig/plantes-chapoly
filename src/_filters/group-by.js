module.exports = function groupBy(array, key) {
	if (!array) {
		return {};
	}

	return array.reduce((accumulator, item) => {
		const group = item.data[key];
		accumulator[group] = accumulator[group] || [];
		accumulator[group].push(item);
		return accumulator;
	}, {});
};
