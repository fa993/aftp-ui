<script>
	// @ts-nocheck

	import FileIcon from '../assets/file.svg';
	import FolderIcon from '../assets/folder.svg';
	import DownIcon from '../assets/down-arrow.svg';
	import RightIcon from '../assets/right-arrow.svg';
	import FItemEntry from './FItemEntry.svelte';

	import { baseURL, subpath } from './Constants';

	import { menuItems } from './Menu';

	export var fe;
	export var path;

	$: expanded = false;

	$: fChildrenPromise = new Promise(() => {});

	async function onExpand(e) {
		expanded = !expanded;
		if (expanded) {
			//reload
			const resp = await fetch(baseURL + '/api/' + path + '/' + fe.name);
			fChildrenPromise = resp.json();
		}
	}

	function onItemClick(e) {
		if (e.shiftKey) {
			window.location.pathname = subpath + '/raw/' + path + '/' + fe.name;
		} else {
			window.location.pathname = subpath + '/f/' + path + '/' + fe.name;
		}
	}

	function isFolder() {
		return fe.entry_type === 'Folder';
	}

	function onRightClick(e) {
		if ($menuItems.length != 0) {
			$menuItems = [];
		} else {
			$menuItems = [
				{
					displayText: 'Delete',
					onClick: async () => {
						await fetch(baseURL + '/api/' + path + '/' + fe.name, {
							method: 'DELETE',
						});
						window.location.pathname = window.location.pathname;
					},
				},
			];
		}
	}
</script>

{@debug fChildrenPromise}

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="folder-item">
	<div
		class="folder-item-row"
		on:click|stopPropagation={onItemClick}
		on:contextmenu={onRightClick}
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		{#if isFolder()}
			<img
				src={expanded ? DownIcon : RightIcon}
				class="ficon"
				on:click|stopPropagation={onExpand}
				alt=""
			/>
			<img src={FolderIcon} class="ficon" alt="folder-icon" />
		{:else}
			<img src={FileIcon} class="ficon" alt="file-icon" />
		{/if}

		<div class="folder-item-text">{fe.name}</div>
	</div>
	{#if isFolder() && expanded}
		{#await fChildrenPromise}
			<div>Loading...</div>
		{:then fChildren}
			{#each fChildren.sub_entries as child_entry}
				<div>
					<FItemEntry fe={child_entry} path={path + '/' + fe.name} />
				</div>
			{/each}
		{/await}
	{/if}
</div>

<style>
	.folder-item {
		margin-left: 20px;
	}

	.folder-item-row {
		display: flex;
		flex-direction: row;
		gap: 5px;
		margin-top: 5px;
		width: fit-content;
		cursor: pointer;
	}

	.folder-item-row:hover {
		text-decoration: underline;
	}

	.ficon {
		align-self: center;
	}
</style>
