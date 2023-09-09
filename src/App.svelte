<script>
	import { onMount } from 'svelte';
	$: pth = location.pathname;
	$: smt = '';
	onMount(async () => {
		const resp = await fetch('/api/' + location.pathname.substring(3));
		smt = await resp.text();
	});
</script>

{@debug pth}

<main>
	<div>{smt}</div>
</main>
