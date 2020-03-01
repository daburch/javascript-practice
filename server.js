var http = require('http')
var fs = require('fs')

const port = "3000"
const serverUrl = "localhost"

var server = http.createServer((req, resp) => {

    if (req.url === "/") {
        resp.end("<h1>hello world</h1>")
        return
    }

    if (req.url === "/weather") {
        fs.readFile("index.html", (err, text) => {
            resp.setHeader("Content-Type", "text/html")
            resp.end(text)
        })
        return
    }

    resp.setHeader("Status", 404)
    resp.end("Not Found")
})

server.listen(port, serverUrl)