// ====================
//  Index Controler
// -----------------
// @ts-check

// =======================
//   Imports
// ----------

import { showSite, showContent, setSublist } from "./lidoc/lidoc.js";

// =======================
//   Variablen
// ------------

// Selectoren
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Elemente lesen
const gridElm = $("f-grid");
const headerElm = $("#header");
const menueElm = $("#menue");
const toggleMenueElm = $("#toggle_menue");
const contentElm = $("#content");
const footerElm = $("#footer");


// =======================
//   Funktionen
// --------------


// =======================
//   Main
// --------------

export function main() {
    // Header u. Footer und Index laden
    showContent(headerElm, "/doc/_header.md");
    showContent(footerElm, "/doc/_footer.md");

    // Menues laden und Seite anzeigen
    showContent(menueElm, "/doc/_menue.md").then(() => {
        // [sub-list] Erstellen
        setSublist();
        showSite(contentElm);
    });

    // Menue Anzeigen wenn Hash
    if (window.location.hash?.length > 2) {
        gridElm.classList.remove("home");
    } else {
        gridElm.classList.add("home");
    }
}

// =======================
//   Events
// ------------

export function setEvents() {
    // Wenn sich der Hash ändert
    addEventListener("hashchange", (e) => {
        if (window.location.hash?.length > 2) {
            gridElm.classList.remove("home");
        } else {
            gridElm.classList.add("home");
        }

        showSite($("#content"));

        // @ts-ignore
        Prism.highlightAll();
    });

    // Menü anzeigen / ausblenden auf schmalen Bildschirmen
    toggleMenueElm.addEventListener("click", (e) => {
        console.log(menueElm.style.display);
        if (!menueElm.style.display || menueElm.style.display == "none") {
            menueElm.style.display = "block";
        } else {
            menueElm.style.display = "none";
        }
    })

}