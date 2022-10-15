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
})
burgerlinks.mount("#menuburger");
burgerlinks.component("otherlink",{
  data(){
    return{
      
    }
  },
  props: ["link", "about", "imgsrc"],
  template:
  '<a v-bind:href="link"><div class="otherlink"><div><img v-bind:src="imgsrc" alt=""></div><p>{{ about }}</p></div></a>',
})