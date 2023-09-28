<script>
	export let fEntry;
</script>

<center>
	<h1>
		Contents of{' '}
		<div class="header">
			{fEntry.meta.name}
		</div>
	</h1>
</center>

<div class="contents">
	{fEntry.contents}
</div>

<style>
	.header {
		color: red;
		display: contents;
	}

	.contents {
		font-style: italic;
	}
</style>
