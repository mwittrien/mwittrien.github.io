window.DownloadApi = {
	converter: {
		library: _ => `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Library/0BDFDB.plugin.js`,
		plugin: arg => `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Plugins/${arg}/${arg}.plugin.js`,
		theme: arg => `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Themes/${arg}/${arg}.theme.css`,
		url: arg => arg = arg.startsWith("https://") || arg.startsWith("http://") ? arg : `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/${arg}`
	},
	download: (url, error) => {
		if (!url) return error && error("No URL!");
		if (url.indexOf("raw.githubusercontent.com") == -1 && url.indexOf("github.io") == -1) return error && error(`<a href="${url}">${url}</a> not a valid GitHub File URL!`);
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (this.status == 200) {
				const tempLink = document.createElement("a");
				tempLink.href = window.URL.createObjectURL(new Blob([this.response]));
				tempLink.download = url.split("/").pop();
				tempLink.click();
			}
			if (this.status == 404) error && error(`GitHub File <a href"${url}">${url}</a> does not exist!`);
		};
		xhttp.onerror = function() {error && error(`GitHub File <a href="${url}">${url}</a> does not exist!`);};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
};