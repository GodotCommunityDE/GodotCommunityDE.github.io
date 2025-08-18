// =======================
//   Formular Hilfen
// =======================
// @ts-check



// =============================
//   Funktionen
// -------------

/**
 * Gibt einen String mit formartierter Zahl zurück.  
 * z.B.: formatNumber(1234.5, 2, ",") => "1234,50"  
 * z.B.: formatNumber(-1234.5678, 2, ",", "___ ___,___") => "-1 234,57_"  
 * @param {string|number} num - Zahl die formatiert wird
 * @param {number} decimals - Anzahl der Dezimalstellen
 * @param {string} [base] - Optional Kommerzeichen. Default = "." 
 * @param {boolean} [seperate] - Optional Tausender Trennzeichen (thin space)
 * @returns {string} Formatierte Zahl
 */
export function formatNumber(num, decimals, base, seperate) {
    if (!decimals) { decimals = 0; }
    if (typeof decimals == "string") {
        decimals = parseInt(decimals);
    }
    
    const smalSpace = String.fromCharCode(8239);
    
    let numString = "";
    if (typeof num == "string") {
        num = num.replace(/\s/g, "");
        
        // Falsche Komma(",") ersetzen 
        let posPoint = num.lastIndexOf(".");
        let posKomma = num.lastIndexOf(",");
        if (posKomma > posPoint) {
            num = num.substring(0, posKomma) + "." + num.substring(posKomma + 1);
        } else {
            num = num.replaceAll(",", "");
        }
        numString = parseFloat(num).toFixed(decimals);
    } else if (typeof num == "number") {
        numString = "" + num.toFixed(decimals);
    } else {
        numString = "" + parseFloat("0").toFixed(decimals);
    }
    console.log("numstring:", numString);

    if (seperate) {
        // * schmales Leerzeichen 	U+2009 	8201 	THIN SPACE 	&#8201; 	&#x2009; 	&thinsp;
        // * schmales nicht umbrechendes Leerzeichen 	U+202F 	8239 	NARROW NO-BREAK SPACE 	&#8239; 	&#x202f; 	n. z.    // Dezimalstellen
        // 123 456 789.123 456 789

        let pos1 = numString.indexOf(".");
        let pos2 = pos1 > -1 ? pos1 - 3 : numString.length - 3;
        while (pos2 > 0) {
            //if (pos2 < numString.length && pos2 != pos1) {
            numString = numString.substring(0, pos2) + smalSpace + numString.substring(pos2);
            console.log("pos2:", pos2, numString);
            //}
            pos2 -= 3;
        }
    }

    // Kommazeichen setzen
    if (typeof base == "string" && base != ".") {
        numString = numString.replace(".", base);
    }


    return numString;
}

// =============================
//   Event Funktionen
// --------------------

// nächste Position einer Zahl finden
/**
 * Liefert eine neue Cursor Position im EingabeString, bei einer neuen Zahl zurück.
 * @param {string} input - Eingabe String
 * @param {number} cursorpos - Porition im Eingabestring
 * @param {boolean} isBackspace - Wenn zurück gelöscht
 * @returns {number} nächste Position im Eingabestring
 */
function nextDigit(input, cursorpos, isBackspace) {
    if (isBackspace) {
        for (let i = cursorpos - 1; i > 0; i--) {
            if (/\d/.test(input[i])) {
                return i
            }
        }
    } else {
        for (let i = cursorpos - 1; i < input.length; i++) {
            if (/\d/.test(input[i])) {
                return i
            }
        }
    }

    return cursorpos
}


// Bei Eingabe von Zahlen
/**
 * 
 * @param {InputEvent} e - Eingabe Event
 */
export function onInputNumber(e) {
    const targetElm = e?.target;
    if (!(targetElm instanceof HTMLInputElement || targetElm instanceof HTMLTextAreaElement)) {return;}
    let cursorPos = targetElm.selectionStart || 0;
    let value = targetElm.value;
    let decimals = parseInt(targetElm.dataset.dec || "0") || 0; // data-dec
    let base = targetElm.dataset.base || "."; // data-base
    
    // Position prüfen
    let isBackspace = (e?.data == null) ? true : false
    let nextCusPos = nextDigit(value, cursorPos, isBackspace)
    
    let formatInput = formatNumber(value, decimals, base, true)
    console.log("format:", formatInput);

    // Wert neu setzen
    if (formatInput != "NaN") {
        targetElm.value = formatInput;
    }

    targetElm.setSelectionRange(nextCusPos + 1, nextCusPos + 1);
}
