const router = require('express').Router();
const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let read = () => {
    return readFileAsync("./db/db.json", "utf8")
}

let writeNote = (note) => {
    return writeFileAsync("./db/db.json", JSON.stringify(note))
}

router.get("/notes", (req, res) => {
    read().then((notes) => {
        let noteData;

        //try catch if notes comes back as an error send an empty array
        try {
            noteData = [].concat(JSON.parse(notes))
        }
        catch (err){
            noteData = []
        }
        return (noteData)
    })
    .catch((err)=>res.status(500).json(err))
});

router.post("/notes", (req, res) =>{

    const {title, text} = req.body;
    const newNote = {title, text};

    let noteData = read().then((notes) => {
        return res.json(notes)
    })
});

router.delete("/notes", (req, res) =>{

    const deleteNote = parseInt(req.params.id);
    readFileAsync.then((notes) => notes.filter((note) => note.id != id))
    .then((notes) => this.write(notes))
    read().then((notes) => {
        return res.json(notes)
    })
    .catch((err)=>res.status(500).json(err))
});


module.exports = router;