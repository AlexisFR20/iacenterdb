const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Se utiliza para poder definir que archivos se pueden utilizar dentro del aqpi

require("./routes/user.routes")(app);

const sql = require("./models/db");

app.listen(port, () => {
    console.log("server is running");
});