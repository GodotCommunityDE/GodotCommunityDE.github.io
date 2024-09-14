// ===========================
//   Typen für InfoList
//   und lidoc
// 2024-09-08
// ===========================

export type Data = {
    [key: string]: string | string[];
};

// Informationen zu der geparsten Seite
export interface SiteInfo {
    html: Map<string, string>;
    data: Data;
    imageList: string[];
    linkList: string[];
}

// Optionen für den Parser
export interface ParseOptions {
    rowTag: string; // HTML-TagName einer Zeile
    colTag: string; // HTML-TagName einer Spalte
}
