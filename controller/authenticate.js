const func = async(req, res) => {
    res.status(200).json({msg: "Authenticate"});
}

module.exports = {func};