const func = async(req, res) => {
    res.status(200).json({msg: "admin"});
}

module.exports = {func};