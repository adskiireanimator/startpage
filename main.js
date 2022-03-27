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
  },
});

const bar = new Vue({
  el: "#kostya",
  data: {
    startmsg: "  Привет всем друзьям",
    message: "",
    messages: "",
    seensearches: false,
    searches: [],
    height: 0,
    buttonsearch: "",
  },
  methods: {
    arrive: function () {
      socket.emit("arrive", this.message);
      searchesexamples.push(this.message);
      window.location.href = `https://www.google.com/search?q=${this.message}`;
    },
  },
});

Vue.component("otherlink", {
  props: ["link", "about", "imgsrc"],
  template:
    '<div class="otherlink"><a v-bind:href="link"><div><img v-bind:src="imgsrc" alt=""></div></a><p>{{ about }}</p></div>',
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
      console.log(searchesexamples);
      for (let find in searchesexamples) {
        let flag = true;
        for (let i = 0; i < text.length; i++) {
          if (text[i] != searchesexamples[find][i]) {
            flag = false;
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

    this.searches = finder(newValue);
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
  if (otherlinks.activeseen) {
    otherlinks.activeseen = false;
  } else {
    otherlinks.activeseen = true;
  }
}
