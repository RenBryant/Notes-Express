const router = require("express").Router();
const util = require("util");
const dbStore = require("../db/store");

// Get route to receive the notes
router.get("/notes", (req, res) => {
  dbStore
    .getAllNotes().then((notes) => {
      return res.json(notes);
    })
    .catch((err)=>res.status(500).json(err))
});

// Post route to view and save all of the notes
router.post("/notes", (req, res) => {
  dbStore
    .addToNotes(req.body).then((note) => {
      res.json(note);
    })
    .catch((err)=>res.status(500).json(err))
});

// Delete note to remove the note that is clicked
router.delete("/notes/:id", (req, res) => {
    dbStore
        .deleteTheNote(req.params.id).then((note) => {
            res.json(note);
        })
        .catch((err)=>res.status(500).json(err))
});

module.exports = router;