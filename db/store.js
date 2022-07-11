// global variables required for this application
const fs = require("fs");
const util = require("util");
const uuid = require("../helpers/uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// This is the class that will handle the read, write, get, add, and delete functionality.
class dbStore {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getAllNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addToNotes(note) {
    const {title, text} = note;
    const newNotes = {title, text, id: uuid(),};

    return this.getAllNotes()
      .then((notes) => [...notes, newNotes])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNotes);
  }

  deleteTheNote(id) {
    return this.getAllNotes()
    .then((notes) => notes.filter((note) => note.id != id))
    .then((updatedNotes) => this.write(updatedNotes))
}
}


module.exports = new dbStore();