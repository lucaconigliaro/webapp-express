const express = require("express");
const moviesRouter = require("./routers/movies");
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");
const cors = require("cors");

const app = express();
const port = process.env.SERVER_PORT;

// Middleware Cors
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

// Static Files middleware
app.use(express.static(`public`));

//Json Middleware
app.use(express.json());

// Router Movies
app.use("/movies", moviesRouter);

// Error Handler middleware
app.use(errorsHandler);

// Not Found middleware
app.use(notFound);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});