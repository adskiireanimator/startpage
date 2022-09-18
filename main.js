
const date = new Vue({
  el: "#datenav",
  data: {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    lastupdated: "",
  },
});

const otherlinks = new Vue({
  el: "#otherlinks",
  data: {
    activeseen: false,
    otherlink: [
      {
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
      },
    ],
    aaa: "aaa",
  },
});

const bar = new Vue({
  el: "#kostya",
  data: {
    startmsg: "Привет всем друзьям",
    message: "",
    messages: "",
    seensearches: false,
    searches: [],
    height: 0,
    buttonsearch: "",
  },
  methods: {
    arrive: function () {
      socket.emit("arrive", spacechecker(this.message));
      searchesexamples.push(spacechecker(this.message));
      window.location.href = `https://www.google.com/search?q=${this.message}`;
    },
    upsearch:function(){
      console.log("up");
    },
    downsearch:function(){
      console.log("down");
    },
    
  },
});

Vue.component("otherlink", {
  props: ["link", "about", "imgsrc"],
  template:
    '<a v-bind:href="link"><div class="otherlink"><div><img v-bind:src="imgsrc" alt=""></div><p>{{ about }}</p></div></a>',
});

Vue.component("globallink",{
  props:["href","name"],
  template:'<li class="headerlink"><a v-bind:href="href">{{ name }}</a></li>',
});

const socket = io();
let searchesexamples = [];
socket.on("searches", (message) => {
  searchesexamples = message;
});

setInterval(() => {
  date.hours = new Date().getHours();
  date.minutes = new Date().getMinutes();
  date.seconds = new Date().getSeconds();
}, 1000);

inputbar.focus();

window.onload = () => {
  bar.$watch("message", function (newValue, oldValue) {
    function finder(text) {
      let newarr = [];
      let counter = 0;
      for (let find in searchesexamples) {
        let flag = false;
        for (let i = 0; i < text.length; i++) {
          if (text[i] == searchesexamples[find][i]) {
            flag = true;
          }
          else{
            flag=false;
            break;
          }
        }
        if (flag) {
          newarr.push({
            name: searchesexamples[find],
            link: `https://www.google.com/search?q=${searchesexamples[find]}`,
          });
          counter += 1;
          if (counter >= 3) {
            break;
          }
        }
      }
      return newarr;
    }

    this.searches = finder(spacechecker(newValue));
    if (this.searches.length === 0) {
      this.searches = [{ name: "походу ничего не нашлось" }];
    }
    this.height = this.searches.length * 35;

    if (newValue != "") {
      this.seensearches = true;
    } else {
      this.seensearches = false;
      this.height = 0;
    }
    this.buttonsearch = `https://www.google.com/search?q=${newValue}`;
  });
};
function show() {
  otherlinks.activeseen=!otherlinks.activeseen
}
function spacechecker(search){
  let flag = false;
  let realsearch = "";
  for(let sym of search){
    if(flag){
      realsearch+=sym;
    }
    if (sym!=' '){
      if(!flag){
        realsearch=sym;
      }
      flag=true;
    }
  }
  return realsearch
}
