// ==================
//   Info Liste
// ==================
// @ts-check


// ===============================
//   Typen
// --------------

// [date|special(30){>0;10}/regex/=default]

/**
 * @typedef {object} ColFormat
 * @property {boolean} [optional] - Wenn der Wert NULL sein Kann oder nicht angegeben
 * @property {"date"|"datetime"|"time"|"period"|null} [date] - "null" oder "undefined" wenn nicht vorhanden. Wenn type "number" dann ist es ein UNIX timestamp in millisekunden. Monate("2024-11"), Wochen("2024W12") sind vom DateFormat "date"
 * @property {string} [subtype] - Name eines Speziellen Types 
 * @property {string|number|boolean} [default] - Defaultwert, der beim Anlegen gesetzt wird
 * @property {number} [size] - Größe (gesamt)
 * @property {number} [decimals] - Anzahl der Dezimalstellen 
 * @property {number} [min] - Minimalwert
 * @property {number} [max] - Maimalwert
 * @property {number} [greater] - Größer als angegeben (exklusive der angegebenen zahl)
 * @property {number} [lower] - Kleiner als angegeben (kleiner der angegeben zahl)
 * @property {string} [regex] - Regular Expression zum Testen eines Wertes
 * @property {any} [defaultValue] - Standard-Wert der Eigenschafft
 * @property {boolean} [charToBool] - true wenn der Charakter "J" in "true" umgewandelt werden soll.
 */

/** @typedef {"string"|"number"|"boolean"|"object"|"list"} InfoTypes */

/**
 * @typedef {object} GridObject
 * @property {string} name
 * @property {number} idColNumber
 * @property {number[]} idColNumbers
 * @property {string[]} cols
 * @property {object} findex
 * @property {InfoTypes[]} types
 * @property {Array<string|undefined|null>} links
 * @property {ColFormat[]} [formats]
 * @property {any[]} [data]
 */


// ===============================
//   Constanten
// --------------

const regexTemplate = /{{(.*?)}}/g;
const regexFor = /{{(for)}}/g;

/** 
 * Auflistung aller GridListen
 * @type {Map<string,GridList>}
 */
export const lists = new Map();


// ===============================
//   Klasse
// --------------

/**
 * @class GridList
 */
export class GridList {
    /** Name der Liste @type {string} */
    #name = "";

    /** Nummer der ID-Spalte @type {number} */
    #idColNumber = -1;

    /** Nummern der ID-Spalte wenn mehrere Spalten eine eindeutige ID ergeben @type {number[]} */
    #idColNumbers = [];

    /** Liste Mit SpaltenNamen @type {string[]} */
    #cols = [];
    get cols() {
        return this.#cols;
    }

    /** Objekt wo Key = Spaltenname und Value = Index der Spalte @type {Object<string,number>} */
    #findex = {};

    /** Liste mit Typbezeichnung für jede Spalte @type {InfoTypes[]} */
    #types = [];

    /** Liste mit Namen zu verlinkten Liste für die jeweilige Spalte @type {Array<string|undefined|null>} */
    #links = [];

    /** Liste mit Format Objekten für die einzelnen Spalten @type {ColFormat[]} */
    #formats = [];

    /** Interner Datenspeicher @type {Map<string|number,any[]>} */
    #data = new Map();

    /** 
     * MAP mit Index für Sortierung und Filter der Daten.  
     * Key ist der IndexName und Value ist eine Liste mit Datensatz ID's der sortierten/gefilterten Datenzeilen
     *  @type {Map<string,Array<string|number>>} 
     */
    #index = new Map();

    set name(newName) {
        if (!newName) {
            newName = GSID();
        }
        this.#name = newName;

        // name registrieren
        lists.set(this.name, this);
    }
    get name() {
        return this.#name;
    }

    /** Anzahl der Datenzeile in der Liste @type {number} */
    get length() {
        return this.#data.size;
    }


    /**
     * Setzt das ID-Feld und mekt sich den ID-Index.
     * Felder müssen vorher in der Liste existieren.
     * @function setIdCol
     * @param {string|number|Array<string|number>} colName - ID Spaltenname oder Spaltennummer oder Liste davon, die eine eindeutige ID ergeben
     */
    setIdCol(colName) {
        if (typeof colName == "string" && colName.indexOf(",") > 0) {
            colName = colName.split(",").map(name => {return name.trim();});
        }

        if (typeof colName == "string") {
            //this.#idColNumber = this.#cols.indexOf(col);
            this.#idColNumber = this.#findex[colName];
            if (this.#idColNumber == undefined && colName == "GSID") {
                let cIndex = this.#cols.indexOf("GSID");
                if (cIndex < 0) {
                    cIndex = this.#cols.push("GSID") -1;
                    this.#types[cIndex] = "string";
                }
                this.#findex.GSID = cIndex;
                this.#idColNumber = cIndex;
            }
            this.#idColNumbers = [];
        } else if (typeof colName == "number") {
            this.#idColNumber = colName;
            this.#idColNumbers = [];
        } else if (Array.isArray(colName)) {
            this.#idColNumber = -1;
            this.#idColNumbers = [];

            // Alle Einträge Prüfen
            for (let i = 0; i < colName.length; i++) {
                switch (typeof colName[i]) {
                    case "string":
                        //this.#idColNumbers.push(this.#cols.indexOf(col[i] + ""));
                        this.#idColNumbers.push(this.#findex[colName[i] + ""]);
                        break;
                    case "number":
                        this.#idColNumbers.push(parseInt(colName[i] + ""));
                        break;

                    default:
                        break;
                }
            }
        }
    }
    /**
     * @param {string|number|Array<string|number>} colName - Name der Spalte
     */
    set idCol(colName) {
        this.setIdCol(colName);
    }
    /**
     * @returns {string|string[]}
     */
    get idCol() {
        if (this.#idColNumber > -1) {
            return this.#cols[this.#idColNumber];
        } else {
            const ids = [];
            for (let i = 0; i < this.#idColNumbers.length; i++) {
                ids.push(this.#cols[this.#idColNumbers[i]]);
            }
            return ids;
        }
    }


    /**
     * Holt aus einer Datenzeile die ID laut gespeicherten idIndex
     * @function getID
     * @param {any[]|Object<string,any>} dataRow - Datenzeile Array
     * @returns {string|number|undefined} ID
     */
    getID(dataRow) {
        if (typeof dataRow != "object") { return -1; }
        
        // auf GSID prüfen
        let isGSID = false;
        if (this.#cols[this.#idColNumber] == "GSID") {
            isGSID = true;
        }

        // wenn Array
        if (Array.isArray(dataRow)) {
            if (this.#idColNumber < 0) {
                let id = "";
                for (let i = 0; i < this.#idColNumbers.length; i++) {
                    let id2 = dataRow[this.#idColNumbers[i]];
                    if (id2 == undefined || id2 == null || id2 === "") {
                        return undefined;
                    }                    
                    id += id2 + "_";
                }
                return id;
            } else {
                let id = dataRow[this.#idColNumber];
                if (id == undefined || id == null || id === "") {
                    if (isGSID) {
                        id = GSID();
                        dataRow[this.#idColNumber] = id;
                    } else {
                        return undefined;
                    }
                }
                return id;
            }
        } else {
            // Wenn Objekt
            if (this.#idColNumber < 0) {
                let id = "";
                for (let i = 0; i < this.#idColNumbers.length; i++) {
                    let id2 = dataRow[this.#cols[this.#idColNumbers[i]]];
                    if (id2 == undefined || id2 == null || id2 === "") {
                        return undefined;
                    }                    
                    id += id2 + "_";
                }
                return id;
            } else {
                let id = dataRow[this.#cols[this.#idColNumber]];
                if (id == undefined || id == null || id === "") {
                    if (isGSID) {
                        id = GSID();
                        dataRow.GSID = id;
                    } else {
                        return undefined;
                    }
                }
                return id;
            }
        }
    } // getID


    /**
     * Setzt oder löscht, für die Angegebene Spalte, den Link(Verknüpfung) zu einer anderen Liste
     * @function setColLink
     * @param {string|number} col - Spaltenname oder Splaltennummer
     * @param {string|undefined|null} [listName] - Name der GridListe. Wenn nicht angegeben wird der Link(Verknüpfung) gelöscht.
     * @returns {void}
     */
    setColLink(col, listName) {
        this.#links[this.getColNumber(col)] = listName;
    }


    /**
     * Liest den Listennamen der Verknüpften Liste vom angegebenen Feldindex aus
     * @function getColLink
     * @param {string|number} col - Spaltennummer oder Spaltenname
     * @returns {string|undefined|null} Name der Liste. Kann mit lists.get(name) gelesen werden.
     */
    getColLink(col) {
        return this.#links[this.getColNumber(col)];
    }


    /**
     * Setzt die SpaltenNamen der GridListe  
     * Der Typ der neuen Spalten wird auf "string" gesetzt, außer es wird nach dem Spaltennamen mit einem Leerzeichen getrennt, der Typ angegeben.  
     * Der Typ darf nur einen der folgenden Texte enthalten:  
     * "string" | "number" | "boolean" | "object" | "list"  
     * !!!ACHTUNG!!! es werden dabei alle bestehenden Daten gelöscht.
     * @function setCols
     * @param {string|string[]} cols - Liste Mit Spaltennamen, oder String mit Trennzeichen getrennt
     * @param {string|string[]} idCol - Spaltenname des ID Feldes, oder Liste von Spaltennamen, die eine eindeutige Kennung ergeben. Zum generieren einer eindeutigen ID kann auch "GSID" angegeben werden.
     * @param {string} [seperator] - Trennzeichen muss angegeben werden wenn fieldList ein String mit Trennzeichen ist
     */
    setCols(cols, idCol, seperator) {
        if (!cols) { return; }
        /**
         * @type {string | any[]}
         */
        let newFields = [];

        if (Array.isArray(cols)) {
            newFields = cols;
        } else if (typeof cols == "string" && seperator) {
            newFields = cols.split(seperator);
        }

        // bestehende Spalten löschen
        // todo: Eventuell mit bestehenden Spalten zusammenmergen ????
        this.#cols = new Array(newFields.length);
        this.#findex = {};
        this.#links = new Array(newFields.length);
        this.#types = new Array(newFields.length);

        // alle neuen Spalten durchgehen
        for (let i = 0; i < newFields.length; i++) {
            let name = newFields[i].trim();

            // Wenn ein leerzeichen im Namen
            if (name.indexOf(" ") > -1) {
                // Type steht nach namen
                const nameType = name.split(" ");

                this.#cols[i] = nameType[0];

                // SpaltenIndex merken
                this.#findex[nameType[0]] = i;

                if (nameType[2]) {
                    this.#links[i] = nameType[2];
                }

                // auf richtige Typen prüfen
                if ("|string|number|boolean|object|list|".indexOf(nameType[1]) > -1) {
                    this.#types[i] = nameType[1];

                    //  Wenn keine verknüpfte Liste
                    if ((nameType[1] == "object" || nameType[1] == "list") && !nameType[2]) {
                        // Liste Name wird vom SpaltenNamen angenommen
                        this.#links[i] = nameType[0];
                    }
                } else {
                    // wenn kein Typ angegeben dann immer "string"
                    this.#types[i] = "string";
                }
            } else {
                this.#cols[i] = name;

                // SpaltenIndex merken
                this.#findex[name] = i;

                // Standard Typ
                this.#types[i] = "string";
            } // if else indexof(" ")
        } // for newFields

        // ID Spalte setzen
        this.setIdCol(idCol);

        // Daten passen dann nicht mehr zu Spalten und werden gelöscht
        this.#data = new Map();
    } // setCols


    /**
     * Setzt die Spalten der Liste anhand eines Javascript Objektes.  
     * Die Feldtypen werden von den Werten in den Eigenschaften bestimmt.  
     * Ist der Wert nicht ermittelbar, wird "string" angenommen.  
     * Ist der Wert ein "object" oder "array", so wird der ListenName(Verlinkung) gleich dem Eigenschaftsnamen angenommen.  
     * @function setColsFromObject
     * @param {Object<string,any>} obj - Objekt dessen Eigenschaften als Spaltennamen registriert werden
     * @param {string|Array<string>} idCol - Name der Eigenschaft die als Eindeutige ID genommen wird. Für eine ID Generierung kann auch "GSID" angegeben werden.
     */
    setColsFromObject(obj, idCol) {
        if (typeof obj != "object") { return; }
        if (Array.isArray(obj)) { return; }

        // Eigenschaft Namen vom Objekt lesen
        const keyList = [...Object.keys(obj)];

        // Typ Prüfung
        for (let i = 0; i < keyList.length; i++) {
            switch (typeof obj[keyList[i]]) {
                case "bigint":
                    keyList[i] = keyList[i] + " number";
                    break;
                case "boolean":
                    keyList[i] = keyList[i] + " boolean";
                    break;
                case "number":
                    keyList[i] = keyList[i] + " number";
                    break;
                case "object":
                    if (Array.isArray(keyList[i])) {
                        keyList[i] = keyList[i] + " list " + keyList[i];
                    } else {
                        keyList[i] = keyList[i] + " object " + keyList[i];
                    }
                    break;

                default:
                    break;
            }
        }

        // Spalten setzen
        this.setCols(keyList, idCol);
    }


    /**
     * Setzt für die angegebene Spalte die Format einstellungen
     * @function setColFormat
     * @param {string|number} col - Spaltenname oder Nummer
     * @param {ColFormat} formatObj - FormatObjekt für die Spalte
     */
    setColFormat(col, formatObj) {
        if (!formatObj) { formatObj = {}; }
        this.#formats[this.getColNumber(col)] = formatObj;
    }

    /**
     * Liefert vom der angegebenen Spalte das Format Objekt zurück
     * @param {string|number} col - Splatenname oder SplantenNummer 
     * @returns {ColFormat|undefined} Format Objekt wenn vorhanden
     */
    getColFormat(col) {
        return this.#formats[this.getColNumber(col)];
    }


    /**
     * Ersetzt alle Daten mit einem neuen GridObject
     * @param {GridObject} obj - Grid Objekt
     * @returns {boolean} true wenn die daten übernommen wurden
     */
    createFromGridObject(obj) {
        try {
            if (!obj) { return false; }
            if (!obj.cols || !obj.types) { return false; }

            // Standard Eigenschaften
            this.name = obj.name;
            this.#cols = obj.cols;
            this.#findex = obj.findex;
            this.#types = obj.types;
            this.#links = obj.links;
            this.#formats = obj.formats || [];

            // idIndex
            this.#idColNumber = obj.idColNumber;
            this.#idColNumbers = obj.idColNumbers;

            // Daten in Map
            this.#data = new Map();
            if (obj.data) {
                const dataLength = obj.data.length;
                for (let i = 0; i < dataLength; i++) {
                    let id = this.getID(obj.data[i]);
                    if (id != undefined) {
                        // nur Datensätze mit ID kommen in die Liste!!!
                        this.#data.set(id, obj.data[i]);
                    }
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }

        return true;
    } // createFromInfoObject


    /**
     * Liefert die Gridliste als Javascript Objekt zurück
     * @returns {GridObject} Gridliste als Javascript Objekt
     */
    getAsGridObject() {
        /** @type {GridObject} */
        const newObj = {};

        // Standard Eigenschaften
        newObj.name = this.name;
        newObj.cols = this.#cols;
        newObj.findex = this.#findex;
        newObj.types = this.#types;
        newObj.links = this.#links;
        newObj.formats = this.#formats || [];

        newObj.idColNumber = this.#idColNumber;
        newObj.idColNumbers = this.#idColNumbers;

        // Daten aus Map
        const valueList = [...this.#data.values()];

        /** @type {any[]} */
        const data = [];
        newObj.data = data;

        valueList.forEach(value => {
            data.push(value);
        })

        return newObj;
    } // getAsInfoObj()


    /**
     * Diese Funktion liefert eine Zeile(Array/Slice) zurück
     * die Spalten Reihenfolge der Daten bestimmt die "cols" Eigenschaft von der GridList
     * @param {string|number} key - ID der Zeile 
     * @returns {any[]|undefined}
     */
    #getRow(key) {
        return this.#data.get(key);
    }


    /**
     * Löscht eine Datenzeile aus der Liste
     * @param {string|number} key - ID des Datenzeile
     * @returns {boolean} true wenn die Datenzeile gelöst wurde
     */
    deleteRow(key) {
        return this.#data.delete(key);
    }


    /**
     * Gibt einen Datensatz als Objekt zurück
     * @param {any[]} dataRow - Datensatz Zeile 
     * @returns {object} Datensatz als Objekt
     */
    #getObjFromRow(dataRow) {
        /** @type {Object<string,any>} */
        const obj = {};
        if (!dataRow) { return obj; }

        // Alle Felder durchgehen
        for (let i = 0; i < this.#cols.length; i++) {
            obj[this.#cols[i]] = dataRow[i];
        };

        // Objekt zurückgeben
        return obj;
    }


    /**
     * Diese Funktion liefert den Datensatz als neues Objekt zurück.
     * Wenn kein Datensatz gefunden, wird ein neues leeres Objekt zurück geliefert.
     * @param {string|number} rowID 
     * @returns {object}
     */
    get(rowID) {
        return this.#getObjFromRow(this.#data.get(rowID) || []);
    }


    /**
     * Erstellt eine neue Datenzeile. Wenn die "id" angegeben wird diese Datenzeile der Liste hinzugefügt.
     * @param {string|number} [id] - Optionale neue ID der Datenzeile
     * @returns {any[]} neue Datenzeile
     */
    #newRow(id) {
        // neue Datenzeile
        const dataRow = new Array(this.#cols.length);

        if (id != undefined) {
            // ID in neue Datenzeile setzen
            if (this.#idColNumber > -1) {
                dataRow[this.#idColNumber] = id;
            } else if (typeof id == "string") {
                const ids = id.split("_");
                for (let i = 0; i < this.#idColNumbers.length; i++) {
                    dataRow[this.#idColNumbers[i]] = ids[i];
                }
            }

            // Neu anlegen
            this.#data.set(id, dataRow);
        }

        // neue Datenzeile zurückgeben
        return dataRow;
    }


    /**
     * Interne Funktion zum setzen eines wertes in eine Datenzeile
     * @param {any[]} dataRow - Datenzeile
     * @param {string|number} col - Name oder index der Spalte
     * @param {any} value - Wert der gesetzt wird
     */
    #setCellValue(dataRow, col, value) {
        if (!Array.isArray(dataRow)) { return; }

        const i = this.getColNumber(col);

        // link lesen
        const link = this.#links[i] || "";

        // Typ prüfen
        switch (this.#types[i]) {
            case "string":
                dataRow[i] = value + "";
                break;
            case "number":
                if (!Number.isNaN(value)) {
                    dataRow[i] = value;
                } else {
                    dataRow[i] = -1;
                }
                break;
            case "boolean":
                if (typeof value == "boolean") {
                    dataRow[i] = value;
                } else if (typeof value == "string") {
                    if (value == "" || value == "false" || value == "0") {
                        dataRow[i] = false;
                    } else {
                        dataRow[i] = true;
                    }
                } else {
                    dataRow[i] = true;
                }
                break;
            case "object":
                if (Array.isArray(value)) {
                    // Wert nicht ändern
                } else if (typeof value == "object") {
                    // FremdListe lesen
                    let foreignList = lists.get(link);
                    if (foreignList == undefined) {
                        // neue Liste
                        foreignList = new GridList(link);
                        let id = "id"
                        if (value.id == undefined) {
                            // erzeuge eine GSID
                            value.GSID = GSID();
                            id = "GSID";
                        }

                        foreignList.setColsFromObject(value, id);
                    }
                    // Objekt in Subliste einfügen und ID als Wert
                    dataRow[i] = foreignList.setObject(value);
                } else {
                    // bereits ein Key ???
                    dataRow[i] = value;
                }
                break;
            case "list":
                if (Array.isArray(value)) {
                    if (typeof value[0] == "object") {
                        let foreignList = lists.get(link);
                        if (foreignList == undefined) {
                            // neue Liste
                            foreignList = new GridList(link);
                            let id = "id"
                            if (value[0].id == undefined) {
                                // erzeuge eine GSID
                                value[0].GSID = GSID();
                                id = "GSID";
                            }
                            foreignList.setColsFromObject(value[0], id);
                        }
                        // Objekt in Subliste einfügen und ID als Wert
                        dataRow[i] = foreignList.setObject(value);
                    } else {
                        // Bereits eine Key Liste ???
                        dataRow[i] = value;
                    }
                }
                break;
            default:
                dataRow[i] = value;
                break;
        }
    }


    /**
     * Schreibt die Daten des angegebenen Objektes in die Gridliste.
     * Ist bereits ein Eintrag mit der selben ID vorhanden, so wird vorhandene Eigenschaften überschrieben.  
     * !!! WICHTIG !!! - Bereits vorhandenen sortierte oder gruppierte Indexes werden nicht angepasst.
     * @param {Object<string,any>} obj - Daten Objekt
     * @returns {string|number|undefined|any[]} ID des eingefügten Objektes
     */
    setObject(obj) {
        if (!obj || typeof obj != "object") { return; }
        if (Array.isArray(obj)) {
            const newIds = [];
            for (let i = 0; i < obj.length; i++) {
                newIds.push(this.setObject(obj[i]));
            }
            return newIds;
        }

        // neue Datenzeilen
        // Prüfen / lesen von bestehender Datenzeile
        let isNewRow = false;
        const id = this.getID(obj);
        
        // nur Datensätze mit ID kommen in die Liste
        if (id == undefined) {return id;}

        let dataRow = this.#getRow(id)
        if (dataRow == undefined) {
            dataRow = this.#newRow(id);
            isNewRow = true;
        }

        // alle registrierten Spalten durchgehen        
        for (let i = 0; i < this.#cols.length; i++) {
            const key = this.#cols[i];

            // nur wenn Objekt den Key hat
            if (obj[key] == undefined) { continue; }

            // Wert lesen
            let value = obj[key];

            this.#setCellValue(dataRow, i, value);
        } // for this#cols

        // Neue Datenzeile wird schon bei "this.#newRow(id)" angelegt.
        // wenn neue Datenzeile
        //if (isNewRow) {
        //    this.#data.set(id, dataRow);
        //}
        return id;
    }


    /**
     * Liefert auf Grund des angegebenen Spaltennamen
     * die Position/Nummer der Spalte in der GridList zurück
     * @param {string|number} col - Name der gesuchten Splate
     * @returns {number} - Index Position des gesuchten Feldes. -1 wenn nicht gefunden.
     */
    getColNumber(col) {
        if (typeof col == "string") {
            if (col.indexOf(" ") >= 0) {
                col = col.split(" ")[0];
            }
            //return this.#cols.indexOf(col);
            return this.#findex[col];
        } else if (typeof col == "number") {
            return col;
        }
        return -1;
    }


    /**
     * Liefert eine Liste an Positionen/Nummern der angegebenen Spaltennamen zurück.
     * Für Spaltennamen die nicht in der GridListe gefunden werden, wird -1 als Position zurück gegeben.
     * @param {Array<string|number>} colNameList - Liste mit Feldnamen
     * @returns {number[]} - Liste mit Spalten-Positionen der gesuchten Spalten. -1 wenn die Spalte nicht in der Gridliste gefunden wurde.
     */
    getColNumbers(colNameList) {
        if (!colNameList || !Array.isArray(colNameList)) {
            return [];
        }

        /** @type {number[]} */
        const indexes = [];

        for (let i = 0; i < colNameList.length; i++) {
            indexes.push(this.getColNumber(colNameList[i]));
        }

        return indexes;
    }


    /**
     * Liest den Wert einer Spalte(field) vom angegebenen Datensatz(id) aus.
     * @param {string|number} rowID - ID des Datensatzes(Zeile)
     * @param {string|number} colName - Feldname von dem der Wert gelesen wird
     * @returns {any|undefined} Wert vom angegebenen Datensatz-Feld 
     */
    getCellValue(rowID, colName) {
        if (!rowID) { return undefined; }
        const colIndex = this.getColNumber(colName);

        if (colIndex > -1) {
            const dataRow = this.#data.get(rowID);
            if (dataRow) {
                return dataRow[colIndex];
            }
            return undefined;
        } else {
            return undefined;
        }
    }


    /**
     * Setzt den Wert(value) einer Spalte im Datensatz(id)  
     * Die Zelle muss in der Liste vorhanden sein
     * @param {string|number} rowID - ID des Datenzeile
     * @param {string|number} colName - SpaltenName oder nummer
     * @param {any} value - Wert der für das angegebene Feld gesetzt wird
     * @returns {void}
     */
    setCellValue(rowID, colName, value) {
        if (rowID == undefined || colName == undefined) { return; }

        let dataRow = this.#data.get(rowID);
        if (!dataRow) {
            // neue Datenzeile
            dataRow = this.#newRow(rowID);
        }

        // Zellenwert setzen
        this.#setCellValue(dataRow, colName, value);
    } // setCellValue


    /**
     * Gibt ein Array an Werten für die Spalten(fieldList) eines Datensatzes(id) zurück.
     * @param {string|number} rowID - ID des Datensatzes
     * @param {Array<string|number>} colList - Liste mit Spaltennamen oder Spaltennummern
     * @returns {any[]} Liste mit Werten der angegebenen Spalten
     */
    getColValues(rowID, colList) {
        if (rowID == undefined) { return []; }
        if (!colList || !Array.isArray(colList)) {
            return [];
        }

        const dataRow = this.#data.get(rowID);
        if (!dataRow) { return []; }

        const valueList = [];

        for (let i = 0; i < colList.length; i++) {
            const index = this.getColNumber(colList[i]);
            valueList.push(dataRow[index]);
        };

        return valueList;
    }


    /**
     * Gibt eine Liste aller Id's zurück
     * @returns {Array<string|number>} Liste aller ID's
     */
    getIdList() {
        // Alle Keys von der map
        return [...this.#data.keys()];
    }
    /**
     * gibt eine Liste aller Id's zurück
     * @alias getIdList
     * @returns {Array<string|number>} Liste aller ID's
     */
    keys() {
        return [...this.#data.keys()];
    }


    /**
     * Liefert alle Datenzeilen als Objekte, oder nur die Datenzeilen mit angegebenen Index oder Liste von IDs, in einer Liste zurück.
     * @param {string|Array<string|number>} [index] - Optional Index oder Liste mit Datensatz ID's
     * @returns {object[]} Liste mit Datenobjekten
     */
    getRows(index) {
        const newList = [];
        /** @type {Array<string|number>} */
        let indexList = [];

        if (Array.isArray(index)) {
            indexList = index;
        } else if (typeof index == "string") {
            indexList = this.#index.get(index || "") || [...this.#data.keys()];
        } else {
            indexList = [...this.#data.keys()];
        }

        // alle Keys durchgehen
        for (let i = 0; i < indexList.length; i++) {
            newList.push(this.get(indexList[i]));
        }
        return newList;
    }


    /**
     * Merkt sich alle Datenzeilen, oder die Datenzeilen vom "oldIndex", unter angegebenen Index(newIndex)
     * @param {string} newIndexName - Index Name unter dem die Datenzeilen angelegt werden
     * @param {string|Array<string|number>} [oldIndex] - optional bestehender Index(Name oder ID-Liste) von dem die Daten gelesen werden
     * @returns {void}
     */
    setIndex(newIndexName, oldIndex) {
        if (typeof newIndexName != "string") { return; }
        if (Array.isArray(oldIndex)) {
            this.#index.set(newIndexName, oldIndex);
        } else if (typeof oldIndex == "string") {
            this.#index.set(newIndexName, this.#index.get(oldIndex) || [...this.#data.keys()]);
        } else {
            this.#index.set(newIndexName, [...this.#data.keys()]);
        }
    }


    /**
     * Liefert eine Liste aller Datensatz(Zeilen) ID's zurück wenn kein "indexName" angegeben.  
     * Bei "indexName" wird die ID-Liste vom bestehenden Index zurückgegeben.
     * @param {string} [indexName] - Optionaler Name des Index
     * @returns {Array<string|number>} Liste mit ID's vom Index
     */
    getIndex(indexName) {
        return this.#index.get(indexName || "") || [...this.#data.keys()];
    }


    /**
     * Prüft ob der Index bereits in der Liste existiert
     * @param {string} indexName - Name des gesuchten Index
     * @returns {boolean} true wenn Index vorhanden
     */
    hasIndex(indexName) {
        return this.#index.has(indexName);
    }
    

    /**
     * Sortiert die Daten nach angegebenen Spalten. Groß-Kleinschreibung bei Texten wird ignoriert.
     * Wenn "index" angegeben, und der Index vorhanden ist, werden die Daten unter diesem Index sortiert, und unter dem selben Index abgelegt.
     * Wenn "index" angegeben, und noch nicht angelegt, werden alle Daten sortiert und unter dem Index abgelegt.
     * @param {Array<string|number>} sortCols - Liste mit Spalten nach denen Sortiert wird
     * @param {string|Array<string|number>} [index] - Index Name oder Liste mit ID's der zum sortieren verwendet wird, oder wenn nicht vorhanden, nach dem Sortieren gesetzt wird.
     * @param {string} [newIndexName] - Index Name der nach dem Sortieren gesetzt wird.
     * @returns {Array<string|number>} sortierte Liste mit ID's
     * @example
     * const sortList = dataList.sortRows(["name", "hausnummer DESC"], "sortListe");
     */
    sortRows(sortCols, index, newIndexName) {
        // Alle Datenzeile in einer liste
        let rowList = [];
        let newIndex = false;

        if (Array.isArray(index)) {
            rowList = index;
        } else if (typeof index == "string") {
            rowList = this.#index.get(index) || [...this.#data.keys()];
        } else {
            rowList = [...this.#data.keys()];
        }

        // wenn keine SortierungsSpalten angegeben
        if (!Array.isArray(sortCols)) {
            if (typeof index == "string") { this.#index.set(index, rowList); }
            return rowList;
        }

        // Feld Indexes lesen und Sortier Reihenfolge
        const colLength = sortCols.length;
        const colIndex = new Array(colLength);
        const orderIndex = new Array(colLength);
        const isString = new Array(colLength);

        for (let i = 0; i < colLength; i++) {
            let col = sortCols[i];
            let direction = 1; // 1 = Aufsteigend sortieren / -1 = Absteigend sortieren
            let index = -1;

            if (typeof col == "string" && col.indexOf(" ") >= 0) {
                const fieldData = col.split(" ");
                index = this.getColNumber(fieldData[0]);
                if (fieldData[1].trim().toUpperCase() == "DESC") {
                    direction = -1;
                }
            } else {
                index = this.getColNumber(col);
            }

            colIndex[i] = index;
            orderIndex[i] = direction;
            isString[i] = this.#types[index] == "string" ? true : false;
        }


        // Sortieren
        rowList.sort((a, b) => {
            const aRow = this.#getRow(a) || [];
            const bRow = this.#getRow(b) || [];

            // Prüfen
            for (let i = 0; i < colLength; i++) {
                if (!aRow[colIndex[i]] && !bRow[colIndex[i]]){
                    continue;
                } else if (aRow[colIndex[i]] && !bRow[colIndex[i]]){
                    if (orderIndex[i] < 0) {
                        // Absteigend
                        return -1;
                    } else {
                        // Aufsteigend
                        return 1;
                    }
                } else if (!aRow[colIndex[i]] && bRow[colIndex[i]]){
                    if (orderIndex[i] < 0) {
                        // Absteigend
                        return 1;
                    } else {
                        // Aufsteigend
                        return -1;
                    }
                }
                
                // absteigend
                if (orderIndex[i] < 0) {
                    //if (typeof aRow[colIndex[i]] == "string" && typeof bRow[colIndex[i]] == "string") {
                    if (isString[i]) {
                        if (aRow[colIndex[i]].toLowerCase() > bRow[colIndex[i]].toLowerCase()) { return -1; }
                        if (aRow[colIndex[i]].toLowerCase() < bRow[colIndex[i]].toLowerCase()) { return 1; }
                    } else {
                        if (aRow[colIndex[i]] > bRow[colIndex[i]]) { return -1; }
                        if (aRow[colIndex[i]] < bRow[colIndex[i]]) { return 1; }
                    }
                } else {
                    // Aufsteigend
                    if (isString[i]) {
                        if (aRow[colIndex[i]].toLowerCase() > bRow[colIndex[i]].toLowerCase()) { return 1; }
                        if (aRow[colIndex[i]].toLowerCase() < bRow[colIndex[i]].toLowerCase()) { return -1; }
                    } else {
                        if (aRow[colIndex[i]] > bRow[colIndex[i]]) { return 1; }
                        if (aRow[colIndex[i]] < bRow[colIndex[i]]) { return -1; }
                    }
                }
            } // alle Felder vergleichen

            // alle gleich
            return 0;
        });

        // neuen Index speichern
        if (typeof newIndexName == "string") {
            this.#index.set(newIndexName, rowList);
        } else if (typeof index == "string") {
            this.#index.set(index, rowList);
        }
        return rowList;
    } // getSortRows


    /**
     * Gibt eine gefilterte Liste mit Datensätzen zurück.  
     * Wenn index Angegeben werden die Daten zum Filtern vom bestehenden Index genommen.  
     * Wenn newIndex angegeben, wird die gefilterte Liste unter dem "newIndex" abgelegt.
     * @param {Function} fu - Filterfunktion muss "true" oder "false" zurückgeben. Wenn "true" wird der Datensatz in die gefilterte Liste aufgenommen. 
     * @param {string|Array<string|number>} [index] - optionaler Index Name oder Liste von ID's, wenn Daten von einem bestehenden Index genommen werden. 
     * @param {string} [newIndexName] - Index unter dem die gefilterte Liste abgelegt wird.
     * @returns {Array<string|number>} Gefilterte Liste mit ID's 
     */
    filter(fu, index, newIndexName) {

        // Daten zum Filtern
        let rowList = [];
        if (Array.isArray(index)) {
            rowList = index;
        } else if (typeof index == "string") {
            rowList = this.#index.get(index) || [...this.#data.keys()];
        } else {
            rowList = [...this.#data.keys()];
        }

        if (typeof fu != "function") { return rowList; }

        const newList = [];

        // alle durchgehen
        for (let i = 0; i < rowList.length; i++) {
            const obj = this.get(rowList[i]);

            if (fu(obj, i, rowList)) {
                newList.push(rowList[i]);
            }
        }

        // neuen Index speichern
        if (typeof newIndexName == "string") {
            this.#index.set(newIndexName, newList);
        } else if (typeof index == "string") {
            this.#index.set(index, newList);
        }
        return newList;
    }


    /**
     * Gibt eine gefilterte Liste mit Datensatz ID's zurück.  
     * Die Filterfunktion wird mit einer Liste von Datensätzen aufgerufen, die in der angegebenen Spaltenliste(colList) den selben Wert haben.  
     * Wenn index angegeben werden die Daten zum Filtern vom bestehenden Index genommen.
     * Wenn newIndex angegeben, wird die gefilterte Liste unter dem "newIndex" abgelegt.
     * @param {Array<string|number>} colList - Spalten Namen oder Nummern nach dem Gruppiert wird. 
     * @param {Function} fu - Filterfunktion muss "true" oder "false" zurückgeben. Wenn "true" werden alle Datensätze der Gruppe in die gefilterte Liste aufgenommen.
     * @param {string|Array<string|number>} [index] - optionaler Index oder Liste von ID's, wenn Daten von einem bestehenden Index genommen werden. 
     * @param {string} [newIndexName] - Index unter dem die gefilterte Liste abgelegt wird.
     * @returns {Array<string|number>} Gefilterte Liste mit ID's
     */
    filterGroup(colList, fu, index, newIndexName) {
        // Aggregatfunktionen
        // count()
        // sum()
        // avg()
        // min()
        // max()


        // Daten zum Filtern
        let rowList = [];
        if (Array.isArray(index)) {
            rowList = index;
        } else if (typeof index == "string") {
            rowList = this.#index.get(index) || [...this.#data.keys()];
        } else {
            rowList = [...this.#data.keys()];
        }

        if (typeof fu != "function") { return rowList; }

        const newList = [];
        const newObjList = [];
        const groupCols = this.getColNumbers(colList);
        const groupValues = new Array(groupCols.length);
        let groupList = [];
        let groupObjList = [];

        // alle durchgehen
        for (let i = 0; i < rowList.length; i++) {
            let istNewGroup = false;

            // auf neue Gruppe prüfen
            for (let j = 0; j < groupCols.length; j++) {
                const value = this.getCellValue(rowList[i], groupCols[j]);
                if (value != groupValues[j]) {
                    istNewGroup = true;
                    groupValues[j] = value;
                }
            }

            // wenn neue gruppe
            if (istNewGroup) {
                // wenn FilterFunktion == true
                if (i > 0 && fu(groupObjList)) {
                    newList.push(...groupList);
                    newObjList.push(...groupObjList);
                }

                // Gruppe zurücksetzen
                groupList = [];
                groupObjList = [];
                istNewGroup = false;
            }

            // Datensatz in Gruppe
            groupList.push(rowList[i])
            groupObjList.push(this.get(rowList[i]));
        } // for jeder Datensatz

        // Letze Gruppe
        if (fu(groupObjList)) {
            newList.push(...groupList);
            newObjList.push(...groupObjList);
        }

        // neuen Index speichern
        if (typeof newIndexName == "string") {
            this.#index.set(newIndexName, newList);
        } else if (typeof index == "string") {
            this.#index.set(index, newList);
        }
        return newList;
    }


    /**
     * Führt die angegebene Funktion für jeden Datensatz, oder jeden Datensatz im angegebenen index, aus.  
     * Als Parameter wird die Datenzeile als Array übergeben. 
     * @param {Function} fu - Funktion die pro Datensatz ausgeführt wird
     * @param {string} [index] - optionaler Index Name oder Liste von ID's der als Datenquelle verwendet wird
     * @returns {void}
     * @example
     * const namensListe = [];
     * adresslistList.forEach((row, listIndex, rowList) => {namensListe.push(row[1] + " " + row[2]);});
     * console.log(namensListe);
     */
    forEach(fu, index) {
        // Daten zum Filtern
        let rowList = [];
        if (Array.isArray(index)) {
            rowList = index;
        } else if (typeof index == "string") {
            rowList = this.#index.get(index) || [...this.#data.keys()];
        } else {
            rowList = [...this.#data.keys()];
        }

        if (typeof fu != "function") { return; }

        // alle durchgehen
        for (let i = 0; i < rowList.length; i++) {
            const obj = this.get(rowList[i]);
            // Funktion ausführen
            if (fu(obj, i, rowList)) { break; };
        }
    }


    // Gridliste in einen String umwandeln
    /**
     * liefert die GridListe als JSON String zurück
     * @returns {string} Gridliste als JSON String
     */
    stringify() {
        // in JSON String umwandeln
        return JSON.stringify(this.getAsGridObject());
    } // stringify


    // Liest einen JSON-String in die GridList ein
    /**
     * 
     * @param {string} listString - JSON String eines InfoData Objektes
     * @returns {boolean} true wenn diese Gridliste erstellt wurde.
     */
    parse(listString) {
        if (typeof listString != "string") {
            return false;
        }

        // Gridliste setzen
        return this.createFromGridObject(JSON.parse(listString));
    } // parse


    /**
    * Konstruktor mit GridList Objekt oder JSON-String
    * @param {string} name - Javascript Objekt oder JSON-String
    * @param {string[]} [colList] - Optionale Liste mit Spaltennamen
    * @param {string|string[]} [idCol] - Name der ID Spalte oder mehreren Splalten die die ID ergeben. Muss angegeben werden wenn colList angegeben.
    */
    constructor(name, colList, idCol) {
        this.name = name;
        if (colList) {
            this.setCols(colList, idCol || colList[0]);
        }
    }
} // Class GridList


// =================================
//   Anzeige UI
// -------------


// List -> row -> col -> cell

//  GridView
/**
 * @class
 */
export class GridView {
    /** @type {string[]} */
    #colTags = [];
    get colTags() {
        return this.#colTags;
    }

    /** @type {string[]} */
    #endColTags = [];

    /** @type {string} */
    #rowTag = "tr";
    set rowTag(value) {
        this.#rowTag = value;
    }
    get rowTag() {
        return this.#rowTag;
    }

    /** @type {number[]} */
    #colNumbers = [];

    /** @type {string[]} */
    #cols = [];
    /** @param {string[]} value */
    set cols(value) {
        this.setCols(value);
    }
    get cols() {
        return this.#cols;
    }


    /** @type {GridList} */
    // @ts-ignore
    #gridList
    /** @param {GridList} value - GridListe */
    set gridList(value) {
        this.setGridList(value);
    }
    get gridList() {
        return this.#gridList;
    }

    /** @type {Function|null} */
    rowFunc = null;

    /**
     * Setzt die Spalten die im HTML erstellt werden
     * @param {Array<string|number>} cols - Listen mit Spaltennamen. Optional mit Leerzeichen getrennt der TagName.
     */
    setCols(cols) {
        this.#cols = [];
        this.#colTags = [];
        this.#endColTags = [];
        this.#colNumbers = [];

        for (let i = 0; i < cols.length; i++) {
            const col = cols[i];
            if (typeof col == "string") {
                const pos1 = col.indexOf(" ");
                if (pos1 > -1) {
                    const name = col.substring(0, pos1);
                    const tag = col.substring(pos1 + 1);
                    this.#cols.push(name);
                    this.#colTags.push(tag);
                    this.#endColTags.push(tag.split(" ")[0]);
                    this.#colNumbers.push(this.#gridList.getColNumber(name));
                } else {
                    this.#cols.push(col);
                    this.#colTags.push("td");
                    this.#endColTags.push("td");
                    this.#colNumbers.push(this.#gridList.getColNumber(col));
                }
            } else if (typeof col == "number") {
                this.#cols.push(this.#gridList.cols[col]);
                this.#colTags.push("td");
                this.#endColTags.push("td");
                this.#colNumbers.push(col);
            }
        }
    }


    /**
     * Setzt die Gridliste(Daten) für das Generieren des HTML-Strings
     * @param {GridList} gridList - Gridliste mit Daten
     */
    setGridList(gridList) {
        this.#gridList = gridList;
    }


    /**
     * Gibt die ID des Datensatzobjektes zurück
     * @param {object} row - Datensatz Objekt
     * @returns {string|number|undefined} ID
     */
    getRowID(row) {
        return this.#gridList.getID(row);
    }


    /**
     * Liefert einen HTML-String der Datenzeile zurück
     * @param {Object<string,any>} row - Datenzeile Objekt
     * @param {number} [listIndex] - Index in der Liste
     * @param {Array<string|number>} [list] - ID - Liste aus der die Datenzeile kommt
     * @returns {string} HTML String der Datenzeile
     */
    getRowHtml(row, listIndex, list) {
        if (!row) {return "";}
        const rowID = this.#gridList.getID(row);
        const tableRowID = this.#gridList.name + '_' + rowID;
        const tagName = this.#rowTag || "tr";
        let rowAttr = "";
        /** @type {Object<string,any>} */
        const colAttr = {};

        // Auf Zeilenanpassung prüfen
        if (this.rowFunc) {
            // Datensatz als Objekt / zusätzliche Arrtibute für Spalten / Position in der Liste / Liste
            rowAttr = " " + this.rowFunc(row, colAttr, listIndex, list);
        }

        // Zeile Beginn
        let html = `<${tagName} id="${tableRowID}"${rowAttr}>`;

        // Alle Spalten durchgehen
        for (let i = 0; i < this.#cols.length; i++) {
            html += `<${this.#colTags[i]} ${colAttr[this.#cols[i]]}>${row[this.#cols[i]]}</${this.#endColTags[i]}>`;
        }

        // Zeile Ende
        return html + `</${tagName}>`;
    }


    /**
     * Liefert den HTML-String von den Daten der GridList zurück.
     * @param {string} [index] - optionaler Index-Name wenn die Daten von einem Index verwendet werden.
     * @param {number} [rowNumbers] - Optionale Anzahl der gezeigten Datenzeilen.
     * @param {number} [startRow] - Ab welcher Datenzeile die Anzahl der Zeilen angezeigt werden.
     * @returns {string} HTML-String vom Table-Body
     */
    getHtml(index, rowNumbers, startRow) {
        let html = "";
        const idList = this.#gridList.getIndex(index);
        const start = startRow || 0;
        const end = rowNumbers ? start + rowNumbers : idList.length - 1;

        // alle Zeilen durchgehen
        // ForEach und ForEachObj macht keinen grossen Unterschied
        for (let i = start; i <= end; i++) {
            html += this.getRowHtml(this.#gridList.get(idList[i]), i, idList);
        }

        // html zurückgeben
        return html;
    }


    /**
     * GridView
     * @constructor
     * @param {GridList} gridList - GridListe mit daten
     */
    constructor(gridList) {
        if (gridList instanceof GridList) {
            this.setGridList(gridList);
        }
    }
} // class GridView




// ===============================
//   Funktionen
// --------------

// Global Short Identifier
/**
 * Gibt eine neue GlobalShortId zurück
 * @returns {string}
 */
export function GSID() {
    return new Date().getTime().toString(36) +
        crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

/**
 * @param {string} template
 * @param {Object<string,any>} obj
 */
function templateMe(template, obj) {
    var regex = /{{(.*?)}}/g;
    return template.replace(regex, function (/** @type {any} */ match, /** @type {string | number} */ capture) {
        return obj[capture] || "";
    });
}
