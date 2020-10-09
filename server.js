const express = require("express");
const app = express();

app.listen(2410);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.get("/:file", (req, res) => {
     res.sendFile(__dirname + "/dist/" + req.params.file);
});