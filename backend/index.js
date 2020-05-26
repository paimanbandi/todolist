/**
 * @author paiman <hub@paiman.id>
 *
 */

const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var client = new Client({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

client.connect(function (err) {
  if (err) throw err;
  client.query('SELECT $1::text as db', ['works'], function (err, result) {
    if (err) throw err;
    console.log(result.rows)
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

const port = process.env.BE_PORT || 5001;
app.listen(port, () => console.log("todolist-backend running on port " + port));