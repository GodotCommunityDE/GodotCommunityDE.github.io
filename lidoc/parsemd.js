// ===========================
//   Markdown Dateien Parsen
// 2024-09-08
// ===========================
// @ts-check

/** @typedef {import("./types.d.ts").ParseOptions} ParseOptions */
/** @typedef {import("./types.d.ts").SiteInfo} SiteInfo */


/**
 * Erzeugt aus dem Inhalt einer Markdown Datei
 * eine Seiten Information, mit geparstem html
 * @param {string} mdString 
 * @param {ParseOptions} [options] 
 * @returns {SiteInfo}
 */
export function parseMd(mdString, options) {
    // ====================
    //   Tag namen
    // ------------------
    const rowTag = options?.rowTag || "f-row";
    const colTag = options?.colTag || "f-item";

    // Regular Expression

    // Fettschrift
    const regularBold = new RegExp("\\*\\*(.*?)\\*\\*", "g");

    // ====================
    //   basis Variablen
    // ------------------

    // neue Seite
    /** @type {SiteInfo} */
    let site = {
        html: new Map(),
        data: {},
        imageList: [],
        linkList: [],
    };

    let newAttribute = "";
    let newColAttribute = "";
    let isData = false;
    let isCode = false;
    let isRow = false;
    let isRowCol = false;
    let isList = false;
    let isLi = false;
    let isP = false;
    let isTable = false;

    // HTML String
    let htmlString = "";
    let trimLine = "";
    let lastLine = "";
    let step = 0;
    let lastStep = 0;
    let listTag = "ul";
    let lastKey = "";
    /** @type {string[]} */
    let dataList = [];

    // Text aufsplitten
    /** @type {string[]} */
    let lines = mdString.split("\n");

    // Alle Tags schliessen
    let closeAllTags = function () {
        if (isP) {
            htmlString += "</p>";
            isP = false;
        }
        if (isLi) {
            htmlString += "</li>";
            isLi = false;
        }
        if (isList) {
            htmlString += "</" + listTag + ">";
            isList = false;
        }
        if (isTable) {
            htmlString += "</tr></thead><tbody></tbody></table>";
            isTable = false;
        }
        if (isRowCol) {
            htmlString += "</" + colTag + ">";
            isRowCol = false;
        }
        if (isRow) {
            htmlString += "</" + rowTag + ">";
            isRow = false;
        }
    };

    /**
     * Schließt alle Tags innerhalb einer Spalte
     */
    let closeRowCol = function () {
        if (isP) {
            htmlString += "</p>";
            isP = false;
        }
        if (isLi) {
            htmlString += "</li>";
            isLi = false;
        }
        if (isList) {
            htmlString += "</" + listTag + ">";
            isList = false;
        }
        if (isTable) {
            htmlString += "</tr></thead><tbody></tbody></table>";
            isTable = false;
        }
        if (isRowCol) {
            htmlString += "</" + colTag + ">";
            isRowCol = false;
        }
    };


    /**
     * Text prüfen auf Bilder Links und Fettschrift
     * @param {string} text - Text der geprüft wird
     * @returns {string}
     */
    let checkText = function (text) {
        let newText = text;

        // Auf Link oder Bild prüfen
        let linkPos2 = newText.indexOf("](");
        while (linkPos2 > 0) {
            const bildPos1 = newText.indexOf("![");
            const linkPos1 = newText.indexOf("[");
            const endPos = newText.indexOf(")", linkPos2);
            if (bildPos1 >= 0 && bildPos1 < linkPos2) {
                // Bild
                const part1 = newText.substring(0, bildPos1);
                const part2 = newText.substring(bildPos1 + 2, linkPos2);
                const part3 = newText.substring(linkPos2 + 2, endPos);
                const part4 = newText.substring(endPos + 1);

                // BildLink
                newText = part1 + "<img" + newAttribute + " tag='" + part2 + "' src='" + part3 +
                    "'>" + part4;
                site.imageList.push(part3);
            } else if (linkPos1 >= 0 && linkPos1 < linkPos2) {
                // Link
                const part1 = newText.substring(0, linkPos1);
                const part2 = newText.substring(linkPos1 + 1, linkPos2);
                const part3 = newText.substring(linkPos2 + 2, endPos);
                const part4 = newText.substring(endPos + 1);

                // Link
                newText = part1 + "<a href='" + part3 + "'>" + part2 + "</a>" +
                    part4;
                site.linkList.push(part3);
            } else {
                // Abbrechen bei keinem Gültigen Link oder Bild
                break;
            }

            linkPos2 = newText.indexOf("](");
        } // while linkPos2

        // Auf Fettschrift prüfen
        // @ts-ignore
        newText = newText.replaceAll(regularBold, "<b>$1</b>");
        return newText;
    };

    /**
     * Liste prüfen
     * @param {boolean} isSorted - true wenn sortierte Liste
     * @returns {void}
     */
    let checkListe = function (isSorted) {
        if (!trimLine || !trimLine.startsWith("- ")) return;

        // ListTag
        listTag = "ul";
        if (isSorted) {
            listTag = "ol";
        }

        // Text
        let text = trimLine.substring(2);
        text = checkText(text);

        // Wenn noch keine Liste oder Unterliste beginn
        if (!isList || step > lastStep) {
            if (step > 2 && step > lastStep) {
                htmlString += "<" + listTag + " sub-list" + newAttribute + ">";
            } else {
                htmlString += "<" + listTag + newAttribute + ">";
            }
            isList = true;
            newAttribute = "";
        }

        // wenn Einrückung kleiner voriger Einrückung
        if (step < lastStep) {
            // Wenn bereits ein List-Item
            if (isLi) {
                htmlString += "</li></" + listTag + ">";
            }
        } else if (isLi && step == lastStep) {
            htmlString += "</li>";
            isLi = false;
        }

        // neues ListenElement
        htmlString += "<li>" + text;
        isLi = true;

        // Stufe merken
        lastStep = step;
    }; // checkListe

    // Zeile prüfen
    /**
     * prüft eine Zeile auf den Markdown Zeilentyp
     * @returns {void}
     */
    let checkLine = function () {
        // Wenn Attribute Zeile
        if (trimLine.startsWith("[") && trimLine.endsWith("]")) {
            newAttribute = " " + trimLine.substring(1, trimLine.length - 1);
            return;
        }

        // Bei Leerzeilen alles schliessen
        if (trimLine == "") {
            closeAllTags();
            return;
        }

        if (trimLine == "%") {
            // Zeilenumbruch / Leerzeile
            htmlString += "</br>";
            return;
        }

        // Ab hier ist keine Leerzeile

        // Auf Attribute prüfen
        let tagAttribute = "";
        if (trimLine.endsWith("]")) {
            const pos1 = trimLine.lastIndexOf(" [");
            if (pos1 >= 0) {
                tagAttribute = " " +
                    trimLine.substring(pos1 + 2, trimLine.length - 1);
                trimLine = trimLine.substring(0, pos1);
            }
        }


        if (trimLine == "---") {
            // Spalten schliessen
            closeRowCol();
            newColAttribute = tagAttribute;
            return;
        }

        // Wenn zuvor ein Spaltenbeginn
        if (lastLine == "---") {
            // Prüfen auf Zeile
            if (!isRow) {
                htmlString += "<" + rowTag + newAttribute + ">";
                isRow = true;
                newAttribute = "";
            }

            // Spalte anlegen
            if (!isRowCol) {
                htmlString += "<" + colTag + newColAttribute + ">";
                isRowCol = true;
                tagAttribute = "";
                newColAttribute = "";
            }
        } // Spalten Beginn

        // Liste
        if (trimLine.startsWith("- ")) {
            // Liste prüfen
            checkListe(false);
            return;
        }
        const pos2 = trimLine.indexOf(". ");
        if (pos2 > 0 && pos2 <= 2) {
            // Sortierte Liste prüfen
            checkListe(true);
            return;
        }

        // Tabelle
        if (trimLine.startsWith("| ")) {
            // Tabelle prüfen
            if (!isTable) {
                htmlString += "<table" + newAttribute + "><thead><tr>";
                isTable = true;
                newAttribute = "";
            }

            // Tabellen Spalte
            let text = trimLine.substring(2);
            htmlString += "<td" + tagAttribute + ">" + text + "</td>";
            return;
        }

        // Wenn Überschriften
        const pos1 = trimLine.indexOf("# ");
        if (pos1 >= 0) {
            const praefix = trimLine.substring(0, pos1 + 1);
            const text = trimLine.substring(pos1 + 2);
            if (praefix == "#") {
                // H1
                htmlString += "<h1" + tagAttribute + ">" + text + "</h1>";
                tagAttribute = "";
                return;
            }
            if (praefix == "##") {
                // H6
                htmlString += "<h2" + tagAttribute + ">" + text + "</h2>";
                tagAttribute = "";
                return;
            }
            if (praefix == "###") {
                // H6
                htmlString += "<h3" + tagAttribute + ">" + text + "</h3>";
                tagAttribute = "";
                return;
            }
            if (praefix == "####") {
                // H4
                htmlString += "<h4" + tagAttribute + ">" + text + "</h4>";
                tagAttribute = "";
                return;
            }
            if (praefix == "#####") {
                // H5
                htmlString += "<h5" + tagAttribute + ">" + text + "</h5>";
                tagAttribute = "";
                return;
            }
            if (praefix == "######") {
                // H6
                htmlString += "<h6" + tagAttribute + ">" + text + "</h6>";
                tagAttribute = "";
                return;
            }

            return;
        } // Überschriften Header

        // =============================
        //   nur Text
        // -----------

        let text = checkText(trimLine);

        if (!isP) {
            htmlString += "<p" + tagAttribute + ">" + text;
            isP = true;
        } else {
            htmlString += "</br>" + text;
        }
    }; // checkLine

    /**
     * Prüft Zeile auf Code
     * @param {string} line - Zeile die auf Code überprüft wird
     * @returns {void}
     */
    let checkCode = function (line) {
        // Code beenden
        if (isCode && trimLine == "```") {
            htmlString += "</code></pre>";
            isCode = false;
            return;
        }

        // Code Starten
        if (!isCode && trimLine.startsWith("```")) {
            let codeParam = trimLine.substring(3);

            if (codeParam != "") {
                // code Parameter setzen
                htmlString += "<pre><code class='language-" + codeParam + "' >";
            } else {
                htmlString += "<pre><code>";
            }
            isCode = true;
            return;
        }

        // CodeZeile hinzufügen
        if (isCode) {
            /** @type {string} */
            // @ts-ignore
            let newLine = line.replaceAll("<", "&lt;"); // < HTML-TAG Zeichen müssen umgewandelt werden
            htmlString += newLine + "\n";
        }
    }; // checkCode

    /**
     * Prüft auf Header Daten im Markdown
     * @returns {void}
     */
    let checkData = function () {
        // auf Listen Eintrag prüfen
        if (trimLine.startsWith("- ")) {
            dataList.push(trimLine.substring(2));
            return;
        }

        // Auf Liste prüfen
        if (trimLine.endsWith(":")) {
            lastKey = trimLine.substring(0, trimLine.length - 1);
            dataList = [];
            site.data[lastKey] = dataList;
            return;
        }

        // Auf Text prüfen
        let pos1 = trimLine.indexOf(": ");
        if (pos1 > 0) {
            lastKey = trimLine.substring(0, pos1);
            let text = trimLine.substring(pos1 + 2);
            site.data[lastKey] = text;
        } else if (pos1 < 0) {
            site.data[lastKey] += "\n" + trimLine;
        }
    }; // checkData

    // Alle Zeilen durchgehen
    lines.forEach((line, index) => {
        trimLine = line.trim();
        step = line.length - trimLine.length;

        // Data
        if (index == 0 && trimLine == "---") {
            // Daten prüfen
            isData = true;
            return;
        } else if (isData) {
            if (trimLine == "---") {
                isData = false;
                return;
            }

            checkData();
        } else if (isCode || trimLine.startsWith("```")) {
            // Code prüfen
            checkCode(line);
        } else {
            // Zeilen prüfen
            checkLine();
            lastLine = trimLine;
        }
    });

    // Alles schiessen
    closeAllTags();

    // geparsten HTML String zurückgeben
    site.html.set("content", htmlString);
    return site;
} // parseMd
