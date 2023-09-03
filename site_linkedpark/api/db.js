import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bdlinkedpark",
    database: "bd_sitelinkedpark"
})