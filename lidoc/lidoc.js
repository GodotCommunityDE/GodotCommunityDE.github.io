// ====================
//   lidoc APP
// 2024-09-14
// ====================

// Zeigt Markdown Seiten in einem HTML an

// @ts-check

// ==================
//   Imports
// -----------
import { parseMd } from "./parsemd.js";


// ==================
//   Types
// -----------

//** @typedef {import("lib.dom.d.ts").HTMLElement} HTMLElement */

/**
 * Konfiguration von Lidoc
 * @typedef {object} Config
 * @property {string} docPath    default: "/doc/" - Basis Pfad in dem die Markdown Dokumente liegen. Muss mit einem "/" enden!
 */

/**
 * [sub-list] Objekt
 * @typedef {object} SubListObj
 * @property {string} hash
 * @property {any} linkElm
 * @property {any} subElm
 */

// ===============================
//   Parameter
// ------------


/** @type {Config} */
const config = {
    docPath: "/doc/"
};

/** Liste aller [sub-list] Elemente. Der Key ist "hash" vom vorangestelltem Link(a) 
 * @type {SubListObj[]}
*/
let subList = [];


// ===============================
//   Funktionen
// -------------

/**
 * Gibt die Konfiguration aus
 * @returns {Config}
 */
export function getConfig() {
    return config;
}

/**
 * Nimmt Konfigurationen in einem Objekt entgegen
 * und schreibt diese in das Configurationsobjekt
 * @param {object} obj 
 */
export function setConfig(obj) {
    if (!obj || typeof obj != "object") { return; }
    if (Array.isArray(obj)) { return; }
    Object.assign(config, obj);
}


/**
 * Hash von URL lesen, um Seiteninhalte nachladen zu können
 * @returns {string} - URL der Markdownseite
 */
export function getHashUrl() {
    let siteUrl = window.location.hash;
    if (!siteUrl) {
        siteUrl = config.docPath + "index.md";
    } else {
        // Hash entfernen und Soursepaht hinzufügen
        siteUrl = config.docPath + siteUrl.substring(2);
    }
    if (siteUrl.endsWith("/")) {
        siteUrl += "index.md";
    }
    if (siteUrl.endsWith(".html")) {
        siteUrl = siteUrl.replace(".html", ".md");
    }
    if (!siteUrl.endsWith(".md")) {
        siteUrl += ".md";
    }
    return siteUrl;
}

/**
 * Text aus Datei vom Server
 * @param {string} url - URL für Text basierte Datei vom Server
 * @returns {Promise<string>} 
*/
async function fetchText(url) {
    const res = await fetch(url);
    if (res.ok) {
        const text = await res.text();
        return text;
    } else {
        return "# 404 not found";
    }
}


/**
 * Alle [sub-list] Elemente laden
 * //@param {any[]} linkList Liste mit Links, denen [sub-list] Elemente folgen
 * @returns 
 */
export function setSublist() {
    const linkList = document.querySelectorAll("nav a");
    if (!linkList) { return; }

    //console.log("linkList:", linkList);

    // bestehende Liste leeren
    subList = [];

    linkList.forEach((link) => {
        // @ts-ignore
        const linkUrl = link.hash;
        const subListElm = link.nextElementSibling;

        //console.log("subListObj:", linkUrl, subListElm);
        // Wenn Hash und Element
        if (linkUrl) {  //  && subListElm
            subList.push({ hash: linkUrl, linkElm: link, subElm: subListElm });
        }
    });
    // console.log("subList:", subList);
} // setSubList


// Navigation prüfen
function checkNav() {
    const hash = window.location.hash;

    // Alle [sub-list] Elemente durchgehen
    subList.forEach((obj) => {
        if (hash.startsWith(obj.hash)) {
            obj.subElm?.classList.remove("hidden");
            //console.log("hash:", hash, obj.hash);
            if (hash == obj.hash) {
                obj.linkElm.classList.add("active");
            } else {
                obj.linkElm.classList.remove("active");
            }
        } else {
            obj.subElm?.classList.add("hidden");
            obj.linkElm.classList.remove("active");
            // console.log("hidden:", obj.elm);
        }
    })
}


/**
 * Läd und Parsed Content aus einer Markdown Datei
 * Und Zeigt den Inhalt im Element an.
 * @param {any} elm - HTMLElement
 * @param {string} url - Pfad zur MD Datei die geladen wird
 * @returns {Promise<void>}
 */
export async function showContent(elm, url) {
    if (!url) { return; }
    if (!url.endsWith(".md")) { return; }

    // console.log("siteURL:", url);

    // Markdown als Text holen
    const mdString = await fetchText(url);
    //console.log("mdString:", mdString);

    // Markdown in SeitenData parsen
    const siteData = parseMd(mdString);

    //console.log("siteData:", siteData);

    // todo: Links mit HashTag ausbessern

    // todo: Template mit Inhalt zusammenführen

    // HTML im Body anzeigen
    elm.innerHTML = "";
    elm.insertAdjacentHTML("afterbegin", siteData.html.get("content"));
} // showSite



/**
 * Seite Parsen und anzeigen
 * @param {any} elm - URL zu der Seite die angezeigt wird
 */
export function showSite(elm) {
    const siteUrl = getHashUrl();
    showContent(elm, siteUrl);
    checkNav();
} // showSite

