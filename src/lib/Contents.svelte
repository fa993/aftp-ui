<script>
	import { onMount } from 'svelte';
	import { baseURL } from './Constants';

	export let fEntry;
	export let path;

	$: contentPromise = new Promise(() => {});

	onMount(() => {
		contentPromise = fetch(baseURL + '/collab/' + path + '/').then((t) =>
			t.json()
		);
	});
</script>

{@debug contentPromise}

<center>
	<h1>
		Contents of{' '}
		<div class="header">
			{fEntry.meta.name}
		</div>
	</h1>
</center>

{#await contentPromise then contentEntry}
	<div class="contents">
		{contentEntry.contents}
	</div>
{/await}

<style>
	.header {
		color: red;
		display: contents;
	}

	.contents {
		font-style: italic;
	}
</style>
