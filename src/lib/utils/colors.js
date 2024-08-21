// @ts-nocheck

import { myCustomTheme } from "$lib/../theme.js";

let RGB = myCustomTheme.properties["--color-primary-500"].split(" ");

const RGBAToHSLA = (r, g, b, alpha, amount) => {
	if (!amount) amount = 0;
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	let h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
	return [60 * h < 0 ? 60 * h + 360 : 60 * h, 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0), (100 * (2 * l - s)) / 2, alpha];
};



let hsla = (alpha, amount) => {
	if (!alpha) alpha = 1;
	if (!amount) amount = 0;
	let HSLA = RGBAToHSLA(...RGB, alpha, amount)
	return `hsla(${HSLA[0]+amount}, ${HSLA[1]}%, ${HSLA[2]}%, ${alpha})`;
};

let rgba = (alpha) => {
	if (!alpha) {
		alpha = 1;
	}
	return `rgba(${RGB.join(",")},${alpha})`;
};

let colorGradient = (colorVariance, count, alpha) => {
	let colors = [];
	for (let i = 0; i < count; i++) {
		colors.push(hsla(alpha, colorVariance * i));
	}
	return colors;
};

export const colors = {
	rgba: rgba,
	hsla: hsla,
	colorGradient,
};
