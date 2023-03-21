const func = async(req, res) => {
    res.status(200).json({msg: "Add books admin"});
}

module.exports = {func};