const socket = io();



const date= Vue.createApp({
  data(){
    return{
      hours: null,
      minutes: null,
      seconds: null,
    }
  },
  methods:{
    nowdate(){
      this.updatedate();
      setInterval(this.nowdate,1000);
    },

    updatedate(){
      this.hours= new Date().getHours();
      this.minutes= new Date().getMinutes();
      this.seconds= new Date().getSeconds();
    }
  },
  created(){
    this.nowdate()
  },
});

date.mount("#datenav");


const burgerlinks= Vue.createApp({
  data(){
    return{
      isActive:false,
      links:[]
    }
  },
  methods:{
    burgerClicked(){
      this.isActive=!this.isActive;
    },
    async waitLinks(){
      await socket.on("burgerLinksServer",(links)=>{
        this.links=links;
      });
    },
  },
  created(){
    this.waitLinks();
  }
});
burgerlinks.mount("#menuburger");

burgerlinks.component("otherlink",{
  props: ["link", "about", "imgsrc"],
  template:
  '<a v-bind:href="link"><div class="otherlink"><div><img v-bind:src="imgsrc" alt=""></div><p>{{ about }}</p></div></a>',
});

const searchbar = Vue.createApp({
  data(){
    return{
      startmsg:"Привет всем",
      message:"",
      memorysearches:[],
      seansearches:false,
      index:0
    }
  },
  methods:{
    upsearch(){
      if(this.index!=0){
        this.index=this.index-1;
      }
    },

    downsearch(){
      if(this.index!=this.memorysearches.length-1){
        this.index=this.index+1;
      }
    },

    arrive(){
      socket.emit("arrive", this.memorysearches[this.index].name);
      this.memorysearches.push(this.memorysearches[this.index].name);
      window.location.href = `https://www.google.com/search?q=${this.memorysearches[this.index].name}`;
    },
    async loadsearches(){
      await socket.on("searches", (message) => {
        this.memorysearches = message;
      });
    },

    spacechecker(search){
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
    },
    finder(text){
      this.loadsearches();
      let newarr = [{
        name: text,
        link: `https://www.google.com/search?q=${text}`,
      }];
      let counter = 0;
      for (let find in this.memorysearches) {
        let flag = false;
        for (let i = 0; i < text.length; i++) {
          if (text[i] == this.memorysearches[find][i]) {
            flag = true;
          }
          else{
            flag=false;
            break;
          }
        }
        if (flag) {
          newarr.push({
            name: this.memorysearches[find],
            link: `https://www.google.com/search?q=${this.memorysearches[find]}`,
          });
          counter += 1;
          if (counter >= 6) {
            break;
          }
        }
      }
      return newarr;
    }
  },
  created(){
    this.loadsearches()
  },

  watch:{
    message(newValue,oldValue){
      this.memorysearches=this.finder(this.spacechecker(newValue));
      console.log(this.memorysearches);
      console.log(this.message);
      if (this.memorysearches.length === 0) {
        this.memorysearches = [{ name: "походу ничего не нашлось" }];
      };

      if (newValue != "") {
        this.seensearches = true;
      } else {
        this.seensearches = false;
      };
    }
  },
});
searchbar.mount("#kostya");