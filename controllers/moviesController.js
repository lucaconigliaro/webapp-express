const dbConnection = require("../Data/dbConnection");

//INDEX
const index = (req, res, next) => {
    const filters = req.query;

    let sql = "SELECT * FROM `movies`";
    const params = [];

    if (filters.search) {
        sql += `
          WHERE title LIKE ?
        `;
        params.push(`%${filters.search}%`);
    }

    dbConnection.query(sql, params, (err, movies) => {
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