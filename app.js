const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const index = require("./routes/index");
const list = require("./routes/list");
const create = require("./routes/create");
const update = require("./routes/update");
const auth = require("./routes/auth");

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

app.use("/", auth);
app.use("/list", list);
app.use("/create", create);
app.use("/update", update);

// Server
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "https://www.student.bth.se",
      methods: ["GET", "POST"]
    }
});

let previous;
// let throttleTimer;


io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat

    socket.on('create', function(room) {
         socket.leave(previous);
         socket.join(room);
         previous = room;
     });

     socket.on("doc", function (data) {
          socket.to(data["_id"]).emit("doc", data);
          //
          // clearTimeout(throttleTimer);
          // console.log("writing");
          // throttleTimer = setTimeout(function() {
          //     console.log("now it should save to database")
          // }, 2000);
          // clearTimeout(throttleTimer);
     });
});




app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

const server = httpServer.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server
