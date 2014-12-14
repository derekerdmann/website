var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var ignore = require("metalsmith-ignore");
var watch = require('metalsmith-watch');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');

// Generate metalsmith content
var ms = Metalsmith(__dirname);
ms.source( "src" );
ms.destination( "public" );
ms.use( ignore( "**/.*" ) );  // ignore temp files
ms.use( sass({ outputStyle: "expanded" }) );
ms.use( collections({
    armor: {
        pattern: "tk/anh-stunt-armor/*.md",
        sortBy: 'date',
        reverse: false
    },
    blaster: {
        pattern: "tk/anh-e-11-blaster/*.md",
        sortBy: 'date',
        reverse: false
    }
}));
ms.use( markdown() );
ms.use( templates({
    engine: "handlebars",
    helpers: {
        // Enables using a single template for both the armor and blaster
        // pages, then specifying the collection of posts by using the page's
        // front matter
        "lookupCollection": function() {
            return this.collections[this.currentCollection];
        }
    }
}));

// Allow automatic rebuilds
if (process.argv.indexOf( "--watch" ) > -1 ) {
    ms.use(watch)
}

ms.build(function(err){ if (err) throw err; });

