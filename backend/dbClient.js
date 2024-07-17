const { Client } = require("pg");

const dbClient= new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "ambica",
  database: "Platform",
});

dbClient.connect().then(()=> console.log('connected'));

dbClient.query(`SELECT * FROM platformDetail`, (error, result) => {
  if(!error) {
    console.log(result.rows);
  } else {
    console.log(error.message);
  }
  dbClient.end();
});

module.exports = dbClient;