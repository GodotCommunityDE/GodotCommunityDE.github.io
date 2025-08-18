// @ts-check


// ==================
//   Parameter
// ------------


// Millisekunden
const secondMillisec = 1000;
const minuteMillisec = 60 * 1000;
const hourMillisec = 60 * 60 * 1000;
const dayMillisec = 24 * 60 * 60 * 1000; //86400000 millsec
const weekMillisec = dayMillisec * 7; //86400000 millsec


// ==================
//   Funktioen
// ------------

/**
 * Prüft einen Wert auf einen Datumswert
 * @param {any} date - Wert, der auf ein Datum geprüft wird
 * @returns {boolean} true wenn der Wert in ein Datum umgewandelt werden kann
 */
export function isDate(date) {
    // todo: Zeitspannen prüfen
    try {
        let newDate = null;
        if (typeof date == "string" && date.indexOf("-W") == 4) {
            const year = parseInt(date.substring(0, 4));
            const week = parseInt(date.substring(6));
            if (isNaN(year) || isNaN(week)) { return false; }
            if (week < 0 || week > 53) { return false; }
            if (week == 53) {
                const firstDay = new Date(year, 0, 1, 12).getDay();
                const lastDay = new Date(year, 11, 31, 12).getDay();
                if (firstDay != 4 || lastDay != 4) { return false;}
            }
            newDate = new Date(year, 0, 4, 12);
            newDate = new Date(newDate.setDate(newDate.getDate() + (week * 7)));
        } else {
            newDate = new Date(date);
        }
        return newDate instanceof Date && !isNaN(newDate.getTime());
    } catch (err) {
        return false;
    }
}


/**
 * prüft das Datums-Format und liefert ein Javascript Datum zurück
 * @param {string|Date} date - Datum als Text oder als Javascript Datum
 * @returns {Date}
 */
function checkDate(date) {
    if (!date) { return new Date(); }
    if (date instanceof Date) {
        return date;
    } else if (typeof date == "string") {
        // Auf woche prüfen
        if (date.indexOf("-W") == 4) {
            // Woche Checken
            const year = parseInt(date.substring(0, 4));
            const week = parseInt(date.substring(6));

            // Wenn Woche 1
            if (week == 1) {
                return new Date(year, 0, 4, 12);
            }

            // zum 4. Jänner Anzahl -1 Wochen hinzufügen
            return checkDate(addWeek(new Date(year, 0, 4, 12), week - 1));
        } else {
            return new Date(date);
        }
    } else if (typeof date == "number") {
        return new Date(date);
    } else {
        return new Date();
    }
}


/**
 * gibt den ersten Tag eines Monats als Datum-ISOString zurück
 * @param {Date} date - Datum des Monats
 * @returns {String} Datum ISOString
 */
export function getFirstOfMonth(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.getUTCFullYear(), newDate.getMonth(), 1, 12);
    return newDate.toISOString();
}


/**
 * gibt den letzten Tag eines Monats als Datum-ISOString zurück
 * @param {Date} date - Datum des Monats
 * @returns {String} Datum ISOString
 */
export function getLastOfMonth(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.getUTCFullYear(), newDate.getMonth() + 1, 0, 12);
    return newDate.toISOString();
}


/**
 * gibt die Anzahl der Tage vom Monat angegebenen Datum zurück
 * @param {Date|string} date - Datum des Monats
 * @returns {number} - Anzahl der Tage im Monat
 */
export function getMonthDaysCount(date) {
    if (!isDate(date)) { return -1; }
    let newDate = checkDate(date);
    const lastDate = new Date(newDate.getUTCFullYear(), newDate.getMonth() + 1, 0, 12);
    let lastDay = lastDate.getDate();
    return lastDay;
}


/**
 * Addiert die angegebene Anzahl der Tage zum angegeben Datum
 * @param {Date|string} date - Datum zu dem die Menge hinzugefügt wird
 * @param {number} count - Anzahl der Tage die Addiert werden. Die Anzahl kann auch negativ sein. 
 * @returns {string} Datum ISOString
 */
export function addDate(date, count) {
    if (!isDate(date)) { return ""; }
    if (isNaN(count)) { count = 0; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.setDate(newDate.getDate() + count));
    return newDate.toISOString();
}


/**
 * Addiert die angegebene Anzahl der Monate zum angegeben Datum
 * @param {Date|string} date - Datum zu dem die Menge hinzugefügt wird
 * @param {number} count - Anzahl der Monate die Addiert werden. Die Anzahl kann auch negativ sein. 
 * @returns {string} Datum ISOString
 */
export function addMonth(date, count) {
    if (!isDate(date)) { return ""; }
    if (isNaN(count)) { count = 0; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.setMonth(newDate.getMonth() + count));
    return newDate.toISOString();
}


/**
 * Addiert die angegebene Anzahl der Jahre zum angegeben Datum
 * @param {Date|string} date - Datum zu dem die Menge hinzugefügt wird
 * @param {number} count - Anzahl der Jahre die Addiert werden. Die Anzahl kann auch negativ sein. 
 * @returns {string} Datum ISOString
 */
export function addYear(date, count) {
    if (!isDate(date)) { return ""; }
    if (isNaN(count)) { count = 0; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.setFullYear((newDate.getFullYear()) + count));
    return newDate.toISOString();
}


/**
 * Addiert die angegebene Anzahl der Wochen zum angegeben Datum
 * @param {Date|string} date - Datum zu dem die Menge hinzugefügt wird
 * @param {number} count - Anzahl der Wochen die Addiert werden. Die Anzahl kann auch negativ sein. 
 * @returns {string} Datum ISOString
 */
export function addWeek(date, count) {
    if (!isDate(date)) { return ""; }
    if (isNaN(count)) { count = 0; }
    let newDate = checkDate(date);
    newDate = new Date(newDate.setDate(newDate.getDate() + (count * 7)));
    return newDate.toISOString();
}


/**
 * Liefert den gewünsten Wochentag von dem Datum in der Woche zurück
 * @param {Date} date - Datum in der Woche
 * @param {number} newDay - Tag der von der Woche zurückgegeben wird. Mo = 1, Di = 2, Mi = 3, Do = 4, Fr = 5, Sa = 6, So = 7 
 * @returns {string} Datum ISOString
 */
function getWeekDay(date, newDay) {
    if (!(date instanceof Date) || typeof newDay != "number") { return ""; }
    let day = date.getDay();

    // Wenn Sonntag
    if (day == 0) {
        day = 7;
    }
    if (newDay == 0) {
        newDay = 7;
    }

    // Wenn bereits der richtige Wochentag
    if (day == newDay) {
        return date.toISOString();
    }

    // Differenz hinzufügen
    return addDate(date, (newDay - day));
}



/**
 * Liefert den Montag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Montag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getMonday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 1);
}

/**
 * Liefert den Dienstag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Dienstag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getTuesday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 2);
}


/**
 * Liefert den Mittwoch von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Mittwoch zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getWednesday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 3);
}


/**
 * Liefert den Donnerstag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Donnerstag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getThursday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 4);
}


/**
 * Liefert den Freitag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Freitag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getFriday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 5);
}


/**
 * Liefert den Samstag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Samstag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getSaturday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 6);
}


/**
 * Liefert den Sonntag von der Woche zurück, in der sich das angegebene Datum befindet
 * @param {Date|string} date - Datum in der Woche von dem der Sonntag zurückgegeben wird
 * @returns {string} Datum ISOString
 */
export function getSunday(date) {
    if (!isDate(date)) { return ""; }
    let newDate = checkDate(date);
    return getWeekDay(newDate, 7);
}


/**
 * Gibt die Differenz in Millisekunden von Zwei Datums zurück
 * @param {Date} date1 - 1. Datum
 * @param {Date} date2 - 2. Datum
 * @returns {number} Differenz in Millisekunden
 */
function diffMilli(date1, date2) {
    if (!isDate(date1) || !isDate(date2)) { return -1; }
    const m1 = date1.getTime();
    const m2 = date2.getTime();
    if (date1 > date2) {
        return m1 - m2;
    } else {
        return m2 - m1;
    }
}


/**
 * Gibt die Differenz zwischen zwei Datums in der angegeben Einheit zurück
 * @param {Date|string} date1 - 1. Datum
 * @param {Date|string} date2 - 2. Datum
 * @param {"week"|"day"|"hour"|"minute"|"second"|"millisecond"} [unit] - Gewünschte Rückgabe Einheit. Wenn nicht angegeben dann Millisekunden. "week", "hour" 
 * @returns {number} Differenz in der angegebenen Einheit
 */
export function getDateDiff(date1, date2, unit) {
    if (!isDate(date1) || !isDate(date2)) { return -1; }
    const diffInMilli = diffMilli(checkDate(date1), checkDate(date2));

    // Je nach Einheit
    switch (unit) {
        case "week":
            return Math.ceil(diffInMilli / weekMillisec) - 1;
            break;
        case "day":
            return Math.ceil(diffInMilli / dayMillisec) - 1;
            break;
        case "hour":
            return Math.ceil(diffInMilli / hourMillisec) - 1;
            break;
        case "minute":
            return Math.ceil(diffInMilli / minuteMillisec) - 1;
            break;
        case "second":
            return Math.ceil(diffInMilli / secondMillisec) - 1;
            break;

        default:
            return diffInMilli;
            break;
    }
}


/**
 * Liefert die Wochennummer (ISO8601) des angegebenen Datums zurück
 * @param {Date|string} date 
 * @returns {string}
 */
export function getWeek(date) {
    if (!isDate(date)) { return ""; }
    const newDate = checkDate(date);

    // Donnerstag der Woche lesen
    const currentThursday = checkDate(getThursday(newDate));

    // Jahr, Monat, Tag, Wochentag lesen
    const year = currentThursday.getFullYear();
    const month = currentThursday.getMonth();
    const day = currentThursday.getDate();
    // const weekDay = currentThursday.getDay();

    // Wenn 31. Dezember
    if (month == 11 && day == 31) {
        // 53. Woche
        return year + "-W53";
    }

    // wenn Donnerstag <= 4. Jänner
    if (month == 0 && day <= 4) {
        // 1. Woche
        return year + "-W01";
    }

    // 1. Jänner prüfen
    const firstThursday = checkDate(getThursday(new Date(year, 0, 4, 12)));

    // Differenz in Wochen
    const diffWeek = getDateDiff(firstThursday, currentThursday, "week");
    const diffString = "0" + (diffWeek + 1);
    return year + "-W" + diffString.substring(diffString.length - 2);
}


/**
 * gibt Anzahl der Tage im angegebenen Jahr zurück
 * @param {Date|string} date - Datum innerhalb vom Jahr
 * @returns {number} - Anzahl der Tage
 */
export function getDaysOfYear(date) {
    if (!isDate(date)) { return -1; }
    const newDate = checkDate(date);

    let days = 366;
    if (new Date(newDate.getFullYear(), 1, 29, 12).getMonth() == 2) {
        days = 365;
    }
    return days;
}


/**
 * Lieftert die Anzahl von Wochen im Jahr vom angegebenen Datum
 * @param {Date|string} date - Datum des Jahres 
 * @returns {number} 52 oder 53
 */
export function getWeeksOfYear(date) {
    if (!isDate(date)) { return -1; }
    const newDate = checkDate(date);

    let weeks = 52;
    const year = newDate.getFullYear();
    const firstDay = new Date(year, 0, 1, 12).getDay();
    const lastDay = new Date(year, 11, 31, 12).getDay();
    if (firstDay == 4 || lastDay == 4) {
        weeks = 53;
    }

    return weeks;
}
