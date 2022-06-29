<script>
	import { settings } from './stores.js';
	import {get} from "svelte/store";

	let version_number = "1.1"
	let time = new Date();

	let settings_on_show = false;

	let username;
	settings.subscribe(function(value) {
		username = value.name;
	});

	let greeting;
	let hours = time.getHours();
	let gif;

	function updateVariables() {
		if (hours < 12 && hours >= 5) {
			greeting = 'Good Morning, ' + username;
			gif = 'https://i.pinimg.com/originals/40/e6/7b/40e67b523c561b4a52c763413683ab99.jpg'
		} else if (hours < 18 && hours >= 12) {
			greeting = 'Good Afternoon, ' + username;
			gif = 'https://wallpaperaccess.com/full/785654.gif'
		} else if (hours < 23 && hours >= 18) {
			greeting = 'Good Evening, ' + username;
			gif = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F64%2F05%2F31%2F6405318ac146473a95bfbdcec2b32943.gif&f=1&nofb=1'
		} else {
			greeting = 'Good Night, ' + username;
			gif = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcutewallpaper.org%2F21%2F1920x1080-gif%2FPixel-GIF-on-GIFER-by-Arcaneseeker.gif&f=1&nofb=1'
		}
		document.body.style.backgroundImage = `url(${gif})`
	}

	updateVariables();

	const updateStoreValue = (entry, new_value) => {
		settings.update(value => {
			value[entry] = new_value;
			return value;
		});
		console.log(get(settings));
	}

	setInterval(() => {
		time = new Date()
		hours = time.getHours();
		updateVariables()
		if (username === null) {
			updateStoreValue('name', 'Guest')
		}
	}, 1000);

	function toggleSettings() {
		if (settings_on_show) {
			console.log('hiding settings')
			document.getElementById('main_window').style.display = 'block';
			document.getElementById('settings_window').style.display = 'none';
			settings_on_show = false;
		} else {
			console.log('showing settings')
			document.getElementById('main_window').style.display = 'none';
			document.getElementById('settings_window').style.display = 'block';
			settings_on_show = true;
		}
	}

	window.onload = function(){
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
		}
		settings_save.addEventListener('click', settings_submitted);

	}


</script>

<main>

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
				<td><a class=link href = "https://twitter.com/home">Twitter</a></td>
				<td><a class=link href = "https://www.youtube.com">YouTube</a></td>
				<td><a class=link href = "https://www.reddit.com">Reddit</a></td>
				<td><a class=link href = "https://github.com">GitHub</a></td>
			</tr>
		</table>
		</div>

		<div class = "center_box" id = "settings_window">
			<h1 class="greeting">Settings</h1>
			<form id = "settings_form">
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" value="{username}">
			</form>
			<button id ="settings_save" style = "margin-top: 50px;">Save</button>
		</div>

	<footer>
		<p class = "footer_link" on:click={() => toggleSettings()}>settings</p>
		<a class = "footer_link" href="https://github.com/Harry55494/startpage">v{version_number}</a>
	</footer>
</div>

</main>


<style>

	@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap');

	:global(body) {
		padding-top: 200px;
		font-family: "Fira Code", sans-serif;
		color: white;
		background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)), center;
		background-size: auto 100%;
	}

	.center_box {
		min-height: 70%;
		min-width: 350px;
		padding: 20px;
		border-radius:30px;
		max-width: 40%;
		margin: 0 auto;
		text-align: center;
		background: linear-gradient( rgba(0, 0, 10, 0.6), rgba(0, 0, 10, 0.8))
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