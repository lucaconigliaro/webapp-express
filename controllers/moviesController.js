//INDEX
const index = (req, res) => {
    res.json({
        message: "Index Movies"
    });
};

//SHOW
const show = (req, res) => {
    res.json({
        message: "Show Movies"
    });
};

module.exports = {
    index,
    show,
};