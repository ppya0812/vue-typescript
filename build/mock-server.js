const connect = require("connect")
const path = require("path")
const http = require("http")
const puer = require("puer")
const app = connect()
const server = http.createServer(app)

const options = {
    dir: "/", 
    ignored: /(\/|^)\..*|node_modules/  //ignored file
}

app.use(puer.connect(app, server , options))   //use as puer connect middleware
// you must use puer middleware before route and static midleware(before any middle may return 'text/html')
app.use("/", connect.static(__dirname))


server.listen(8080, function(){
    console.log("listen on 8080 port")
})
