(_ => {
	const isMobile = _ => {
		let isM = false;
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isM = true;
		document.documentElement.classList[isM ? "add" : "remove"]("mobile");
		if (!isM) {
			document.documentElement.classList.remove("sidebar-hidden");
			document.documentElement.classList.remove("portrait");
		}
		else document.documentElement.classList[window.innerHeight > window.innerWidth ? "add" : "remove"]("portrait");
		return isM;
	};
	isMobile();
	window.addEventListener("resize", isMobile);
	window.onload = function () {
		const getRects = node => {
			return Node.prototype.isPrototypeOf(node) && node.nodeType != Node.TEXT_NODE ? node.getBoundingClientRect() : {};
		};
		const createElement = html => {
			if (typeof html != "string" || !html.trim()) return null;
			const template = document.createElement("template");
			try {template.innerHTML = html.replace(/(?<!pre)>[\t\r\n]+<(?!pre)/g, "><");}
			catch (err) {template.innerHTML = html.replace(/>[\t\r\n]+<(?!pre)/g, "><");}
			if (template.content.childNodes.length == 1) return template.content.firstElementChild || template.content.firstChild;
			else {
				const wrapper = document.createElement("span");
				const nodes = Array.from(template.content.childNodes);
				while (nodes.length) wrapper.appendChild(nodes.shift());
				return wrapper;
			}
		};
		const toggleElement = (node, force) => {
			let hide = force === undefined ? getComputedStyle(node, null).getPropertyValue("display") != "none" : !force;
			if (hide) node.style.setProperty("display", "none", "important");
			else node.style.removeProperty("display");
		};
		const formatClassName = (...classes) => {
			return [...new Set(classes.flat(10).filter(n => n).join(" ").split(" "))].join(" ").trim();
		};

		const appendModal = (modal, config = {}) => {
			let modals = document.querySelector(".modals");
			if (!modals || !Node.prototype.isPrototypeOf(modal)) return;

			const wrapper = createElement(`<div class="modal-wrapper"><div class="backdrop"></div></div>`);
			const backdrop = wrapper.querySelector(".backdrop");

			backdrop.addEventListener("click", _ => {
				wrapper.remove();
				if (typeof config.onClose == "function") config.onClose();
			});
			wrapper.appendChild(modal);
			modals.appendChild(wrapper);
			return wrapper;
		};

		const createSpinner = wrap => {
			return createElement(`${wrap ? '<div class="spinner-container">' : ''}<span class="spinner"><span class="spinner-inner"><span class="spinner-item"></span><span class="spinner-item"></span></span></span>${wrap ? '</div>' : ''}`);
		};

		const createSwitch = (config = {}) => {
			const switchEle = createElement(`<div class="${formatClassName("switch", config.checked && "switch-checked", config.disabled && "switch-disabled")}"><input type="checkbox" class="switch-checkbox"></div>`);
			switchEle.addEventListener("click", _ => {
				let checked = !switchEle.classList.contains("switch-checked");
				switchEle.classList.toggle("switch-checked");
				if (typeof config.onChange == "function") config.onChange(checked);
			});
			return switchEle;
		};

		const createButton = (config = {}) => {
			const button = createElement(`<button type="button" class="${formatClassName(config.className, "button", config.color ? "button-" + config.color : "button-brand", config.size == "none" ? "" : (config.size ? "button-size-" + config.size : "button-size-small"))}">
				<div class="button-contents">${config.contents}</div>
			</button>`);
			if (typeof config.onClick == "function") button.addEventListener("click", config.onClick);
			return button;
		};

		const createInvite = (data = {}) => {
			const invite = createElement(`<div class="invite">
				<div class="invite-header">${data.header || ""}</div>
				<div class="invite-content">
					<div class="invite-icon" tabindex="0" role="button" style="background-image: url(${data.icon});"></div>
					<div class="invite-info">
						<div class="invite-name">${data.name || ""}</div>
						<strong class="invite-details">${data.details || ""}</strong>
					</div>
				</div>
			</div>`);
			invite.querySelector(".invite-content").appendChild(createButton({
				contents: "Join",
				className: "invite-button",
				color: "green",
				size: "none",
				onClick: _ => {
					data.invite && window.open(`https://discord.com/invite/${data.invite}`, "_blank");
				}
			}));
			return invite;
		};

		const createTooltip = (anker, text, config = {}) => {
			let itemLayerContainer = document.querySelector(".layer-items");
			if (!itemLayerContainer) return;
			let itemLayer = createElement(`<div class="layer-item layer-item-disabled">
				<div class="tooltip">
					<div class="tooltip-pointer"></div>
					<div class="tooltip-content"></div>
				</div>
			</div>`);
			itemLayerContainer.appendChild(itemLayer);

			let tooltip = itemLayer.firstElementChild;
			let tooltipContent = itemLayer.querySelector(".tooltip-content");
			let tooltipPointer = itemLayer.querySelector(".tooltip-pointer");

			if (config.id) tooltip.id = config.id.split(" ").join("");
			let type = config.type || "top";
			tooltip.classList.add(`tooltip-${type}`);
			tooltip.classList.add(config.color ? `tooltip-${config.color}` : "tooltip-primary");

			let mouseMove = e => {
				let parent = e.target.parentElement.querySelector(":hover");
				if (parent && anker != parent && !anker.contains(parent)) itemLayer.removeTooltip();
			};
			let mouseLeave = e => {itemLayer.removeTooltip();};
			document.addEventListener("mousemove", mouseMove);
			document.addEventListener("mouseleave", mouseLeave);

			let observer = new MutationObserver(changes => changes.forEach(change => {
				let nodes = Array.from(change.removedNodes);
				if (nodes.indexOf(itemLayer) > -1 || nodes.indexOf(anker) > -1 || nodes.some(n => n.contains(anker))) itemLayer.removeTooltip();
			}));
			observer.observe(document.body, {subtree: true, childList: true});

			(tooltip.setText = itemLayer.setText = newText => {
				if (config.html) tooltipContent.innerHTML = newText;
				else tooltipContent.innerText = newText;
			})(text);
			(tooltip.removeTooltip = itemLayer.removeTooltip = _ => {
				document.removeEventListener("mousemove", mouseMove);
				document.removeEventListener("mouseleave", mouseLeave);
				itemLayer.remove();
				observer.disconnect();
			});
			(tooltip.update = itemLayer.update = newText => {
				if (newText) tooltip.setText(newText);
				let left, top;
				const tRects = getRects(anker);
				const iRects = getRects(itemLayer);
				const aRects = getRects(document.querySelector(".app-mount"));
				const positionOffsets = {height: 10, width: 10};
				const offset = typeof config.offset == "number" ? config.offset : 0;
				switch (type) {
					case "top":
						top = tRects.top - iRects.height - positionOffsets.height + 2 - offset;
						left = tRects.left + (tRects.width - iRects.width) / 2;
						break;
					case "bottom":
						top = tRects.top + tRects.height + positionOffsets.height - 2 + offset;
						left = tRects.left + (tRects.width - iRects.width) / 2;
						break;
					case "left":
						top = tRects.top + (tRects.height - iRects.height) / 2;
						left = tRects.left - iRects.width - positionOffsets.width + 2 - offset;
						break;
					case "right":
						top = tRects.top + (tRects.height - iRects.height) / 2;
						left = tRects.left + tRects.width + positionOffsets.width - 2 + offset;
						break;
					}

				itemLayer.style.setProperty("top", `${top}px`, "important");
				itemLayer.style.setProperty("left", `${left}px`, "important");

				tooltipPointer.style.removeProperty("margin-left");
				tooltipPointer.style.removeProperty("margin-top");
				if (type == "top" || type == "bottom") {
					if (left < 0) {
						itemLayer.style.setProperty("left", "5px", "important");
						tooltipPointer.style.setProperty("margin-left", `${left - 10}px`, "important");
					}
					else {
						const rightMargin = aRects.width - (left + iRects.width);
						if (rightMargin < 0) {
							itemLayer.style.setProperty("left", `${aRects.width - iRects.width - 5}px`, "important");
							tooltipPointer.style.setProperty("margin-left", `${-1*rightMargin}px`, "important");
						}
					}
				}
				else if (type == "left" || type == "right") {
					if (top < 0) {
						itemLayer.style.setProperty("top", "5px", "important");
						tooltipPointer.style.setProperty("margin-top", `${top - 10}px`, "important");
					}
					else {
						const bottomMargin = aRects.height - (top + iRects.height);
						if (bottomMargin < 0) {
							itemLayer.style.setProperty("top", `${aRects.height - iRects.height - 5}px`, "important");
							tooltipPointer.style.setProperty("margin-top", `${-1*bottomMargin}px`, "important");
						}
					}
				}
			})();

			return itemLayer;
		};

		const createLoadingList = (url, config = {}) => {
			const header = createElement(`<div class="header"></div>`);
			const list = createElement(`<div></div>`);
			header.update = amount => {
				let hadFocus = document.activeElement && header.querySelector("input") == document.activeElement;
				while (header.childElementCount) header.firstElementChild.remove();
				const children = [typeof config.getHeader == "function" ? config.getHeader(amount) : config.getHeader].flat(10).filter(n => n);
				for (const child of children) header.appendChild(typeof child == "string" ? createElement(`<span>${child}</span>`) : child);
				if (hadFocus) {
					let input = header.querySelector("input");
					if (input) input.focus();
				}
			};
			list.update = _ => {
				try {
					if (config.className) list.classList.add(config.className);
					while (list.childElementCount) list.firstElementChild.remove();
					const children = [typeof config.getChildren == "function" ? config.getChildren(createLoadingList.cache[url]) : config.getChildren].flat(10).filter(n => n);
					for (const child of children) list.appendChild(typeof child == "string" ? createElement(`<span>${child}</span>`) : child);
					header.update(children.length);
				}
				catch (err) {console.error("Error:", err);}
			};

			list.appendChild(createSpinner(true));
			header.update(0);

			if (createLoadingList.cache[url]) list.update();
			else {
				const xhttp = new XMLHttpRequest();
				xhttp.onload = function() {
					createLoadingList.cache[url] = this.response;
					list.update();
				};
				xhttp.open("GET", url);
				xhttp.send();
			}

			return [header, list];
		};
		createLoadingList.cache = {};
		const createAddonList = (type, ending) => {
			let [header, list] = createLoadingList(`https://mwittrien.github.io/BetterDiscordAddons/${type}/README.md`, {
				className: "addon-list",
				getHeader: amount => {
					const search = createElement(`<div class="addon-list-search search">
						<div class="search-inner">
							<input class="search-input" placeholder="Search" value="">
							<div class="search-icon-layout" tabindex="-1" role="button">
								<div class="search-icon-container">
									<svg class="search-icon search-icon-mag" aria-label="Search" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"/></svg>
									<svg class="search-icon search-icon-clear" aria-label="Close" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
								</div>
							</div>
						</div>
					</div>`);
					const input = search.querySelector(".search-input");
					const icon = search.querySelector(".search-icon-layout");
					const mag = search.querySelector(".search-icon-mag");
					const clear = search.querySelector(".search-icon-clear");

					input.value = createAddonList.search[type] || "";

					const updateSearch = newSearch => {
						if (newSearch !== undefined) {
							createAddonList.search[type] = newSearch;
							input.value = newSearch;
							list.update();
						}
						let hasSearch = createAddonList.search[type] && createAddonList.search[type].length > 0;
						icon.classList[hasSearch ? "add" : "remove"]("search-icon-layout-clear");
						mag.classList[!hasSearch ? "add" : "remove"]("search-icon-visibile");
						clear.classList[hasSearch ? "add" : "remove"]("search-icon-visibile");
					};
					let timeout;
					input.addEventListener("input", _ => {
						clearTimeout(timeout);
						timeout = setTimeout(_ => updateSearch(input.value), 1500);
					});
					clear.addEventListener("click", _ => {
						updateSearch("");
					});
					updateSearch();
					return [createElement(`<div class="addon-list-title">${type} - ${amount}</div>`), search];
				},
				getChildren: response => response.split("- [").splice(1).map(n => {
					let m = n.split("](");
					let l = m[1].split(") - ");
					let fileName = l[0].split("/").pop();
					let name = (m[0] || "").trim();
					let description = (l[1] || "").trim();
					return name && (!createAddonList.search[type] || [name, description].filter(n => n).some(s => s.toLowerCase().indexOf(createAddonList.search[type].toLowerCase()) > -1)) && createAddonCard({
						name: name,
						description: description,
						icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="${type == "Plugins" ? "m 11.470703,0.625 c -1.314284,0 -2.3808593,1.0666594 -2.3808592,2.3808594 V 4.4335938 H 5.2792969 c -1.0476168,0 -1.8945313,0.85855 -1.8945313,1.90625 v 3.6191406 h 1.4179688 c 1.41905,0 2.5722656,1.1512126 2.5722656,2.5703126 0,1.4191 -1.1532156,2.572266 -2.5722656,2.572265 H 3.375 v 3.619141 c 0,1.0477 0.8566801,1.904297 1.9042969,1.904297 h 3.6191406 v -1.427734 c 0,-1.4189 1.1532235,-2.572266 2.5722655,-2.572266 1.41905,0 2.570313,1.153366 2.570313,2.572266 V 20.625 h 3.61914 c 1.047626,0 1.90625,-0.856597 1.90625,-1.904297 v -3.810547 h 1.427735 c 1.314292,0 2.380859,-1.066559 2.380859,-2.380859 0,-1.3143 -1.066567,-2.38086 -2.380859,-2.380859 H 19.566406 V 6.3398438 c 0,-1.0477002 -0.858624,-1.90625 -1.90625,-1.90625 H 13.851562 V 3.0058594 c 0,-1.3142 -1.066568,-2.3808594 -2.380859,-2.3808594 z" : "m 14.69524,1.9999881 c -0.17256,0 -0.34519,0.065 -0.47686,0.1969 L 8.8655531,7.5498683 16.449675,15.134198 21.802502,9.7812182 c 0.26333,-0.2633 0.26333,-0.6904 0,-0.9537 L 20.7902,7.8168183 c -0.22885,-0.2289 -0.58842,-0.2633 -0.85606,-0.081 l -2.127134,1.4452499 1.437076,-2.1418399 c 0.17949,-0.2675 0.14486,-0.6251001 -0.083,-0.8528001 l -2.195488,-2.19433 c -0.20264,-0.2026 -0.51169,-0.2562 -0.7698,-0.1318 l -0.37921,0.1839 0.18228,-0.4036001 c 0.11521,-0.2555 0.0599,-0.5553 -0.13834,-0.7535 l -0.68843,-0.6901 c -0.131639,-0.13172 -0.30429,-0.19701 -0.476854,-0.19701 z M 7.8695308,8.5459582 6.3201566,10.095378 c -0.126449,0.1264 -0.196927,0.298 -0.196927,0.4769 0,0.1788 0.07043,0.3505 0.196927,0.4769 l 1.469627,1.46967 c 0.283151,0.2832 0.421272,0.6744 0.377578,1.07255 -0.04365,0.3979 -0.264001,0.7495 -0.602173,0.9651 -4.3184212,2.75283 -4.720939,3.15533 -4.853187,3.28763 -0.9493352,0.9493 -0.9493352,2.494471 0,3.443871 0.9502793,0.9503 2.4954759,0.9484 3.4437772,0 0.132338,-0.1323 0.534965,-0.535 3.2875378,-4.853321 0.215049,-0.3374 0.5670574,-0.5568 0.9651044,-0.6006 0.399307,-0.044 0.790042,0.094 1.072518,0.376 l 1.469626,1.46967 c 0.26328,0.2633 0.69043,0.2633 0.95371,0 l 1.549374,-1.54942 z M 4.4762059,18.571608 c 0.243902,0 0.487705,0.092 0.673783,0.2783 0.3722,0.3722 0.3722,0.975401 0,1.347601 -0.3722,0.3722 -0.97541,0.3722 -1.3475649,0 -0.3722,-0.3722 -0.3722,-0.975401 0,-1.347601 0.1861,-0.1861 0.42988,-0.2783 0.6737819,-0.2783 z"}"/></svg>`,
						resourceUrl: `https://mwittrien.github.io/BetterDiscordAddons/${type}/${fileName}/_res`,
						websiteUrl: `https://github.com/mwittrien/BetterDiscordAddons/tree/master/${type}/${fileName}`,
						sourceUrl: `https://mwittrien.github.io/BetterDiscordAddons/${type}/${fileName}/${fileName}${ending}`,
						download: `?${type.toLowerCase().slice(0, -1)}=${l[0].split("/").pop()}`
					});
				}).filter(n => n)
			});
			return [header, list];
		};
		createAddonList.search = {};
		const createLibraryEntry = _ => {
			return createLoadingList("https://mwittrien.github.io/BetterDiscordAddons/Library/README.md", {
				className: "addon-list",
				getHeader: "Required Library",
				getChildren: response => {
					let parsedResponse = response.trim().replace(/\r/g, "");
					let fileName = (parsedResponse.split(" -")[0] || "").replace("# ", "").trim();
					return createAddonCard({
						name: fileName,
						description: (parsedResponse.split("\n").pop() || "").trim(),
						icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m 7.3125,2.625 c -0.3238672,0 -0.5859375,0.2620703 -0.5859375,0.5859375 V 14.929687 c 0,0.323868 0.2620703,0.585938 0.5859375,0.585938 2.710313,0 3.840547,1.498711 4.101563,1.914062 V 3.9905599 C 10.603047,3.3127865 9.3007813,2.625 7.3125,2.625 Z M 4.96875,3.796875 c -0.3238672,0 -0.5859375,0.2620703 -0.5859375,0.5859375 V 17.273437 c 0,0.323868 0.2620703,0.585938 0.5859375,0.585938 h 5.30599 C 9.9465755,17.461602 9.0865625,16.6875 7.3125,16.6875 c -0.9692969,0 -1.7578125,-0.788516 -1.7578125,-1.757813 V 3.796875 Z m 9.375,0 c -0.662031,0 -1.266641,0.2287891 -1.757812,0.6005859 V 18.445312 c 0,-0.323281 0.262656,-0.585937 0.585937,-0.585937 h 5.859375 c 0.323868,0 0.585937,-0.26207 0.585937,-0.585938 V 4.3828125 c 0,-0.3238672 -0.262069,-0.5859375 -0.585937,-0.5859375 z M 2.5859375,4.96875 C 2.2620703,4.96875 2,5.2308203 2,5.5546875 V 19.617187 c 0,0.323868 0.2620703,0.585938 0.5859375,0.585938 H 9.171224 c 0.2420313,0.68207 0.892995,1.171875 1.656901,1.171875 h 2.34375 c 0.763906,0 1.414831,-0.489805 1.656901,-1.171875 h 6.585286 C 21.73793,20.203125 22,19.941055 22,19.617187 V 5.5546875 C 22,5.2308203 21.73793,4.96875 21.414062,4.96875 h -0.585937 v 12.304687 c 0,0.969297 -0.827578,1.757813 -1.796875,1.757813 H 13.656901 C 13.41487,19.71332 12.763907,20.203125 12,20.203125 c -0.763906,0 -1.414831,-0.489805 -1.656901,-1.171875 H 4.96875 c -0.9692968,0 -1.796875,-0.788516 -1.796875,-1.757813 V 4.96875 Z"/></svg>`,
						resourceUrl: "https://mwittrien.github.io/BetterDiscordAddons/Library/_res",
						websiteUrl: "https://github.com/mwittrien/BetterDiscordAddons/tree/master/Library",
						sourceUrl: `https://mwittrien.github.io/BetterDiscordAddons/Library/0${fileName}.plugin.js`,
						download: "?library"
					});
				}
			});
		};
		const createAddonCard = addon => {
			let card = createElement(`<div class="addon-card">
				<div class="addon-header">
					<div class="addon-cover-wrapper"></div>
					<div class="addon-icon-wrapper">
						<div class="addon-icon">${addon.icon}</div>
					</div>
				</div>
				<div class="addon-info">
					<div class="addon-title">
						<div class="addon-name">${addon.name}</div>
					</div>
					<div class="addon-description scroller dark thin fade">${addon.description}</div>
					<div class="addon-controls">
						<div class="addon-links"></div>
						<div class="addon-buttons"></div>
					</div>
				</div>
			</div>`);

			let headerEle = card.querySelector(".addon-header");
			let linksEle = card.querySelector(".addon-links");
			let buttonsEle = card.querySelector(".addon-buttons");

			if (addon.resourceUrl) {
				if (!createAddonCard.cache[addon.resourceUrl]) createAddonCard.cache[addon.resourceUrl] = {};

				const addCover = _ => {
					if (createAddonCard.cache[addon.resourceUrl].cover.status != 200 || !createAddonCard.cache[addon.resourceUrl].cover.url) return;
					headerEle.classList.add("has-screenshots");
					let coverWrapper = headerEle.querySelector(".addon-cover-wrapper");
					while (coverWrapper.childElementCount) coverWrapper.firstElementChild.remove();
					coverWrapper.appendChild(createElement(`<img class="addon-cover" src="${createAddonCard.cache[addon.resourceUrl].cover.url}" alt="">`));
				};
				if (createAddonCard.cache[addon.resourceUrl].cover) addCover();
				else {
					const types = ["png", "gif"];
					const checkCoverUrl = _ => {
						const type = types.shift();
						if (!type) createAddonCard.cache[addon.resourceUrl].cover = {status: 404};
						else {
							const xhttp = new XMLHttpRequest();
							const url = `${addon.resourceUrl}/cover.${type}`;
							xhttp.onload = function() {
								if (this.status == 200) {
									createAddonCard.cache[addon.resourceUrl].cover = {status: this.status, url: url};
									if (document.contains(headerEle)) addCover();
								}
								else checkCoverUrl();
							};
							xhttp.open("GET", url);
							xhttp.send();
						}
					};
					checkCoverUrl();
				}

				const addScreenshotsButton = _ => {
					if (createAddonCard.cache[addon.resourceUrl].screenshots.status != 200) return;
					headerEle.appendChild(createElement(`<div class="addon-screenshots"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m 6.4994245,0.9996277 c -1.3780784,0 -2.5000823,1.122003 -2.5000823,2.500082 V 14.500072 c 0,1.378078 1.1220017,2.500082 2.5000823,2.500082 H 21.499917 C 22.877989,17.000154 24,15.878152 24,14.500072 V 3.4997097 c 0,-1.378078 -1.122,-2.500082 -2.500083,-2.500082 z m 0,2.000066 H 21.499917 c 0.27602,0 0.500006,0.223999 0.500006,0.500016 V 10.599553 L 18.841627,6.9119317 c -0.335019,-0.393022 -0.82081,-0.603254 -1.34184,-0.615254 -0.518029,0.003 -1.003965,0.232854 -1.335982,0.630879 l -3.713013,4.4591323 -1.210978,-1.207071 c -0.684039,-0.6840423 -1.7975092,-0.6840423 -2.4805497,0 L 5.999408,12.939473 V 3.4997097 c 0,-0.276015 0.224001,-0.500016 0.5000165,-0.500016 z m 2.5000822,1.000033 c -1.1030635,0 -2.0000658,0.897002 -2.0000658,2.000065 0,1.103064 0.8970023,2.000066 2.0000658,2.000066 1.1030633,0 2.0000653,-0.897002 2.0000653,-2.000066 0,-1.103063 -0.897002,-2.000065 -2.0000653,-2.000065 z M 2.4992929,7.9314967 0.07343181,16.029419 C -0.23858614,17.220487 0.4722125,18.45635 1.665281,18.785369 L 17.12868,22.92613 c 0.193009,0.04992 0.38618,0.07424 0.576192,0.07424 0.996058,0 1.907165,-0.660779 2.16218,-1.634827 l 0.90042,-2.865342 H 6.2494162 c -1.6010916,0 -3.0241024,-1.024778 -3.5411321,-2.550865 L 2.6731251,15.834092 C 2.5511162,15.430068 2.4992959,15.090089 2.4992959,14.750071 Z"/></svg></div>`));
					headerEle.classList.add("has-screenshots");
					createAddonCard.cache[addon.resourceUrl].screenshots.urls.push(`${addon.resourceUrl}/screenshot1.png`);
				};
				if (createAddonCard.cache[addon.resourceUrl].screenshots) addScreenshotsButton();
				else {
					const xhttp = new XMLHttpRequest();
					const url = `${addon.resourceUrl}/screenshot1.png`;
					xhttp.onload = function() {
						createAddonCard.cache[addon.resourceUrl].screenshots = {status: this.status, fetched: false, urls: []};
						if (document.contains(headerEle)) addScreenshotsButton();
					};
					xhttp.open("GET", url);
					xhttp.send();
				}

				headerEle.addEventListener("click", _ => {
					if (!createAddonCard.cache[addon.resourceUrl].cover || !createAddonCard.cache[addon.resourceUrl].screenshots || !createAddonCard.cache[addon.resourceUrl].cover.url && !createAddonCard.cache[addon.resourceUrl].screenshots.urls.length) return;
					const appMount = document.querySelector(".app-mount");
					const openScreenshots = _ => {
						const urls = [...new Set([createAddonCard.cache[addon.resourceUrl].cover.url, createAddonCard.cache[addon.resourceUrl].screenshots.urls].flat(10).filter(n => n))];
						const images = {};

						const imageModal = createElement(`<div class="screenshots">
							<div class="screenshot previous"><img src="" alt=""></div>
							<div class="screenshot current"><img src="" alt=""></div>
							<div class="screenshot next"><img src="" alt=""></div>
						</div>`);
						const previous = imageModal.querySelector(".previous");
						const current = imageModal.querySelector(".current");
						const next = imageModal.querySelector(".next");

						let i = 0;
						const switchImages = offset => {
							offset = Math.round(offset);
							if (isNaN(offset) || !urls[i + offset]) return;
							i += offset;
							loadImage(previous, urls[i-  1]);
							loadImage(current, urls[i]);
							loadImage(next, urls[i + 1]);
						};
						const loadImage = (screenshot, url) => {
							toggleElement(screenshot, url);
							if (url) {
								if (images[url]) setImage(screenshot, url);
								else {
									let loadingIcon = createSpinner(true);
									let image =	screenshot.firstElementChild;
									screenshot.appendChild(loadingIcon);
									image.remove();

									let img = new Image();
									img.onload = function() {
										if (!document.contains(imageModal)) return;
										loadingIcon.remove();
										screenshot.appendChild(image);
										images[url] = {width: this.width, height: this.height};
										setImage(screenshot, url);
									};
									img.src = url;
								}
							}
							else {
								screenshot.style.removeProperty("width");
								screenshot.style.removeProperty("height");
								screenshot.firstElementChild.src = "";
							}
						};
						const setImage = (screenshot, url) => {
							const aRects = getRects(appMount);
							const ratio = Math.min(isMobile() ? 100 : 1, (aRects.width * 0.8 - 20) / images[url].width, (aRects.height - 100) / images[url].height);
							const width = Math.round(ratio * images[url].width);
							const height = Math.round(ratio * images[url].height);
							screenshot.style.setProperty("width", `${width}px`);
							screenshot.style.setProperty("height", `${height}px`);
							screenshot.firstElementChild.src = url;
						};
						let keyIsDown = false, xDown, yDown;
						const cleanUp = _ => {
							document.removeEventListener("keydown", keyDown);
							document.removeEventListener("keyup", keyUp);
							document.removeEventListener("touchstart", touchStart);
							document.removeEventListener("touchmove", touchMove);
						};
						const keyUp = event => {
							if (!document.contains(imageModal)) cleanUp();
							keyIsDown = false;
						};
						const keyDown = event => {
							if (!document.contains(imageModal)) cleanUp();
							else if (!keyIsDown) {
								keyIsDown = true;
								if (event.keyCode == 37) switchImages(-1);
								else if (event.keyCode == 39) switchImages(1);
							}
						};
						const touchStart = event => {
							if (!document.contains(imageModal)) cleanUp();
							xDown = event.touches[0].clientX;
							yDown = event.touches[0].clientY;
						};
						const touchMove = event => {
							if (!document.contains(imageModal)) cleanUp();
							if (!xDown || !yDown) return;
							const xDiff = xDown - event.touches[0].clientX;
							const yDiff = yDown - event.touches[0].clientY;
							if (Math.abs(xDiff) > Math.abs(yDiff)) {
								if (xDiff > 0) switchImages(1);
								else switchImages(-1); 
							}
							xDown = null;
							yDown = null; 
						};

						previous.addEventListener("click", _ => switchImages(-1));
						next.addEventListener("click", _ => switchImages(1));
						document.addEventListener("keydown", keyDown);
						document.addEventListener("keyup", keyUp);
						document.addEventListener("touchstart", touchStart);
						document.addEventListener("touchmove", touchMove);
						switchImages(0);

						appendModal(imageModal, {onClose: cleanUp});
					};
					if (createAddonCard.cache[addon.resourceUrl].screenshots.fetched) openScreenshots();
					else {
						const loadingScreen = appendModal(createSpinner(true));
						let i = 2;
						const loadScreenshot = _ => {
							const xhttp = new XMLHttpRequest();
							const url = `${addon.resourceUrl}/screenshot${i++}.png`;
							xhttp.onload = function() {
								if (this.status == 200) {
									createAddonCard.cache[addon.resourceUrl].screenshots.urls.push(url);
									loadScreenshot();
								}
								else {
									createAddonCard.cache[addon.resourceUrl].screenshots.fetched = true;
									loadingScreen.remove();
									openScreenshots();
								}
							};
							xhttp.open("GET", url);
							xhttp.send();
						};
						loadScreenshot();
					}
				});
			}

			let links = [], buttons = [];
			if (addon.websiteUrl) links.push({
				text: "Website",
				url: addon.websiteUrl,
				svg: `<svg width="100%" height="100%" viewBox="0 0 20 20"><path fill="currentColor" d="M 9.99,0 C 4.47,0 0,4.48 0,10 0,15.52 4.47,20 9.99,20 15.52,20 20,15.52 20,10 20,4.48 15.52,0 9.99,0 Z m 6.93,6 H 13.97 C 13.65,4.75 13.19,3.55 12.59,2.44 14.43,3.07 15.96,4.35 16.92,6 Z M 10,2.04 c 0.83,1.2 1.48,2.53 1.91,3.96 H 8.09 C 8.52,4.57 9.17,3.24 10,2.04 Z M 2.26,12 C 2.1,11.36 2,10.69 2,10 2,9.31 2.1,8.64 2.26,8 H 5.64 C 5.56,8.66 5.5,9.32 5.5,10 c 0,0.68 0.06,1.34 0.14,2 z m 0.82,2 h 2.95 c 0.32,1.25 0.78,2.45 1.38,3.56 C 5.57,16.93 4.04,15.66 3.08,14 Z M 6.03,6 H 3.08 C 4.04,4.34 5.57,3.07 7.41,2.44 6.81,3.55 6.35,4.75 6.03,6 Z M 10,17.96 C 9.17,16.76 8.52,15.43 8.09,14 h 3.82 C 11.48,15.43 10.83,16.76 10,17.96 Z M 12.34,12 H 7.66 C 7.57,11.34 7.5,10.68 7.5,10 7.5,9.32 7.57,8.65 7.66,8 h 4.68 c 0.09,0.65 0.16,1.32 0.16,2 0,0.68 -0.07,1.34 -0.16,2 z m 0.25,5.56 c 0.6,-1.11 1.06,-2.31 1.38,-3.56 h 2.95 c -0.96,1.65 -2.49,2.93 -4.33,3.56 z M 14.36,12 c 0.08,-0.66 0.14,-1.32 0.14,-2 0,-0.68 -0.06,-1.34 -0.14,-2 h 3.38 C 17.9,8.64 18,9.31 18,10 c 0,0.69 -0.1,1.36 -0.26,2 z"/></svg>`
			});
			if (addon.sourceUrl) links.push({
				text: "Source",
				url: addon.sourceUrl,
				svg: `<svg width="100%" height="100%" viewBox="0 0 20 20"><path fill="currentColor" d="m 10,0.4165232 c -5.525,0 -10,4.4 -10,9.8266668 0,4.3425 2.865,8.025 6.8375,9.323334 0.5,0.0925 0.6833333,-0.211667 0.6833333,-0.4725 0,-0.233334 -0.00833,-0.851667 -0.0125,-1.670834 C 4.7266667,18.01569 4.14,16.104857 4.14,16.104857 c -0.455,-1.134167 -1.1125,-1.4375 -1.1125,-1.4375 -0.9058333,-0.609167 0.07,-0.596667 0.07,-0.596667 1.0041667,0.06833 1.5316667,1.0125 1.5316667,1.0125 0.8916666,1.5025 2.3408333,1.068334 2.9125,0.8175 0.09,-0.635833 0.3475,-1.068333 0.6333333,-1.314166 C 5.9541667,14.34069 3.62,13.49569 3.62,9.7306896 c 0,-1.0725 0.3875,-1.949166 1.0291667,-2.636666 -0.1125,-0.248334 -0.45,-1.2475004 0.0875,-2.6008337 0,0 0.8375,-0.2633333 2.75,1.0075 0.8,-0.2183333 1.65,-0.3266667 2.5,-0.3316667 0.8500003,0.005 1.7000003,0.1133334 2.5000003,0.3316667 1.9,-1.2708333 2.7375,-1.0075 2.7375,-1.0075 0.5375,1.3533333 0.2,2.3524997 0.1,2.6008337 0.6375,0.6875 1.025,1.564166 1.025,2.636666 0,3.7750004 -2.3375,4.6058344 -4.5625,4.8475004 0.35,0.295 0.675,0.8975 0.675,1.818334 0,1.315 -0.0125,2.371666 -0.0125,2.690833 0,0.2575 0.175,0.565 0.6875,0.466667 C 17.1375,18.264024 20,14.579024 20,10.24319 20,4.8165232 15.5225,0.4165232 10,0.4165232 Z"/></svg>`
			});
			if (addon.download) buttons.push({
				text: "Download",
				svg: `<svg width="100%" height="100%" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"/></svg>`,
				onClick: _ => window.DownloadApi.convert(addon.download)
			});
			for (let link of links) {
				let linkEle = createElement(`<div class="addon-link">${link.svg}</div>`);
				if (link.text) linkEle.addEventListener("mouseenter", _ => createTooltip(linkEle, link.text));
				if (link.url) linkEle.addEventListener("click", _ => window.open(link.url, "_blank"));
				linksEle.appendChild(linkEle);
			}
			for (let button of buttons) {
				let buttonEle = createElement(`<button class="addon-button">${button.svg}</button>`);
				if (button.text) buttonEle.addEventListener("mouseenter", _ => createTooltip(buttonEle, button.text));
				if (button.onClick) buttonEle.addEventListener("click", button.onClick);
				buttonsEle.appendChild(buttonEle);
			}
			return card;
		};
		createAddonCard.cache = {};

		const sidebar = document.querySelector(".sidebar-region .sidebar");
		const sidebarHeader = document.querySelector(".sidebar-region .sidebar-header");
		const sidebarFooter = document.querySelector(".sidebar-region .sidebar-footer");
		const content = document.querySelector(".content-region .content");

		const sections = [
			{section: "Title", title: "My Stuff"},
			{section: "General", renderSection: _ => [
				createElement(`<div class="welcome-message">Welcome to my little Plugins and Themes Repository</div>`),
				createElement(`<div class="divider"></div>`),
				createElement(`<div class="welcome-details">On here you'll find all my Plugins and Themes that are hosted on my <a href="https://github.com/mwittrien/BetterDiscordAddons/" target="_blank">GitHub</a>.</div>`),
				createElement(`<div class="welcome-details">If you expierence any Issues or got some Improvement Suggestions for my stuff, then feel free to drop them on <a href="https://github.com/mwittrien/BetterDiscordAddons/Issues" target="_blank">here</a>. But please make sure whether there is already an open Thread for your Issue or Suggestion.</div>`),
				createElement(`<div class="divider"></div>`),
				createElement(`<div class="welcome-details">If you enjoy using my Stuff and want to support me feel free to donate to me or become a Patron and receive certain benefits depending on which Tier you choose.</div>`),
				createElement(`<div class="donations"><a class="donation" href="https://www.paypal.me/MircoWittrien" target="_blank"><div class="donation-icon"><svg name="PayPal" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M 5.6863929,0 C 5.1806043,0 4.7507198,0.3656279 4.6704813,0.85995389 L 1.6795909,19.673995 c -0.058746,0.371103 0.2309887,0.706911 0.6092555,0.706911 h 4.4338638 l 1.1121097,-7.006437 -0.033522,0.22009 c 0.078805,-0.494326 0.5072079,-0.859954 1.0129965,-0.859954 h 2.1061586 c 4.139443,0 7.378419,-1.667588 8.325519,-6.4919233 0.02866,-0.1432829 0.07434,-0.4183163 0.07434,-0.4183163 C 19.589638,4.0390606 19.318112,2.8290903 18.345211,1.7301106 17.276361,0.5193702 15.342278,0 12.867737,0 Z M 21.516831,7.8139196 c -1.028771,4.7498274 -4.3124,7.2629664 -9.522166,7.2629664 H 10.107139 L 8.6962314,24 H 11.76 c 0.442744,0 0.820329,-0.319405 0.889104,-0.753552 l 0.03498,-0.189482 0.705454,-4.428033 0.04519,-0.244868 c 0.06878,-0.434148 0.446338,-0.753554 0.887649,-0.753554 h 0.559699 c 3.620757,0 6.455196,-1.457472 7.283371,-5.677153 0.332416,-1.693603 0.172401,-3.113533 -0.64861,-4.1394384 z"/></svg></div><div class="donation-link">PayPal</div></a><a class="donation" href="https://www.patreon.com/MircoWittrien" target="_blank"><div class="donation-icon"><svg name="Patreon" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M 0,-1.2209e-4 V 24 H 4.4021963 V -1.2209e-4 Z m 15.010145,0 c -4.974287,0 -9.020427,4.04121619 -9.020427,9.00819799 0,4.9565461 4.04614,8.9837411 9.020427,8.9837421 C 19.970866,17.991818 24,13.959406 24,9.0080759 24,4.0421376 19.969822,-1.2209e-4 15.010145,-1.2209e-4 Z"/></svg></div><div class="donation-link">Patreon</div></a></div>`),
			]},
			{section: "Separator"},
			{section: "Plugins", renderSection: _ => [
				createAddonList("Plugins", ".plugin.js"),
				createElement(`<div class="divider"></div>`),
				createLibraryEntry()
			]},
			{section: "Themes", renderSection: _ => createAddonList("Themes", ".theme.css")},
			{section: "Separator"},
			{section: "Invites", renderSection: _ => [
				createInvite({invite: "Jx3TjNS", name: "DevilBro's Haus", details: "Support Server for all my Stuff", icon: "https://mwittrien.github.io/_res/imgs/db_logo.webp"}),
				createElement(`<div class="divider"></div>`),
				createInvite({invite: "0Tmfo5ZbORCRqbAd", name: "BetterDiscord", details: "First Support Server for BD", icon: "https://mwittrien.github.io/_res/imgs/bd1_logo.webp"}),
				createInvite({invite: "sbA3xCJ", name: "BetterDiscord2", details: "Second Support Server for BD", icon: "https://mwittrien.github.io/_res/imgs/bd2_logo.webp"})
			]}
		];
		let items = [];

		let selectedSection;
		const renderContent = data => {
			if (typeof data.renderSection != "function") return;
			while (content.childElementCount) content.firstElementChild.remove();
			let sectionElements = [data.renderSection()].flat(10).filter(n => n);
			for (let element of sectionElements) content.appendChild(element);
			selectedSection = data.section;
			document.title = `BetterDiscord Addons - ${data.section}`;
		};
		let parsedSection = ((window.location.search.split(`?section=`)[1] || "").split("?")[0] || "").toLowerCase();
		renderContent(parsedSection && sections.find(data => data.section != "Title" && data.section != "Separator" && data.section.toLowerCase() == parsedSection) || sections.find(data => data.section != "Title" && data.section != "Separator"));

		sidebarHeader.appendChild(createElement(`<div class="logo"><div class="primary">Better</div><div class="secondary">Discord</div></div>`));

		const changeTheme = value => {
			for (let element of document.querySelectorAll(".theme-dark, .theme-light")) {
				element.classList.add(value ? "theme-light" : "theme-dark");
				element.classList.remove(value ? "theme-dark" : "theme-light");
			}
		};
		let isLight = localStorage.getItem("theme") == "light";
		changeTheme(isLight);
		let themeSwitch = createElement(`<div class="theme-switch"><svg class="theme-switch-icon" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m 21.98899,13.466483 c -0.214821,-0.05394 -0.429651,0 -0.617618,0.134829 -0.698189,0.593245 -1.503784,1.078629 -2.38994,1.402218 -0.832449,0.323588 -1.745459,0.485381 -2.712176,0.485381 -2.175102,0 -4.162244,-0.889868 -5.585457,-2.319051 C 9.2605759,11.740677 8.3744197,9.7452125 8.3744197,7.5609894 c 0,-0.9168349 0.1611225,-1.8067035 0.4296512,-2.6156751 C 9.0994534,4.0824111 9.5291046,3.300405 10.093025,2.6262622 10.3347,2.3296393 10.280992,1.8981877 9.9856096,1.6554957 9.7976421,1.5206669 9.5828121,1.4667361 9.3679909,1.5206669 7.085466,2.1408789 5.0983323,3.5161308 3.6751099,5.3497997 2.3055949,7.1565032 1.5,9.3946585 1.5,11.821574 c 0,2.939263 1.1815387,5.60887 3.1149736,7.550403 C 6.5483998,21.313509 9.1800146,22.5 12.133866,22.5 c 2.470492,0 4.753017,-0.862903 6.579037,-2.292087 1.852865,-1.456149 3.195526,-3.532509 3.759446,-5.905493 0.107415,-0.377519 -0.107415,-0.755041 -0.483359,-0.835937 z"/></svg><svg class="theme-switch-icon" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m 12,-3.15e-5 c -0.647828,0 -1.172909,0.52508111 -1.172909,1.1729088 v 1.8766543 c 0,0.6472963 0.525081,1.1718709 1.172909,1.1718709 0.647296,0 1.172909,-0.5245746 1.172909,-1.1718709 V 1.1728773 C 13.172909,0.52504961 12.647828,-3.15e-5 12,-3.15e-5 Z M 4.343915,3.1709746 c -0.300132,0 -0.600289,0.1145172 -0.82934,0.3435687 -0.458103,0.4575715 -0.458103,1.2011087 0,1.6586802 l 1.326529,1.3265289 c 0.458103,0.4586345 1.200577,0.4586345 1.65868,0 0.458103,-0.4581029 0.458103,-1.2005772 0,-1.6586801 L 5.173255,3.5145433 C 4.944203,3.2854918 4.644047,3.1709746 4.343915,3.1709746 Z m 15.311132,0 c -0.300198,0 -0.599516,0.1147829 -0.828302,0.3435687 l -1.327567,1.326529 c -0.457571,0.4581029 -0.457571,1.2005772 0,1.6586801 0.458635,0.4581031 1.201109,0.4581031 1.65868,0 l 1.327567,-1.3265289 c 0.458103,-0.4575715 0.458103,-1.2005773 0,-1.6586802 C 20.256374,3.2857575 19.955246,3.1709746 19.655047,3.1709746 Z M 12,5.9890697 c -3.314603,0 -6.010899,2.6962957 -6.010899,6.0108983 0,3.314603 2.696296,6.011937 6.010899,6.011937 3.314072,0 6.010899,-2.696802 6.010899,-6.011937 C 18.010899,8.6848339 15.314072,5.9890697 12,5.9890697 Z M 1.172909,10.82706 C 0.525081,10.82706 0,11.35214 0,11.999968 c 0,0.647828 0.525081,1.171871 1.172909,1.171871 h 1.876654 c 0.647296,0 1.171871,-0.524043 1.171871,-1.171871 0,-0.647828 -0.525081,-1.172908 -1.172909,-1.172908 z m 19.777528,0 c -0.647828,0 -1.172909,0.52508 -1.172909,1.172908 0,0.647828 0.525081,1.171871 1.172909,1.171871 h 1.876654 C 23.474919,13.171839 24,12.647796 24,11.999968 24,11.35214 23.474919,10.82706 22.827091,10.82706 Z M 5.670444,17.156616 c -0.300132,0 -0.600289,0.114251 -0.82934,0.343569 l -1.326529,1.326528 c -0.457572,0.457572 -0.458103,1.201109 0,1.65868 0.458103,0.457572 1.201108,0.457572 1.65868,0 l 1.326529,-1.327567 c 0.458103,-0.457571 0.458103,-1.200601 0,-1.657641 -0.229052,-0.229318 -0.529208,-0.343569 -0.82934,-0.343569 z m 12.658074,0.0011 c -0.300198,0 -0.600288,0.113745 -0.82934,0.342532 -0.458103,0.45757 -0.458103,1.200576 0,1.658679 l 1.327567,1.326529 c 0.458103,0.457572 1.200577,0.457572 1.65868,0 0.458103,-0.457571 0.458103,-1.200602 0,-1.657642 l -1.327567,-1.327566 c -0.228785,-0.228787 -0.529141,-0.342532 -0.82934,-0.342532 z M 12,19.777559 c -0.647828,0 -1.172909,0.525081 -1.172909,1.172909 v 1.875616 c 0,0.648359 0.525081,1.173947 1.172909,1.173947 0.647828,0 1.172909,-0.525588 1.172909,-1.173947 v -1.875616 c 0,-0.647828 -0.525613,-1.172909 -1.172909,-1.172909 z"/></svg></div>`);
		themeSwitch.insertBefore(createSwitch({
			checked: isLight,
			onChange: value => {
				localStorage.setItem("theme", value ? "light" : "dark");
				changeTheme(value);
			}
		}), themeSwitch.firstElementChild.nextSibling);
		sidebarFooter.appendChild(themeSwitch);

		for (const data of sections) {
			const item = createElement(data.section == "Title" ? `<div class="sidebar-title">${data.title}</div>` : data.section == "Separator" ? `<div class="sidebar-separator"></div>` : `<div class="${formatClassName("sidebar-item", selectedSection == data.section && "selected")}">${data.section}</div>`);
			if (typeof data.renderSection == "function") {
				items.push(item);
				item.addEventListener("click", _ => {
					if (selectedSection == data.section) return;
					renderContent(data);
					for (let i of items) i.classList.remove("selected");
					item.classList.add("selected");
					if (isMobile()) document.documentElement.classList.add("sidebar-hidden");
				});
			}
			sidebar.appendChild(item);
		}
		
		let xMainDown, yMainDown;
		document.addEventListener("touchstart", event => {
			let trigger = isMobile() && !document.querySelector(".modals > *");
			xMainDown = trigger ? event.touches[0].clientX : null;
			yMainDown = trigger ? event.touches[0].clientY : null;
		});
		document.addEventListener("touchmove", event => {
			if (!xMainDown || !yMainDown) return;
			const xDiff = xMainDown - event.touches[0].clientX;
			const yDiff = yMainDown - event.touches[0].clientY;
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if (xDiff > 0) document.documentElement.classList.add("sidebar-hidden");
				else document.documentElement.classList.remove("sidebar-hidden");
			}
			xMainDown = null;
			yMainDown = null; 
		});
	};
})();