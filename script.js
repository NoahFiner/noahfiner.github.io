// var descTimeout;
//
// var Site = function(name, desc, url) {
//   this.name = name;
//   this.desc = desc;
//   this.url = url;
// };
//
// var links = {
//   multitaskilus: new Site("multitaskilus", "A stress-inducing multitasking game.", "multitaskil.us"),
//   joanna: new Site("joanna", "An art portfolio for Joanna First.", "joannafirst.com"),
//   jhumpa: new Site("jhumpa", "A video game for Jhumpa Lahiri's book.", "noahfiner.github.io/Jhumpa-Simulator"),
//   sqar: new Site("sqar", "A newer, better puzzle edition of sqr.", "noahfiner.github.io/sqar"),
//   sqr: new Site("sqr", "The earlier, survival edition of sqar.", "noahfiner.github.io/sqar"),
//   xinabox: new Site("xinabox", "A site for the xinabox Minecraft server", "noahfiner.github.io/xinabox"),
//   bri: new Site("bri", "A site for Boulder Radiologists, Inc.", "noahfiner.github.io/BRI"),
//   robotics: new Site("robotics", "A site for Fairview's robotics team.", "fairviewrobotics.com"),
//   map: new Site("map", "An interactive map of Fairview High School.", "fairviewhs.org/map"),
//   justgothatway: new Site("justgothatway", "A game where you just go that way.", "justgothatway.co")
// };
//
var height = window.innerHeight;

$(document).ready(function() {
  $(window).resize(function() {
    height = window.innerHeight;
  });
  for(var i = 2; i < 5; i++) {
    for(var j = 0; j < 10; j++) {
      var elemWidth = Math.floor(Math.random()*500+1);
      var elemHeight = Math.floor(Math.random()*500+1);
      var heightMultiplier = 0.5;
      $("#parallax-back"+i).append("<div style='height: "+elemHeight+"px; width: "+elemWidth+"px; top: "+(Math.floor(Math.random()*(($("#parallax-back"+i).height()*heightMultiplier)))-(elemHeight/2))+"px; left: "+(Math.floor(Math.random()*(($("#parallax-back"+i).width())))-(elemWidth/2))+"px'></div>");
    }
  }
});

$(window).scroll(function() {
  scroll = $(window).scrollTop();
  var bottom = $("#tex-content").height()/4;
  $("#parallax-background").css("background-image", "url('photography/intro"+(Math.ceil((scroll-bottom)/height) + 1)+".jpg')");
  $("#parallax-back2").css("top", -(scroll/1.5)+"px");
  $("#parallax-back3").css("top", -(scroll/3)+"px");
  $("#parallax-back4").css("top", -(scroll/6)+"px");
});
