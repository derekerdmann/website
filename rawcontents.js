// Generates an RSS feed that aggregates all posts from different collections


module.exports = function( options ) {
    
    return function( files, metalsmith, done ) {

        Object.keys( files ).forEach( function(file){ 
            var data = files[file]; 
            data.rawcontents = new Buffer( data.contents.toString() ); 
        }); 

        return done();
    }
}
