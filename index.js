const express = require('express')
const app = express()
const sqlite = require("sqlite3").verbose()
const db = new sqlite.Database('database.db')
const PORT = 80
const HOST = 'localhost'

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)")
})
db.close()

app.use("/static", express.static(__dirname + "/static"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + "/static/img/favicon.ico")
})

app.get('*', (req, res) => {
    res.status(404).render('404', {url: req.url})
})

app.listen(PORT, HOST, () => {console.log(`Server listening at http://${HOST}:${PORT}`)})