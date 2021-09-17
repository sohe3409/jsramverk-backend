var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    const data = {
        data: "Hello World",
    };
    console.log(data);
    res.json(data);
    res.status(200).send();
});

module.exports = router;
