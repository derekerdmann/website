/**
 * Routes requests to the generated static site content, if it exists. If not,
 * generates the content using metalsmith and outputs it to the public
 * directory.
 */
exports.content = function(req, res) {
    res.send(req.path);
};
