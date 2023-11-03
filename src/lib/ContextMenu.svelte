<!-- 

Inspired From: 
"
Github @dukenmarga, July 2022
Context Menu is small menu that displayed when user right-click the mouse on browser.
Think of it as a way to show Refresh option on Microsoft Windows when right-click on desktop.
Known bug:
    - If the browser loads the content for the first time, showMenu set to false.
    Hence, we cannot get menu.h and menu.y dimension, since context menu has not been available at DOM.
    The first right click will not shown properly when right-click occurs around the edge (bottom part
    and right part) of the browser.

Inspired from: Context Menu https://svelte.dev/repl/3a33725c3adb4f57b46b597f9dade0c1?version=3.25.0
"
https://svelte.dev/repl/6fb90919e24942b2b47d9ad154386b0c?version=3.49.0

Possible Bug Fix: Loading the size in onMount to a reasonable default
Also Our Menu Items are dynamic, so a strategy which relies on remembering the menu
dims will fail because th new menu dims are not same as last
-->

<script>
	import { onMount } from 'svelte';
	import { menuItems } from './Menu';

	// pos is cursor position when right click occur
	let pos = { x: 0, y: 0 };
	// menu is dimension (height and width) of context menu
	let menu = { h: 0, w: 0 };
	// browser/window dimension (height and width)
	let browser = { h: 0, w: 0 };

	$: menuState = false;

	onMount(() => {
		// Setting the default to 200px seems reasonable
		let oH = Math.min(200, Math.floor(window.innerHeight / 4));
		let oW = Math.min(200, Math.floor(window.innerWidth / 4));

		menu = {
			h: oH,
			w: oW,
		};
	});

	function rightClickContextMenu(e) {
		if ($menuItems.length == 0 || menuState) {
			$menuItems = [];
			menuState = false;
			return;
		}
		e.preventDefault();
		menuState = true;
		browser = {
			w: window.innerWidth,
			h: window.innerHeight,
		};

		pos = {
			x: e.clientX ?? e.detail.x,
			y: e.clientY ?? e.detail.y,
		};
		// If bottom part of context menu will be displayed
		// after right-click, then change the position of the
		// context menu. This position is controlled by `top` and `left`
		// at inline style.
		// Instead of context menu is displayed from top left of cursor position
		// when right-click occur, it will be displayed from bottom left.
		if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
		if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
	}
	function onPageClick(e) {
		// To make context menu disappear when
		// mouse is clicked outside context menu
		$menuItems = [];
		menuState = false;
	}
	function getContextMenuDimension(node) {
		// This function will get context menu dimension
		// when navigation is shown => showMenu = true
		//will not work if the menu itself is dynamic

		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width,
		};
	}
</script>

{#if menuState}
	<nav
		use:getContextMenuDimension
		style="position: absolute; top:{pos.y}px; left:{pos.x}px"
	>
		<div class="navbar" id="navbar">
			<ul>
				{#each $menuItems as item}
					{#if item.name == 'hr'}
						<hr />
					{:else}
						<li>
							<button on:click={() => item.onClick?.()}
								>{item.displayText}</button
							>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:contextmenu={rightClickContextMenu} on:click={onPageClick} />

<style>
	* {
		padding: 0;
		margin: 0;
	}
	.navbar {
		display: inline-flex;
		border: 1px #999 solid;
		width: 170px;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		flex-direction: column;
	}
	.navbar ul {
		margin: 6px;
	}
	ul li {
		display: block;
		list-style-type: none;
		width: 1fr;
	}
	ul li button {
		color: #222;
		width: 100%;
		height: 30px;
		text-align: left;
		border: 0px;
		background-color: #fff;
	}
	ul li button:hover {
		color: #000;
		text-align: left;
		border-radius: 5px;
		background-color: #eee;
	}
	:global(ul li button.info:hover) {
		color: navy;
	}
	hr {
		border: none;
		border-bottom: 1px solid #ccc;
		margin: 5px 0px;
	}
</style>
