// @ts-nocheck
export default function (data, binCount) {
	if (!Array.isArray(data) || data.length === 0 || typeof binCount !== "number" || binCount <= 0) {
		return null;
	}

	const minValue = Math.min(...data);
	const maxValue = Math.max(...data);
	const binWidth = (maxValue - minValue) / binCount;

	const bins = Array.from({ length: binCount }, (_, index) => ({
		range: [minValue + index * binWidth, minValue + (index + 1) * binWidth],
		count: 0,
	}));

	data.forEach((value) => {
		const binIndex = Math.floor((value - minValue) / binWidth);
		if (binIndex >= 0 && binIndex < binCount) {
			bins[binIndex].count++;
		}
	});

	const resultBins = bins.map((bin) => `${bin.range[0].toFixed(0)} - ${bin.range[1].toFixed(0)}`);
	const resultCounts = bins.map((bin) => bin.count);

	return [resultBins, resultCounts];
}
