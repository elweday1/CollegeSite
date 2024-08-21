// @ts-nocheck
export default function (count, min, max) {
	const delta = max - min;
	return Array.from({ length: count }).map(() => Math.random() * delta + min);
}
