window.onload = function () {
	const error = text => document.body.innerHTML = text;
	if (!window.location.search) error("No Parameters");
	else for (let parameter in window.DownloadApi.converter) {
		let arg = (window.location.search.split(`?${parameter}=`)[1] || "").split("?")[0] || "";
		if (arg) {
			window.DownloadApi.download(window.DownloadApi.converter[parameter](arg), error);
			break;
		}
	}
};