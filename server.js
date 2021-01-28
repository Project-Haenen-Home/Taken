const express = require("express");
const app = express();

app.listen(2410);

app.get("/:file", (req, res) => {
     res.sendFile(__dirname + "/dist/" + req.params.file);
     res.set('Cache-control', 'public, max-age=86400')
});