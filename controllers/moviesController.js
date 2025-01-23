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
    const id = req.params.id;
    const sql = "SELECT * FROM `movies` WHERE `id` = ?";
    const sqlReviews = `
      SELECT reviews.* 
      FROM reviews
      JOIN movies
      ON movies.id = reviews.movie_id
      WHERE movies.id = ?
    `;

    dbConnection.query(sql, [id], (err, results) => {
        if (err) {
            return next(new Error("Internal Server Error"))
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Movie not found",
            });
        }
        dbConnection.query(sqlReviews, [id], (err, reviews) => {
            if (err) {
                return next(new Error("Internal Server Error"))
            }
            return res.status(200).json({
                status: "succes",
                data: {
                    ...results[0],
                    reviews,
                },
            });
        });
    });
};

module.exports = {
    index,
    show,
};