const pg = require("pg-promise")();
const config = require("config");
const pgp = pg(
  {
    // host: config.get("pgHost"),
    // port: 5432,
    // database: config.get("pgDatabase"),
    // user: config.get("pgUser"),
    // password: config.get("pgPassword"),

    host: "ec2-50-19-32-96.compute-1.amazonaws.com",
    port: 5432,
    database: "d48s9b62to246u",
    user: "qzhhwmcvihvwsy",
    password:
      "a60ca6d862af26eff7d3c5a0de49d588f677886734299bc9f3836e644eb9422d",
    ssl: {
      rejectUnauthorized: false,
    },

    // host: "localhost",
    // port: 5432,
    // database: "postgres",
    // user: "postgres",
    // password: "root",
    //ssl: { rejectUnauthorized: false },
  }
  // { rejectUnauthorized: false }
);

module.exports = { pgp };
