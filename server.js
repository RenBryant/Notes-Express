const express = require ("express");
const util = require("util");
const htmlRoutes = require ("./routes/htmlRoutes");
const apiRoutes = require ("./routes/apiRoutes");

const path = require("path");
const fs = require("fs");

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.listen(PORT, () => console.log(`Located on PORT: ${PORT}`));