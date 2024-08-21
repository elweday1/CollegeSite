<script>
	import "../app.postcss";
	import { beforeUpdate } from "svelte";
	beforeUpdate(() => {
		let body = document.querySelector('body')
		body.setAttribute("data-theme", localStorage.getItem("theme") || "the-theme");
		const styles = getComputedStyle(body);
		const primaryColor = styles.getPropertyValue("--color-primary-500")
		localStorage.setItem("primaryColor", primaryColor)
	})

</script>


<slot/>

<style>
	:global(html) {
		font-size: 14px;
	}
</style>