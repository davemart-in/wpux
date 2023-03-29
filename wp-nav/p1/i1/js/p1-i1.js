"use strict";
// Check to make sure global namespace is not already being used
// Set an empty object if it's not
if ( !window.P1 ) { window.P1 = {}; }
window.P1.Core = function () {
	// -------------------------------------------------------------
	// PRIVATE VARS
	// -------------------------------------------------------------
	let debounceNavTimer;
	let debounceRun = true;
	let debounceTimer;
	// -------------------------------------------------------------
	// PRIVATE DATA MODEL
	// -------------------------------------------------------------
	let data = {
		"options": {
			"app": "core", // ['core','dotcom']
			"color": "default", // ['default','ectoplasm']
			"language": "EN", // ['EN','JP']
			"role": "admin" // ['admin','contributor']
		}
	};
	// -------------------------------------------------------------
	// PRIVATE INIT
	// -------------------------------------------------------------
	function init() {
		// Bring options buttons in bottom right corner to life
		initOptionsEvents();
		// Pull in nav settings and then render the nav
		dataImport();
		// Refresh on resize
		_on(window, 'resize', function() {
			debounceRun = true;
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(function() {
				if (debounceRun) {
					navRender();
				}
			}, 250);
		});
	}
	function initLinkClicks(el) {
		const links = document.querySelectorAll(el + ' a:not(.submenu-back)');
		links.forEach(link => {
			link.addEventListener('click', (event) => {
				const href = link.getAttribute('href');
				if (href.startsWith('#')) {
					setTimeout(function() {
						navRender();
					}, 100);
				}
			});
		});
	}
	function initOptionsEvents() {
		// Toggle options ----------------------------------
		_on(_$('.options-menu'), 'click', function(e) {
			e.preventDefault();
			_classToggle(_$('.options'), 'open');
		});
		_on(_$('.options-close'), 'click', function(e) {
			e.preventDefault();
			_classToggle(_$('.options'), 'open');
		});
		// App buttons ----------------------------------
		_on(_$('.options-app-core'), 'click', function() {
			dataOptionsSet(this, 'app', 'core');
		});
		_on(_$('.options-app-dotcom'), 'click', function() {
			dataOptionsSet(this, 'app', 'dotcom');
		});
		// Color buttons ----------------------------------
		_on(_$('.options-color-default'), 'click', function() {
			dataOptionsSet(this, 'color', 'default');
			// Remove ectoplasm class from body
			_$('body').classList.remove('ectoplasm');
		});
		_on(_$('.options-color-ectoplasm'), 'click', function() {
			dataOptionsSet(this, 'color', 'ectoplasm');
			// Add ectoplasm class to body
			_$('body').classList.add('ectoplasm');
		});
		// Language buttons ----------------------------------
		_on(_$('.options-language-english'), 'click', function() {
			dataOptionsSet(this, 'language', 'EN');
			_$('body').classList.remove('rtl');
		});
		_on(_$('.options-language-japanese'), 'click', function() {
			dataOptionsSet(this, 'language', 'JP');
			_$('body').classList.add('rtl');
		});
		// Role buttons ----------------------------------
		_on(_$('.options-role-admin'), 'click', function() {
			dataOptionsSet(this, 'role', 'admin');
		});
		_on(_$('.options-role-contributor'), 'click', function() {
			dataOptionsSet(this, 'role', 'contributor');
		});
	}
	// -------------------------------------------------------------
	// PRIVATE CONTENT FUNCTIONS
	// -------------------------------------------------------------
	function contentRenderHeader() {
		let header = '';
		if (data.currentPage === '') {
			header = (data.options.app === 'core') ? 'Dashboard' : 'My Home';
		} else {
			header = data.nav.links[data.currentPage].label;
		}
		// Render the header
		_$('.section-main').innerHTML = '<h1>' + header + '</h1>';
	}
	function contentRenderWireframes() {
		const containerCount = 10;
		const containerVariations = [
			['one', 'two'],
			['two', 'one'],
			['three']
		];
		let lastVariation = null;
		let html = '';
		for (let i = 0; i < containerCount; i++) {
			let variationHtml = '';
			let variation = null;
			// Loop until we find a new variation to avoid duplicate rows one after another
			while (variation == null || variation === lastVariation) { 
				variation = containerVariations[Math.floor(Math.random() * containerVariations.length)];
			}
			lastVariation = variation;
			for (let j = 0; j < variation.length; j++) {
				const variationClass = variation[j];
				// Determine background color
				const randomNumber = Math.random();
				let shadedClass = '';
				if (randomNumber < 0.33) {
				  shadedClass = 'shaded';
				} else if (randomNumber < 0.66) {
				  shadedClass = 'shadedDark';
				}
				// Pull it all together
				variationHtml += '<div class="' + variationClass + ' ' + shadedClass + '"></div>\n';
			}
			html += `
				<section class="content-wireframe">
					${variationHtml}
				</section>
			`;
		}
		let contentWireframes = _$('.content-wireframes');
		contentWireframes.innerHTML = html;
		contentWireframes.style.display = 'block';
	}
	// -------------------------------------------------------------
	// PRIVATE DATA FUNCTIONS
	// -------------------------------------------------------------
	function dataImport() {
		const dataUrl = './data/nav-' + data.options.app + '-' + data.options.language + '.json';
		// Load the specified JSON data and add it to the data model
		_jsonGet(dataUrl, function(jsonData) {
			data.nav = jsonData;
			// Load the nav
			navRender();
		});
	}
	function dataOptionsSet(el, key, value) {
		// Ignore if already selected
		if (_classHas(el, 'selected')) { return; }
		// update selected class
		const buttonsInGroup = _$('.options-' + key);
		for (let i = 0; i < buttonsInGroup.length; i++) {
			_classToggle(buttonsInGroup[i], 'selected');
		}
		// Update data model
		data.options[key] = value;
		// Pull in new nav settings and then re-render the nav
		dataImport()
	}
	function dataSetCurrentPage() {
		// Get hash from URL
		let hash = window.location.hash;
		// Remove # char from hash
		hash = hash.replace('#', '');
		// If hash is empty, set it to the default page
		if (hash === '') {
			hash = (data.options.app === 'core') ? 'dashboard' : 'myHome';
		}
		// Save to data model
		data.currentPage = hash;
	}
	// -------------------------------------------------------------
	// PRIVATE EDITOR FUNCTIONS
	// -------------------------------------------------------------
	function editorLoad() {
		// Hide wireframes
		_$('.content-wireframes').style.display = 'none';
		// Show editor nav
		_$('.section-main').innerHTML = `
			<div class="editor-nav">
				<div class="editor-nav-left">&nbsp;</div>
				<div class="editor-nav-center"></div>
				<div class="editor-nav-right">&nbsp;</div>
			</div>
			<h1 contenteditable="true" class="editor-title">Add title</h1>
		`;
		let h1 = _$('h1');
		// Set focus on title
		h1.focus();
		// on keyup
		_on(h1, 'keyup', function() {
			_$('body').classList.add('editor-active');
		});
		// On mouseenter
		_on(_$('.editor-nav'), 'mouseenter', function() {
			_$('body').classList.remove('editor-active');
		});
	}
	// -------------------------------------------------------------
	// PRIVATE NAV FUNCTIONS
	// -------------------------------------------------------------
	function navDebounce(func, delay) {
		clearTimeout(debounceNavTimer);
		debounceNavTimer = setTimeout(func, delay);
	}
	function navRender() {
		// Hide submenu
		submenuHide();
		// Determine which page we should be viewing based on the hash and save it to the data model
		dataSetCurrentPage();
		// Loop through the global links and render them
		navRenderTopLevelLinks(data.nav.structure.global.links, _$('.nav-global'));
		// Loop through the site links and render them
		navRenderTopLevelLinks(data.nav.structure.site.links, _$('.nav-site'));
		// Render submenus
		submenusRender();
		// Submenu events
		submenuEvents();
		// Populate breadcrumbs
		subnavBreadcrumbsRender();
		// Populate primary action button
		subnavPrimaryActionRender();
		// Sticky subnav
		navStickySubnav();
		// grab hash from URL
		let hash = window.location.hash;
		if (hash === '#editor') {
			editorLoad();
		} else {
			// Render content header
			contentRenderHeader();
			// Populate wireframe content
			contentRenderWireframes();
		}
	}
	function navRenderTopLevelLinks(links, el, backLink = false) {
		let html = '';
		if (backLink) {
			html += '<a href="#" class="back">' + _tmpl('iconback', {}) + '</a>';
		}
		for (let i = 0; i < links.length; i++) {
			let link = links[i];
			// Check role access
			if (data.options.role === 'contributor' && data.nav.links[link].admin !== undefined) {
				continue;
			}
			// Check to make sure classes doesn't include global
			if (i === 1 && !data.nav.links[link].classes.includes('global')) {
				html += '<a href="#menu" class="menu">' + _tmpl('iconmenu', {}) + '</a><div class="responsive-container"><a href="#close" class="menu-close">' + _tmpl('iconclose', {}) + '</a>';
			} 
			const classes = (data.nav.links[link].classes) ? data.nav.links[link].classes : '';
			const submenu = (classes.includes('sub-menu')) ? '<div class="submenu ' + data.nav.links[link].id + '-submenu"></div>' : '';
			const content = (data.nav.links[link].label) ? data.nav.links[link].label : _tmpl('icon' + link, {});
			const id = (data.nav.links[link].id) ? 'id="' + data.nav.links[link].id + '"' : '';
			let href = (data.nav.links[link].href) ? data.nav.links[link].href : '#';
			html += '<a href="' + href + '" class="' + classes + '"' + id + '>' + content + '</a>' + submenu;
			if (i === links.length - 1) {
				html += '</div>';
			}
		}
		// Add the links to the DOM
		el.innerHTML = html;
	}
	function navStickySubnav() {
		const subNav = _$('.subnav');
		const primaryNavPosition = _$('nav').getBoundingClientRect().bottom;
		let debouncedScroll = _debounce(function() {
			// If the user has scrolled below the position of the primary nav
			if (window.pageYOffset >= primaryNavPosition) {
				// Add the "sticky" class to the sub nav element
				subNav.classList.add('sticky');
			} else {
				// Remove the "sticky" class from the sub nav element
				subNav.classList.remove('sticky');
			}
		}, 10);
		// Listen for the window scroll event using the debounced function
		window.addEventListener('scroll', debouncedScroll);
	}
	// -------------------------------------------------------------
	// PRIVATE PLUGIN MENU FUNCTIONS
	// -------------------------------------------------------------
	function pluginLinkClick() {
		pluginMenuRender();
		// Remove the event listener after the first execution to avoid stacking click events
		_$('.plugin[href="#woo"]').removeEventListener('click', pluginLinkClick); 
	}
	function pluginMenuEvents() {
		// Back link
		_on(_$('.back'), 'click', function(e) {
			e.preventDefault();
			_classToggle(_$('nav'), 'plugin-woo');
			_classToggle(_$('.nav-plugin'), 'active');
			// Change url to #
			window.location.hash = '#';
			// Rerender nav
			navRender();
		});
		// Menu click event
		let section = _$('.nav-plugin');
		_on(section.querySelector('.menu'), 'click', function(e) {
			e.preventDefault();
			_classToggle(section.querySelector('.responsive-container'), 'show');
		});
		// Close responsive menu
		_on(section.querySelector('.menu-close'), 'click', function(e) {
			e.preventDefault();
			_classToggle(section.querySelector('.responsive-container'), 'show');
		});
	}
	function pluginMenuRender() {
		let pluginNav = _$('.nav-plugin');
		// Reset .nav-plugin
		pluginNav.innerHTML = '';
		// Load plugin links
		let backLink = true;
		navRenderTopLevelLinks(data.nav.structure.plugins.woo.links, pluginNav, backLink);
		// Add class to main nav
		_classToggle(_$('nav'), 'plugin-woo');
		// Slide plugin menu over
		_classToggle(pluginNav, 'active');
		// Hide submenu if it's showing
		submenuHide();
		// Submenu items
		submenuEvents();
		// Events
		pluginMenuEvents();
	}
	// -------------------------------------------------------------
	// PRIVATE SUBMENUS FUNCTIONS
	// -------------------------------------------------------------
	function submenuEvents() {
		// Get all top level links with a submenu
		const topLevelLinks = _$('nav a.sub-menu');
		// Check if responsive styles apply
		const responsive = window.matchMedia('(max-width: 768px)').matches;
		if (responsive) {
			let section = (_classHas(_$('nav'), 'plugin-woo')) ? _$('.nav-plugin') : _$('.nav-site');

			// click event for menu icon for responsive screens
			_on(section.querySelector('.menu'), 'click', function(e) {
				e.preventDefault();
				_classToggle(section.querySelector('.responsive-container'), 'show');
			});
			// Close responsive menu
			_on(section.querySelector('.menu-close'), 'click', function(e) {
				e.preventDefault();
				_classToggle(section.querySelector('.responsive-container'), 'show');
			});
			// Submenu events
			for (let i = 0; i < topLevelLinks.length; i++) {
				_on(topLevelLinks[i], 'click', function(e) {
					e.preventDefault();
					submenuMouseoverEvent(this);
				});
			}
			// Submenu back button
			const submenuBack = Array.from(document.querySelectorAll('.submenu-back'));
			submenuBack.forEach(back => {
				_on(back, 'click', function(e) {
					e.preventDefault();
					_classToggle(this.parentElement, 'active');
				});
			});
		} else {
			// Register events for each of these links
			for (let i = 0; i < topLevelLinks.length; i++) {
				_on(topLevelLinks[i], 'mouseenter', function() {
					navDebounce(() => {
						submenuMouseoverEvent(this);
					}, 150);
				});
				// Bind mouseleave event to tab and submenus
				const tab = topLevelLinks[i];
				const submenus = Array.from(document.querySelectorAll('.submenu'));
				const responsiveContainer = Array.from(document.querySelectorAll('.responsive-container'));
				// Combine tab and submenus in a single array
				const allElements = [tab].concat(submenus).concat(responsiveContainer);
				// Bind mouseleave event to all elements
				allElements.forEach(element => {
				  _on(element, 'mouseleave', function(event) {
						submenuMouseleave(event, tab, responsiveContainer, submenus);
				  });
				});
				// Watch for enter or space keypress on tab
				_on(topLevelLinks[i], 'keydown', function(e) {
					if (e.keyCode === 13 || e.keyCode === 32) {
						// Prevent default action
						e.preventDefault();
						// Simulate a mouseenter event
						submenuMouseoverEvent(this);
					}
				});
			}
		}
	}
	function submenuMouseleave(event, tab, responsiveContainer, submenu) {
		// Check if the mouse has left element
		if (event.relatedTarget !== tab && !responsiveContainer.includes(event.relatedTarget) && !submenu.includes(event.relatedTarget)) {
			navDebounce(() => {
				submenuHide();
			}, 150);
		}
	}
	function submenuMouseoverEvent(that) {
		// Remove active class from all other tabs and submenus
		submenuResetState();
		// Set new tab as active
		that.classList.add('active');
		// Add global class to nav
		_$('body').classList.add('submenu-active');
		// Get the ID of the submenu
		const id = that.getAttribute('id');
		// Get the applicable submenu element
		let submenuEl = _$('.' + id + '-submenu');
		// Show this tab's submenu
		submenuEl.classList.add('active');
		// Add global class if it applies
		if (_classHas(that, 'global')) {
			_$('nav').classList.add('global');
		} else {
			_$('nav').classList.remove('global');
		}
		// Watch for submenu link clicks
		initLinkClicks('.submenu');
		// Woo plugin menu
		_on(_$('.plugin[href="#woo"]'), 'click', pluginLinkClick);
	}
	function submenuHide() {
		// Perform actions when the mouse has left both elements
		// Remove the "submenu-active" class from the nav
		_$('body').classList.remove('submenu-active');
		// Remove global class if it applies
		_$('nav').classList.remove('global');
		// Hide all responsive menus
		const responsiveContainers = Array.from(document.querySelectorAll('.responsive-container'));
		const className = 'show';
		responsiveContainers.forEach(responsiveContainer => {
			if (_classHas(responsiveContainer, className)) {
				responsiveContainer.classList.remove(className);
			}
		});
		// Deactivate all active tabs
		submenuResetState();
	}
	function submenuResetState() {
		const activeTabs = _$('nav a.sub-menu.active');
		if (!activeTabs) {
			return;
		}
		if (activeTabs.length) {
			for (let i = 0; i < activeTabs.length; i++) {
				activeTabs[i].classList.remove('active');
			}
		} else {
			activeTabs.classList.remove('active');
		}
		// Hide all active submenus
		const activeSubmenus = document.querySelectorAll('.submenu.active');
		if (activeSubmenus) {
			for (let i = 0; i < activeSubmenus.length; i++) {
				activeSubmenus[i].classList.remove('active');
			}
		}
	}
	function submenusRender() {
		// Get all top level links with a submenu
		const topLevelLinks = document.querySelectorAll('nav a.sub-menu');
		// Loop through them
		for (let i = 0; i < topLevelLinks.length; i++) {
			let el = topLevelLinks[i];
			// Determine if site, global, or plugin
			let globalPluginOrSite = 'site';
			if (_classHas(el, 'global')) { globalPluginOrSite = 'global'; }
			if (_classHas(el, 'plugins')) { globalPluginOrSite = 'plugins'; }
			// Get the ID of the submenu
			const id = el.getAttribute('id');
			// Create an empty variable to hold the html
			let html = '<a href="#" class="submenu-back">' + _tmpl('iconback', {}) + '</a>';
			// Handle search separately
			if (id === 'search') {
				html = _tmpl('submenuSearch', {});
			}
			// Fetch structure
			let structure = data.nav.structure[globalPluginOrSite][id];
			// Treat plugins differently
			if (globalPluginOrSite === 'plugins') { structure = data.nav.structure[globalPluginOrSite].woo[id]; }
			// If primary column exists render the links
			if (structure && structure.primary) {
				html += '<div class="column primary">';
				for (let i = 0; i < structure.primary.length; i++) {
					let linkData = data.nav.links[structure.primary[i]];
					// Check role access
					if (data.options.role === 'contributor' && linkData.admin !== undefined) {
						continue;
					}
					let addLink = (linkData.primaryAction && linkData.primaryAction === 'Add New') ? true : false;
					let addLinkHref = (linkData.label === 'Posts' || linkData.label === 'Pages') ? '#editor' : '#';
					if (addLink) { html += '<div class="primary-more">'; }
					html += '<a href="' + linkData.href + '" class="link ' + linkData.classes + '">' + linkData.label + '</a>';
					if (addLink) { html += `
							<a href="${addLinkHref}" class="add-new">+</a>
						</div>
					`; }
				}
				html += '</div>';
			}
			// If secondary column exists render the links
			if (structure && structure.secondary) {
				html += '<div class="column secondary">';
				for (let i = 0; i < structure.secondary.length; i++) {
					// Check role access
					if (data.options.role === 'contributor' && data.nav.links[structure.secondary[i]].admin !== undefined) {
						continue;
					}
					html += '<a href="' + data.nav.links[structure.secondary[i]].href + '" class="' + data.nav.links[structure.secondary[i]].classes + '">' + data.nav.links[structure.secondary[i]].label + '</a>';
				}
				html += '</div>';
			}
			// If tertiary column exists render the links
			if (structure && structure.tertiary) {
				html += '<div class="column tertiary">';
				for (let i = 0; i < structure.tertiary.length; i++) {
					// Check role access
					if (data.options.role === 'contributor' && data.nav.links[structure.tertiary[i]].admin !== undefined) {
						continue;
					}
					html += '<a href="' + data.nav.links[structure.tertiary[i]].href + '" class="' + data.nav.links[structure.tertiary[i]].classes + '">' + data.nav.links[structure.tertiary[i]].label + '</a>';
				}
				html += '</div>';
			}
			// Add submenu to dom
			let submenuEl = _$('.' + id + '-submenu');
			submenuEl.innerHTML = html;
		}
	}
	// -------------------------------------------------------------
	// PRIVATE SUBNAV FUNCTIONS
	// -------------------------------------------------------------
	function subnavBreadcrumbsRender() {
		let html = '';
		// Render the breadcrumbs
		const links = data.nav.links[data.currentPage].breadcrumb;
		let count = 0;
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			count++;
			if (count == links.length) {
				html += '<li><strong>' + data.nav.links[link].label + '</strong></li>';
				break;
			}
			if (!data.nav.links[link].href) {
				html += '<li>' + data.nav.links[link].label + '</li>';
				continue;
			}
			html += '<li><a href="' + data.nav.links[link].href + '">' + data.nav.links[link].label + '</a></li>';
		}
		_$('.breadcrumbs').innerHTML = html;
		// Watch for breadcrumb link clicks
		initLinkClicks('.breadcrumbs');
	}
	function subnavPrimaryActionRender() {
		const action = data.nav.links[data.currentPage].primaryAction;
		let btn = '';
		if (action) {
			btn = '<a href="#" onClick="return false;">' + action + '</a>';
		}
		_$('.actions').innerHTML = btn;
	}
	// -------------------------------------------------------------
	// PRIVATE UTILITY FUNCTIONS
	// -------------------------------------------------------------
	function _$(query) { if (!query) { return false; } let results = document.querySelectorAll(query); if (results.length === 1) { return document.querySelector(query); } else if (results.length === 0) { return false; } else { return results; } }
	function _classHas(el, className) { if (!el || !className || !el.classList) { return false; } return el.classList.contains(className); }
	function _classToggle(el, cl) { if (!el || !cl) { return false; } return el.classList.toggle(cl); }
	function _debounce(fn, delay) { if (!fn || !delay) { return false; } if (debounceRun) { debounceRun = false; return function () { let context = this, args = arguments; clearTimeout(debounceTimer); debounceTimer = setTimeout(function () { fn.apply(context, args); debounceRun = true; }, delay); }; } }
	function _jsonGet(url, callback) { if (!url || !callback) { return false; } try { let request = new XMLHttpRequest(); request.open('GET', url, true); request.responseType = 'text'; request.onload = function() { if (request.responseURL.includes('/404/')) { return false } callback(JSON.parse(request.response.toString('utf8'))); }; request.onerror = function() { return false }; request.send(); } catch (error) { return console.log('Oops. There was an error in loading new data.'); } }
	function _on(el, event, fn) { if (!el || !event || !fn) { return false } return el.addEventListener(event, fn); }
	// John Resig - http://ejohn.org/blog/javascript-micro-templating/ - MIT Licensed
	function _tmpl(str, data) { let tmplCache = []; let fn = !/\W/.test(str) ? tmplCache[str] = tmplCache[str] || _tmpl(document.getElementById(str).innerHTML) : new Function("obj", "let p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"); return data ? fn( data ) : fn; }
	// -------------------------------------------------------------
	// PUBLIC FACING METHODS
	// -------------------------------------------------------------
	return {
		init: function() {
			if (document.readyState === 'complete') {
				init();
			} else {
				window.addEventListener('load', init, false);
			}
		}
	};
} ();
// Kickstart everything
window.P1.Core.init();