(_ => {
	const error = text => document.body.innerHTML = text;
	if (!window.location.search) return error("No Parameters");
	let url = (window.location.search.split("?ghdl=")[1] || "").split("?")[0];
	if (!url) return error("No URL!");
	url = url.startsWith("https://") || url.startsWith("http://") ? url : `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/${url}`;
	if (url.indexOf("raw.githubusercontent.com") == -1 && url.indexOf("github.io") == -1) return error(`<a>${url}</a> not a valid GitHub File URL!`);
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const objectURL = window.URL.createObjectURL(new Blob([this.response]));
			const tempLink = document.createElement("a");
			tempLink.href = objectURL;
			tempLink.download = url.split("/").pop();
			tempLink.click();
		}
	};
	xhttp.onerror = function() {error(`GitHub File <a>${url}</a> does not exist!`);};
	xhttp.open("GET", url, true);
	xhttp.send();
})();