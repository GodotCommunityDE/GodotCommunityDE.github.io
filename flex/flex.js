// Dokument Elemente Zugriff
if (document) {
	// DOM Element auswahl binden
	/** Wählt ein HTML- Element im DOM aus
	 * @function $dom
	 * @param {cssSelector} elmName Name/ID oder anderes Auswahlkriterium
	 * @returns {object}			DOM Element
	 */
	var $dom = document.querySelector.bind(document);

	/** Wählt eine Liste an HTML- Elementen im DOM aus
	 * @function $doms
	 * @param {cssSelector} elmName Klasse oder anderes Auswahlkriterium
	 * @returns {array}				Eine Liste/ Array mit DOM-Elementen
	 */
	var $doms = document.querySelectorAll.bind(document);
}

function Flex() {
	// head-(n) = Header ID

	// ===========================
	//   InfoListen
	// --------------

	// Header in einer Seite
	var headerList = {
		Name: "headerlist",
		Fields: ["id", "step", "elm", "text"],
		Types: ["str", "int", "elm", "str"],
		List: [],
	};

	// ===========================
	//    Funktionen
	// ---------------

	// Hide
	this.hideElm = function (elm) {
		if (!elm) return;
		if (typeof elm === "string") {
			elm = $dom(elm);
		}

		if (elm instanceof HTMLDomElement) {
			elm.setAttribute("hidden");
		}
	}; // hide

	// show
	this.showElm = function (elm) {
		if (!elm) return;
		if (typeof elm === "string") {
			elm = $dom(elm);
		}

		if (elm instanceof HTMLDomElement) {
			elm.removeAttribute("hidden");
		}
	}; // show

	//--- getViewport ---
	/**
	 * Gibt die Größe der Anzeigefläche zurück
	 * @returns {object}		Breite und Höhe vom Viewport. {width: 0, height: 0}
	 */
	this.getViewport = function () {
		var box = {
			width: Math.max(
				document.documentElement.clientWidth,
				window.innerWidth || 0,
			),
			height: Math.max(
				document.documentElement.clientHeight,
				window.innerHeight || 0,
			),
		};

		// zurückgeben
		return box;
	}; // getViewport

	//--- getBox ---
	/** gibt die relative Position im Viewport und die Größe von einem Element zurück
	 * @function getBox
	 * @memberof LinfoUI
	 * @param {string|object} elm		Name(Id) oder Element
	 * @returns {domClientRect}			Objekt mit Positionswerten
	 */
	this.getBox = function (elm) {
		/**
		 * Objekt welches Informationen zur Position und Größe eines Elementes enthält.
		 * Die Werte sind alle nur lesbar (Read only).
		 * @typedef domClientRect
		 * @type {object}
		 * @prop {float} bottom 		Y-coordinate, relativ zum viewport origin, untere Seite.
		 * @prop {float} fromBottom 	Abstand von Unten
		 * @prop {float} height  		Höhe des recheckigen Bereiches (ist identisch zu bottom minus top). Read only.
		 * @prop {float} left 	 		X-coordinate, relativ zum viewport origin, linke Seite.
		 * @prop {float} right 	 		X-coordinate, relativ zum viewport origin, rechte Seite.
		 * @prop {float} fromRight 	 	Abstand von Rechts.
		 * @prop {float} top 	 		Y-coordinate, relativ zum viewport origin, obere Seite.
		 * @prop {float} width 	 		Breiter der Element-Box (Ist identisch zu: rechts minus links).
		 * @prop {float} x 		 		X-coordinate, relativ zum viewport origin, linke Seite.
		 * @prop {float} y 		 		Y-coordinate, relativ zum viewport origin, obere Seite.
		 * @prop {float} scrollTop		Y-coordinate, wie weit von Oben weg gescrollt wurde
		 * @prop {float} scrollLeft		X-coordinate, wei weit von Links weg gescrollt wurde
		 * @prop {float} scrollWidth	Breite des gesammten Scrollbereiches inkl. des nicht sichtbaren bereiches (overflow)
		 * @prop {float} scrollHeight	Höhe des gesammten Scrollbereiches inkl. des nicht sichtbaren bereiches (overflow)
		 */

		if (!elm) return {};
		var pos = {
			x: 0,
			y: 0,
		};

		// wenn element ein string
		if (typeof elm === "string") {
			// Aus dem Dom lesen
			elm = $dom(elm);
		} // wenn string

		// wenn kein Objekt
		if (typeof elm !== "object") {
			return {};
		}

		var viewPort = ui.getViewport();
		var box = {};

		if (elm.getBoundingClientRect) {
			box = elm.getBoundingClientRect();
			box.scrollTop = elm.scrollTop;
			box.scrollLeft = elm.scrollLeft;
			box.scrollWidth = elm.scrollWidth;
			box.scrollHeight = elm.scrollHeight;

			// wenn ViewPort
			if (viewPort) {
				box.fromRight = viewPort.width - box.right;
				box.fromBottom = viewPort.height - box.bottom;
			} else {
				box.fromRight = 0;
				box.fromBottom = 0;
			}
		}
		return box;
	}; //ui.getBox

	//--- inViewport ---
	/** Prüft ob sich ein Element innerhalb (true) oder ausserhalb (false) der Ansicht befindet.
	 * @function inViewport
	 * @memberof LinfoUI
	 * @param {HTMLDomElement|string} elm	Element oder ID für welches die Information abgerufen werden soll
	 * @returns {boolean}	"true" wenn innerhalb der aktuellen Ansicht.
	 */
	this.inViewport = function (elm, offsetX, offsetY) {
		// wenn element ein string
		if (typeof elm === "string") {
			// Aus dem Speicher lesen
			elm = $dom(elm);
		} // wenn string

		if (!elm) return false;

		// Parameter
		var viewport = this.getViewport();
		var inViewX = true;
		var inViewY = true;

		if (!offsetX) {
			offsetX = 0;
		}
		if (!offsetY) {
			offsetY = 0;
		}

		// Relative Position lesen
		var cBox = this.getBox(elm);

		// wenn Top oder left < 0
		if (
			cBox.top < (0 + offsetY) ||
			(cBox.top > (0 + offsetY) &&
				cBox.bottom > (viewport.height - offsetY))
		) {
			inViewY = false;
		}
		if (
			cBox.left < (0 + offsetX) ||
			(cBox.left > (0 + offsetX) &&
				cBox.width > (viewport.width - offsetX))
		) {
			inViewX = false;
		}

		// Wenn eines von beiden false
		if (inViewX == false || inViewY == false) {
			return false;
		} else {
			return true;
		}
	}; // inViewport

	// Header einer Seite lesen
	this.readHeaders = function () {
		// Liste leeren
		headerList.List = [];

		// Header lesen
		var elmList = $doms("h1, h2, h3, h4, h5, h6");

		// Alle Header durchgehen
		elmList.forEach((elm, index) => {
			// id
			let id = "header-" + index;
			if (elm.id) {
				id = elm.id;
			}

			// Verschachtelungstiefe
			let step = 0;
			switch (elm.tagName) {
				case "H1":
					step = 1;
					break;
				case "H2":
					step = 2;
					break;
				case "H3":
					step = 3;
					break;
				case "H4":
					step = 4;
					break;
				case "H5":
					step = 5;
					break;
				case "H6":
					step = 6;
					break;
			}

			// Datensatz
			// "id", "step", "elm", "text"
			let ds = [
				id,
				step,
				elm,
				elm.innerText,
			];

			// in Liste einfügen
			headerList.List.push(ds);
		}); // forEach Header
	}; // readHeaders

	// Prüfen Ob ein Bild Existiert
	// ruft die callback Funktion mit (true) oder (false) auf
	function checkImageExists(url, callback) {
		const img = new Image();
		img.src = url;

		if (img.complete) {
			callback(true);
		} else {
			img.onload = () => {
				callback(true);
			};

			img.onerror = () => {
				callback(false);
			};
		}
	} // checkImageExists

	// ==============================
	//   Event Funktionen
	// -------------------

	//--- onscroll ---
	/**
	 * Prüft wärend dem Scrollen, ob die Index elemente im sichtbaren Bereich sind
	 * Und markiert diese als aktiv
	 */
	this.onscroll = function (e) {
		// alle Header
		headerList.List.forEach((ds) => {
			// ds = ["id", "step", "elm", "text"]
			let elm = ds[2];
			var isInView = this.inViewport(elm, 0, 60);
			if (isInView) {
				// todo: Aktiv setzen
				// ui.setActiveElm("#idx-" + index1, "index");
				return true;
			}
		});
	};
} // Flex
