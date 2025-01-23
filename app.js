const express = require("express");
const moviesRouter = require("./routers/movies");
const errorsHandler = require("./middleware/errorsHandler");

const app = express();
const port = process.env.SERVER_PORT;

// Router Movies
app.use("/movies", moviesRouter);


// Error Handler middleware
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});