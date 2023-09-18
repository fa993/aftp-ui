<script>
	// @ts-nocheck

	import AddIcon from './assets/add.svg';
	import FItemEntry from './lib/FItemEntry.svelte';
	import { onMount } from 'svelte';

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
		<center>
			<h1>
				Index of{' '}
				<div class="header">
					{fEntry.meta.name}
				</div>
			</h1>
		</center>
		<div class="fdisplay">
			<!-- <div className='ripple-target' /> -->
			<div class="aouter">
				<img src={AddIcon} class="aicon" alt="add-button" />
			</div>
		</div>
		<div>
			{#each fEntry.sub_entries as child_entry}
				<FItemEntry fe={child_entry} {path} />
			{/each}
		</div>
	{/await}
</main>

<style>
	.header {
		color: red;
		display: contents;
	}

	.fdisplay {
		margin-left: 20px;
	}

	.ripple-target {
		top: 20px;
		left: -5px;
		z-index: 2;
		position: relative;
		width: 0px;
		height: 0px;
		border-radius: 50%;
		border: 10px solid transparent;
		transition: border 2s ease-out 100ms;
	}

	.ripple-target:hover {
		border: 10px solid gray;
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
