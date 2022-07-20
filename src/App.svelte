<script>
	import { settings, bookmarks } from './stores.js';
	import {get} from "svelte/store";
	import BackgroundParticles from "./BackgroundParticles.svelte";

	let version_number = "1.2.1"
	let time = new Date();
	let colorScheme;
	let particleColor;
	let settings_on_show = false;
	let greeting;
	let hours = time.getHours();

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		colorScheme = "dark";
	} else {
		colorScheme = "light";
	}

	let username;
	settings.subscribe(function(value) {
		username = value.name;
	});

	const updateStoreValue = (entry, new_value) => {
		settings.update(value => {
			value[entry] = new_value;
			return value;
		});
		console.log(get(settings));
	}

	// Function to act on the updated variables
	function updateVariables(check_color = true) {
		if (hours < 12 && hours >= 5) {
			greeting = 'Good Morning, ' + username;
		} else if (hours < 18 && hours >= 12) {
			greeting = 'Good Afternoon, ' + username;
		} else if (hours < 23 && hours >= 18) {
			greeting = 'Good Evening, ' + username;
		} else {
			greeting = 'Good Night, ' + username;
		}
		if (check_color){
			if (colorScheme === "dark") {
				particleColor = "rgba(255, 255, 255)";
				document.getElementById('canvas').style.backgroundColor = 'black';
				document.getElementById('settings_button').style.color = 'white';
				document.getElementById('version_number').style.color = 'white';
			} else {
				particleColor = "rgba(0, 0, 0)";
				document.getElementById('canvas').style.backgroundColor = 'white';
				document.getElementById('settings_button').style.color = 'black';
				document.getElementById('version_number').style.color = 'black';
			}
		}

	}

	updateVariables(false);

	// Update variables every second
	setInterval(() => {
		time = new Date()
		hours = time.getHours();
		updateVariables()
		if (username === null) {
			updateStoreValue('name', 'Guest')
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			if (event.matches) {
				colorScheme = "dark";
			} else {
				colorScheme = "light";
			}
			updateVariables();
		});
	}, 1000);

	// Show or Hide Settings pane
	function toggleSettings() {
		if (settings_on_show) {
			console.log('hiding settings')
			document.getElementById('main_window').style.display = 'block';
			document.getElementById('settings_window').style.display = 'none';
			document.getElementById('version_number').style.display = 'none';
			document.getElementById('settings_button').innerHTML = 'settings';
			settings_on_show = false;
		} else {
			console.log('showing settings')
			document.getElementById('main_window').style.display = 'none';
			document.getElementById('settings_window').style.display = 'block';
			document.getElementById('version_number').style.display = 'block';
			document.getElementById('settings_button').innerHTML = 'exit settings';

			settings_on_show = true;
		}
	}

	// Do these on window load, so that the elements are ready to be used
	window.onload = function(){
		updateVariables();
		const f = document.getElementById('search-form');
		const q = document.getElementById('query');
		const search_site = 'https://duckduckgo.com/?q=';

		function submitted(event) {
			event.preventDefault();
			window.location.href = search_site + q.value;
		}
		f.addEventListener('submit', submitted);
		document.getElementById('query').focus();

		const settings_name = document.getElementById('name');
		const settings_save = document.getElementById('settings_save');

		function settings_submitted(event) {
			event.preventDefault();
			updateStoreValue('name', settings_name.value);
			toggleSettings();
			console.log('settings saved');
			console.log(get(settings));
			window.location.reload();
		}
		settings_save.addEventListener('click', settings_submitted);
	}

</script>

<main>

	<BackgroundParticles particleColor={particleColor} />

	<div>
		<div class = "center_box" id = "main_window">
			<h1 class="greeting">{greeting}</h1>
			<p id = "time">
				It's currently {time.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})} on {time.toLocaleDateString("en-GB", {weekday: "long",year: 	"numeric",month:"long",day:"2-digit"})}
			</p>
		<form role="search" id="search-form">
			<input type="search" id="query" name="q" placeholder="Search duckduckgo...">
			<button>Search</button>
		</form>
		<table id = "links">
			<tr>
				{#each get(bookmarks) as bookmark}
					<td>
						<a class=link href={bookmark.url}>{bookmark.name}</a>
					</td>
				{/each}
			</tr>
		</table>
			{#if username === 'Friend'}
				<p>Tip - Click 'settings' in the bottom right to change your name</p>
			{/if}
		</div>

		<div class = "center_box" id = "settings_window">
			<h1 class="greeting">Settings</h1>
			<form id = "settings_form">
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" value="{username}">
			</form>
			<button id ="settings_save" style = "margin-top: 50px;">Save and Reload</button>
		</div>

	<footer>
		<a class = "footer_link" id = "version_number" href="https://github.com/Harry55494/startpage">v{version_number}</a>
		<p class = "footer_link" id = "settings_button" on:click={() => toggleSettings()}>settings</p>
	</footer>
</div>

</main>


<style>

	@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap');


	:global(body) {
		padding-top: 10%;
		font-family: "Fira Code", sans-serif;
		color: white;
		background-size: auto 100%;
	}

	.center_box {
		min-height: 70%;
		min-width: 350px;
		padding: 20px;
		max-width: 40%;
		margin: 0 auto;
		text-align: center;

		background: rgba( 0, 0, 0, 0.7 );
		backdrop-filter: blur( 4px );
		-webkit-backdrop-filter: blur( 4px );
		border-radius: 10px;
		border: 1px solid rgba( 255, 255, 255, 0.18 );
	}

	#settings_window {
		display: none;
	}

	.greeting {
		padding-top: 75px;
		font-size: 2em;
	}

	form {
		padding-top: 50px;
		padding-bottom: 50px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	input {
		min-width: 300px;
		margin-right: 15px;
		margin-left: 15px;
	}

	label {
		margin-right: 15px;
		margin-left: 15px;
		transform: translateY(8px);
	}

	table {
		margin-left: auto;
  		margin-right: auto;
		margin-bottom: 50px;
	}

	table td {
		padding: 20px;
	}

	footer {
		position: fixed;
		bottom: 10px;
		height: 25px;
		width: 99%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	footer a, footer p {
		margin: 0 10px;
	}

	#version_number {
		display: none;
	}

	.link {
		color: white;
	}

	.footer_link {
		color: white;
		opacity: 0.4;
	}

	.footer_link:hover {
		opacity: 0.8;
		text-decoration: underline;
	}

</style>