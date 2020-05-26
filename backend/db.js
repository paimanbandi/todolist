/**
 * @author paiman <hub@paiman.id>
 *
 */

const dotenv = require('dotenv');
dotenv.config();

var knex = require('knex')({
  client: 'pg',
  version: '8.2.1',
  connection: {
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    password : process.env.PGPASSWORD,
    database : process.env.PGDATABASE,
    port: process.env.PGPORT,
    pool: { min: 0, max: 10 }
  }
});

module.exports = {
  knex
}
