const func = async(req, res) => {
    res.status(200).json({msg: "user"});
}

module.exports = {func};