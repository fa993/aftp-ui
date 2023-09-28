<script>
	import AddIcon from '../assets/add.svg';
	import FItemEntry from './FItemEntry.svelte';

	export let fEntry;
	export let path;
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
	<div class="aouter">
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
