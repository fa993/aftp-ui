<script>
	import FileIcon from '../assets/file.svg';

	export var fe;
	export var path;
</script>

<div class="folder-item">
	<div class="folder-item-row">
		<img src={FileIcon} class="ficon" alt="file-icon" />
		<div class="folder-item-text">{fe.name}</div>
	</div>
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
