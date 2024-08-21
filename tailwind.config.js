import { join } from "path";
import { myCustomTheme } from "./src/theme.js";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { skeleton } from "@skeletonlabs/tw-plugin";
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}", join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")],
	theme: {
		extend: {
			transitionProperty: {
				height: "height",
			},
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [myCustomTheme],
				preset: ["skeleton", "modern", "crimson", "wintry", "gold-nouveau", "hamlindigo", "rocket", "sahara", "vintage", "seafoam"],
			},
		}),
	],
};
