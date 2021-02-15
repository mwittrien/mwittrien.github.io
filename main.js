window.onload = function () {
	const error = text => document.body.innerHTML = text;
	if (!window.location.search) return error("No Parameters");
	let url = (window.location.search.split("?ghdl=")[1] || "").split("?")[0];
	if (!url) return error("No URL!");
	url = url.startsWith("https://") || url.startsWith("http://") ? url : `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/${url}`;
	if (url.indexOf("raw.githubusercontent.com") == -1 && url.indexOf("github.io") == -1) return error(`<a href="${url}">${url}</a> not a valid GitHub File URL!`);
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if (this.status == 200) {
			const tempLink = document.createElement("a");
			tempLink.href = window.URL.createObjectURL(new Blob([this.response]));
			tempLink.download = url.split("/").pop();
			tempLink.click();
		}
		if (this.status == 404) error(`GitHub File <a href"${url}">${url}</a> does not exist!`);
	};
	xhttp.onerror = function() {error(`GitHub File <a href="${url}">${url}</a> does not exist!`);};
	xhttp.open("GET", url, true);
	xhttp.send();
};