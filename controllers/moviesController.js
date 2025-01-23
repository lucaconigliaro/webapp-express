const dbConnection = require("../Data/dbConnection");

//INDEX
const index = (req, res, next) => {
    const sql = "SELECT * FROM `movies`";

    dbConnection.query(sql, (err, movies) => {
        if (err) {
            return next(new Error("Internal Server Error"))
        }
        return res.status(200).json({
            status: "success",
            data: movies,
        });
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