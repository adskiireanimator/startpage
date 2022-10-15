const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const otherlinks=[{
        about: "Почта",
        link: "https://mail.google.com/mail/u/0/#inbox",
        imgsrc: "./img/gmail.png",
      },
      {
        about: "CSS",
        link: "https://developer.mozilla.org/ru/docs/Web/CSS",
        imgsrc: "./img/firefox.png",
      },
      {
        about: "Дневник",
        link: "https://school.mos.ru/",
        imgsrc: "./img/daily.png",
      },
      {
        about: "Презы",
        link: "https://docs.google.com/presentation/u/0/",
        imgsrc: "./img/googlepres.png",
      },
      {
        about: "Иконки",
        link: "https://www.iconfinder.com/",
        imgsrc: "./img/iconfinder.png",
      },
      {
        about: "Github",
        link: "https://github.com/adskiireanimator",
        imgsrc: "./img/github.png",
      }
    ];


const port = process.env.port || 5050;

const searchesexamples = [];

io.on("connection", (socket) => {
  socket.emit("searches", searchesexamples);
  socket.emit("burgerLinksServer", otherlinks);
  socket.on("arrive", (msg) => {
    if(searchesexamples.find((i)=>i===msg) == undefined){
      searchesexamples.push(msg)
    }
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
