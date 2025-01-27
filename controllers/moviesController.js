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
    const slug = req.params.slug;
    const sql = `
      SELECT movies.*, CAST(AVG(reviews.vote) AS DECIMAL(10, 1)) as vote_avg
      FROM movies
      LEFT JOIN reviews
      ON reviews.movie_id = movies.id
      WHERE movies.slug = ?
    `;

    const sqlReviews = `
      SELECT reviews.* 
      FROM reviews
      JOIN movies
      ON movies.id = reviews.movie_id
      WHERE movies.slug = ?
    `;

    dbConnection.query(sql, [slug], (err, results) => {
        if (err) {
            return next(new Error("Internal Server Error"))
        }
        if (results.length === 0 || results[0].id === null) {
            return res.status(404).json({
                status: "fail",
                message: "Movie not found",
            });
        }
        dbConnection.query(sqlReviews, [slug], (err, reviews) => {
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