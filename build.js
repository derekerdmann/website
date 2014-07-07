var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var ignore = require("metalsmith-ignore");
var watch = require('metalsmith-watch');

// Generate metalsmith content
var ms = Metalsmith(__dirname);
ms.destination( "public" );
ms.use( ignore( ".*" ) );  // ignore temp files
ms.use( sass({ outputStyle: "expanded" }) )

// Allow automatic rebuilds
if (process.argv.indexOf( "--watch" ) > -1 ) {
    ms.use(watch)
}

ms.build(function(err){ if (err) throw err; });

