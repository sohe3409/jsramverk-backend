var express = require("express");
var router = express.Router();
const server = require("../src/server.js");
const auth = require("../src/auth.js");


router.put("/:id",
  async function (req, res) {
        await server.updateDoc(req.params.id, req.body)
    }
);

// router.put("/:id",
//     (req, res, next) => auth.checkToken(req, res, next),
//     async function (req, res) {
//       console.log("hallå")
//         await server.updateDoc(req.params.id, req.body)
//     }
// );

module.exports = router;
