var express = require("express");
var router = express.Router();
const server = require("../src/server.js");
const auth = require("../src/auth.js");


router.get('/',
    (req, res, next) => auth.checkToken(req, res, next),
    async function (req, res) {
        let result = await server.getDocs();

        const data = {
            data: result,
        };

        // console.log(data);
        console.log(result, data);
        res.json(data);

    }
);

router.get('/:user',
    (req, res, next) => auth.checkToken(req, res, next),
    async function (req, res) {
        let result = await server.getDoc(req.params.user);

        if (result) {
            const data = {
              id: result._id,
              data: result.docs,
            };
            res.json(data);
        }
    }
);

module.exports = router;
