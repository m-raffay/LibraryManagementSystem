const func = async(req, res) => {
    res.status(200).json({msg: "delete books"});
}

module.exports = {func};