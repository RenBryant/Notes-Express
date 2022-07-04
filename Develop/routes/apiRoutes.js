const router = require('express').Router();
const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let read = () => {
    return readFileAsync("./db/db.json", "utf8")
}

router.get("/notes", (req, res) => {

    read().then((notes) => {
        return res.json(notes)
    })
    .catch((err)=>res.status(500).json(err))
});

router.post("/notes", (req, res) =>{

    read().then((notes) => {
        return res.json(notes)
    })
    .catch((err)=>res.statys(500).json(err))
});

router.delete("/notes", (req, res) =>{

    read().then((notes) => {
        return res.json(notes)
    })
    .catch((err)=>res.statys(500).json(err))
});


module.exports = router;