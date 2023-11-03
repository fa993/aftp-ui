<script>
	import AddIcon from '../assets/add.svg';
	import FItemEntry from './FItemEntry.svelte';
	import { menuItems } from './Menu';

	export let fEntry;
	export let path;

	function addFEntry(e) {
		//show context menu with 2 options
		// we shall use stores
		if (e.button == 2 || $menuItems.length != 0) {
			$menuItems = [];
		} else {
			$menuItems = [
				{
					displayText: 'Add File',
				},
				{
					name: 'hr',
				},
				{
					displayText: 'Add Folder',
				},
			];
		}

		let node = e.target;
		let buttonY =
			node.getBoundingClientRect().y +
			window.scrollY +
			node.getBoundingClientRect().height;
		let buttonX =
			node.getBoundingClientRect().x +
			window.scrollX +
			node.getBoundingClientRect().width;

		window.dispatchEvent(
			new CustomEvent('contextmenu', {
				bubbles: true,
				detail: {
					x: buttonX ?? e.clientX,
					y: buttonY ?? e.clientY,
				},
			})
		);
	}
</script>

<center>
	<h1>
		Index of{' '}
		<div class="header">
			{fEntry.meta.name}
		</div>
	</h1>
</center>
<div class="fdisplay">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="aouter" on:click|preventDefault|stopPropagation={addFEntry}>
		<img src={AddIcon} class="aicon" alt="add-button" />
	</div>
</div>
<div>
	{#each fEntry.sub_entries as child_entry}
		<FItemEntry fe={child_entry} {path} />
	{/each}
</div>

<style>
	.header {
		color: red;
		display: contents;
	}

	.fdisplay {
		margin-left: 20px;
	}

	.aouter {
		top: 0px;
		left: 0px;
		position: relative;
		z-index: 3;
		display: flex;
		width: fit-content;
	}

	.aicon {
		align-self: center;
		border-radius: 20%;
		padding: 2px;
	}

	.aicon:hover {
		background-color: rgb(218, 218, 218);
	}
</style>
