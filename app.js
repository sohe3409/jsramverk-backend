const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const index = require("./routes/index");
const list = require("./routes/list");
const create = require("./routes/create");
const update = require("./routes/update");

const port = process.env.PORT || 1338;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.use("/", index);
app.use("/list", list);
app.use("/create", create);
app.use("/update", update);


app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        errors: [
            {
                status: err.status,
                name: err.message,
                detail: err.message,
            },
        ],
    });
});

app.listen(port, () => console.log(`Example API listening on port ${port}!`));
