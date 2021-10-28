const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const list = require("./routes/list");
const create = require("./routes/create");
const update = require("./routes/update");
const auth = require("./routes/auth");
const contact = require("./routes/contact");

const port = process.env.PORT || 1338;
app.use(cors());

//graphq schema
const visual = false;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

app.use("/", auth);
app.use("/contact", contact);
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

io.sockets.on('connection', function(socket) {
    console.log("SOCKET ID",socket.id); // Nått lång och slumpat

    socket.on('create', function(room) {
         socket.leave(previous);
         socket.join(room);
         previous = room;
     });

     socket.on("doc", function (data) {
          socket.to(data["name"]).emit("doc", data);
     });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

const server = httpServer.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server
