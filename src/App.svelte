<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Index from './lib/Index.svelte';
	import Contents from './lib/Contents.svelte';

	$: path = location.pathname.substring(3);

	$: fEntryPromise = new Promise(() => {});

	onMount(async () => {
		let paths = path.split('/');
		if (paths.length > 2) {
			if (paths[paths.length - 1] != '') {
				document.title = paths[paths.length - 1];
			} else {
				document.title = paths[paths.length - 2];
			}
		} else {
			document.title = 'Index';
		}
		const resp = await fetch('/api/' + path);
		fEntryPromise = resp.json();
	});
</script>

<main>
	{#await fEntryPromise then fEntry}
		{#if fEntry.entry_type === 'Folder'}
			<Index {fEntry} {path} />
		{:else if fEntry.entry_type === 'File'}
			<Contents {fEntry} {path} />
		{:else}
			<h1>Unrecognized Item Type</h1>
		{/if}
	{/await}
</main>
