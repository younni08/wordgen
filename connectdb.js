const {Pool} = require("pg");
const fs = require("fs");

const dbConfig = fs.readFileSync("./database.json");
const config = JSON.parse(dbConfig);

let dbinfo = {
    user: config.user,
    passwor: config.password,
    host: config.host,
    port: config.port,
    database: config.database
    //max: 10
    //connectionTimeoutMillis: 10
    //idletimeoutMillis 0
}

module.exports = {
    Pool: function() {
        if (pool) return pool;
        let pool = new Pool(dbinfo);
        console.log("db module working")
        return pool
    }
}