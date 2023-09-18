<script>
	import FileEntry from './FileEntry.svelte';
	import FolderEntry from './FolderEntry.svelte';
	export var fe;
	export var path;

	const fTypes = {
		Folder: FolderEntry,
		File: FileEntry,
	};
</script>

<svelte:component this={fTypes[fe.entry_type]} {fe} {path} />
