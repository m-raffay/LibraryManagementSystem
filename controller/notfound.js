  const func = async(req, res) => {
    res.status(404).sendFile(__dirname + '/error.html');
    
}
module.exports = {func};