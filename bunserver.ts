// ========================
//   Bun Fileserver
// 2024-09-05
// ========================

//   Server erstellen
let isPost = false;
const server = Bun.serve({
  port: 8080,

  // Request prüfen
  fetch(req: Request): Response | Promise<Response> {
    let filePath = new URL(req.url).pathname;

    // wenn Pfad auf einen Ordner zeigt dann immer "index.html" anfügen
    if (filePath.endsWith("/")) {
      filePath += "index.html";
    }
    if (filePath.indexOf(".") < 0) {
      filePath += "/index.html";
    }

    // Wenn "POST" Methode
    if (req.method == "POST") {
      isPost = true;
      // prüfen ob der Post in den Data Ordner geht
      if (filePath.startsWith("/data") || filePath.startsWith("/_build")) {
        // Daten aus Request
        req.text().then((data) => {
          // Daten schreiben
          Bun.write("./" + filePath, data).then(() => {
            return new Response("OK");
          }).catch((err: Error) => {
            console.log("POST err:", err);
            return new Response(err.message, { status: 500 });
          });
        });
      } else {
        // Pfad zeigt nicht auf den Data Ordner
        return new Response("Posts go only in /data/ or /_build/ folder", { status: 400 });
      }
    }
    // Datei von Platte lesen und zurückgeben
    console.log(filePath);
    const file = Bun.file("./" + filePath);
    return new Response(file);
  },
  error() {
    if (isPost) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port}`);
console.log(`stop with CTRL+C`);
