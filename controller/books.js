const func = async(req, res) => {
    res.status(200).json({msg: "book"});
}

module.exports = {func};