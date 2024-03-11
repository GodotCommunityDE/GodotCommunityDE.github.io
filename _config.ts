import lume from "lume/mod.ts";
import nav from "lume/plugins/nav.ts";


// Markdown plugin configuration
const markdown = {
    options: {
        html: true
        , breaks: true
    }
};

const site = lume({
    prettyUrls: false, // Disable pretty urls
}, { markdown });

site.use(nav());

// Load .css files
site.copy([".css", ".js", ".jpg", ".png", ".gif", ".pdf"]);

export default site;
