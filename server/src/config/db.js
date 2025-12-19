const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "nakularora",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "pawfinds",
  password: process.env.DB_PASSWORD || "nakul@1408",
  port: Number(process.env.DB_PORT) || 5432,
});

async function runQuery(text, params = []) {
  console.log("SQL:", text, params);
  return pool.query(text, params);
}

module.exports = {
  pool,
  runQuery,
};


