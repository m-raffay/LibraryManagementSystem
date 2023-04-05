  const func = async(req, res) => {
    res.sendFile(__dirname + '/error.html');
}
module.exports = {func};