const { Pool } = require('pg');
//const { DB } = require('../config');

const pool = new Pool({
    user: process.env.PG,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}