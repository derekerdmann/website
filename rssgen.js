// Generates an RSS feed that aggregates all posts from different collections

var RSS = require("rss");
var url = require("url");
var extend = require("extend");

module.exports = function( options ) {
    
    return function( files, metalsmith, done ) {

        var feedOptions = {
            title: "Derek Erdmann's Star Wars Armor and Props",
            feed_url: "http://derekerdmann.com/tk/rss.xml",
            site_url: "http://derekerdmann.com/tk",
        };

        var feed = new RSS( feedOptions );

        var metadata = metalsmith.metadata();

        var collections = metadata.collections;
        if( !collections ) {
            return done(new Error("Collections are missing"));
        }

        var articles = Object.keys( collections )
            .map(function(collection) {
                return collections[collection];
            })
            .reduce(function(previousValue, currentValue, index, array) {
                return previousValue.concat( currentValue );
            }, []);

        articles.forEach( function(article) {
            debugger
            return feed.item( extend( {}, article,{
                description: article.contents,
                url: feedOptions.site_url +
                    "/" + collections[article.collection].metadata.page +
                    "#" + article.anchor
            }));
        });

        files["tk/rss.xml"] = {
            contents: new Buffer( feed.xml(), "utf8" )
        }

        return done();
    }
}
