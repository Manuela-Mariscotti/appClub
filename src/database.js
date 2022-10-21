let mysql = require("mysql2");
let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Marisella67$",
        database: "appclubs"
    }
)
connection.connect(function(error){
    error ? console.log("Error conecting DB : --> "+error) : console.log("DB connection successful");
});
module.exports = connection;