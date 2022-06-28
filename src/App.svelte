<script>
	let version_number = "1.0"
	let time = new Date();
	let name = 'Harrison';
	let greeting;
	let hours = time.getHours();
	let gif;

	function updateVariables() {
		if (hours < 12 && hours >= 5) {
			greeting = 'Good Morning, ' + name;
			gif = 'backgrounds/morning.jpeg'
		} else if (hours < 18 && hours >= 12) {
			greeting = 'Good Afternoon, ' + name;
			gif = 'backgrounds/afternoon.gif'
		} else if (hours < 23 && hours >= 18) {
			greeting = 'Good Evening, ' + name;
			gif = 'backgrounds/evening.gif'
		} else {
			greeting = 'Good Night, ' + name;
			gif = 'backgrounds/night.gif'
		}
		document.body.style.backgroundImage = `url(${gif})`
	}

	updateVariables();

	setInterval(() => {
		time = new Date()
		updateVariables()
	}, 1000);

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
	}


</script>

<main>
	<div>
		<div id = "center_box">
			<h1 id="greeting">{greeting}</h1>
			<p>
				It's currently {time.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})} on {time.toLocaleDateString("en-GB", {weekday: "long",year: 	"numeric",month:"long",day:"2-digit"})}
			</p>
		<form role="search" id="search-form">
			<input type="search" id="query" name="q" placeholder="Search duckduckgo...">
			<button>Search</button>
		</form>
		<table>
			<tr>
				<td><a class=link href = "https://twitter.com/home">Twitter</a></td>
				<td><a class=link href = "https://www.youtube.com">YouTube</a></td>
				<td><a class=link href = "https://www.reddit.com">Reddit</a></td>
				<td><a class=link href = "https://github.com">GitHub</a></td>
			</tr>
		</table>

	</div>
	<a class = "footer_link" href="https://github.com/Harry55494/startpage">v{version_number}</a>
</div>

</main>


<style>

	@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap');

	:global(body) {
		padding-top: 200px;
		font-family: "Fira Code", serif;
		color: white;
		background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), center;
		background-size: auto 100%;
	}

	#center_box {
		min-height: 70%;
		min-width: 350px;
		padding: 20px;
		border-radius:30px;
		max-width: 40%;
		margin: 0 auto;
		text-align: center;
		background: linear-gradient( rgba(0, 0, 10, 0.6), rgba(0, 0, 10, 0.8))
	}

	#greeting {
		padding-top: 75px;
		font-size: 2em;
	}

	form {
		padding-top: 50px;
		padding-bottom: 50px;
	}

	input {
		min-width: 300px;
		margin-right: 5px;
	}

	table {
		margin-left: auto;
  		margin-right: auto;
		margin-bottom: 50px;
	}

	table td {
		padding: 20px;
	}

	.link {
		color: white;
	}

	.footer_link {
		color: white;
		text-align: right;
		width: 100%;
		float: right;
		right: 15px;
		bottom: 10px;
		position: fixed;
		opacity: 0.4;

	}

</style>