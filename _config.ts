import lume from "lume/mod.ts";

const site = lume();

// Statische Dateien kopieren
site.copy([".css", ".js", ".png", ".jpg", ".gif", ".pdf"]);

export default site;
