const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.port || 5050;

const searchesexamples = [];

io.on("connection", (socket) => {
  socket.emit("searches", searchesexamples);
  socket.on("arrive", (msg) => {
    searchesexamples.push(msg);
  });
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.json({ ключ: "значение" });
  res.sendFile("index.html");
});

http.listen(port, "127.0.0.1", () => {
  console.log("server is working like niger");
});
