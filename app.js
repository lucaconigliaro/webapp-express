const express = require("express");
const moviesRouter = require("./routers/movies");

const app = express();
const port = process.env.SERVER_PORT;

// Router Movies
app.use("/movies", moviesRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});