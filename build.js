var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var ignore = require("metalsmith-ignore");
var watch = require('metalsmith-watch');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var rssgen = require("./rssgen");
var rawcontents = require("./rawcontents");
var moment = require('moment');


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
        reverse: false,
        metadata: {
            template: "tk.html",
            page: "anh-stunt-armor"
        }
    },
    blaster: {
        pattern: "tk/anh-e-11-blaster/*.md",
        sortBy: 'date',
        reverse: false,
        metadata: {
            template: "tk.html",
            page: "anh-e11-blaster"
        }
    },
}));
ms.use( markdown() );
ms.use( rawcontents() );
ms.use( templates({
    engine: "handlebars",
    helpers: {

        // Enables using a single template for both the armor and blaster
        // pages, then specifying the collection of posts by using the page's
        // front matter
        "lookupCollection": function() {
            return this.collections[this.currentCollection];
        },

        // Returns true if there are multiple articles in the current collection
        "multipleArticles": function() {
            return this.collections[this.currentCollection]
                && this.collections[this.currentCollection].length > 1;
        },

        // Formats a post time as a readable date
        "formatDate": function(date) {
            return moment(date).format("MMMM Do YYYY");
        },

        // Generates the current year
        "year": function(date) {
            return moment(date).format("YYYY");
        },
    },
    // Sets production/dev environment
    production: process.argv.indexOf( "--production" ) > -1
}));
ms.use( rssgen() );

// Allow automatic rebuilds
if (process.argv.indexOf( "--watch" ) > -1 ) {
    ms.use(watch({
        pattern: "**/*"
    }))
}

ms.build(function(err){ if (err) throw err; });

