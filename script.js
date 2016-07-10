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
  for(var i = 1; i < 7; i++) {
    for(var j = 0; j < 10; j++) {
      var elemWidth = Math.floor(Math.random()*150+10);
      var elemHeight = Math.floor(Math.random()*200+10);
      var heightMultiplier = 1.2;
      $("#parallax-back"+i).append("<div style='height: "+elemHeight+"px; width: "+elemWidth+"px; top: "+(Math.floor(Math.random()*(($("#parallax-back"+i).height()*heightMultiplier)))-(elemHeight/2))+"px; left: "+(Math.floor(Math.random()*(($("#parallax-back"+i).width())))-(elemWidth/2))+"px'></div>");
    }
  }
});

$(window).scroll(function() {
  scroll = $(window).scrollTop();
  var bottom = $("#tex-content").height()/4;
  if(Math.ceil((scroll-bottom)/height) <= 1) {
    $("#parallax-background").css("background-image", "url('photography/intro1.jpg')");
  } else {
    $("#parallax-background").css("background-image", "url('photography/intro"+(Math.ceil((scroll-bottom)/height) + 1)+".jpg')");
  }
  $("#parallax-back1").css("top", -(scroll/0.35)+"px");
  $("#parallax-back2").css("top", -(scroll/0.75)+"px");
  $("#parallax-back3").css("top", -(scroll/1)+"px");
  $("#parallax-back4").css("top", -(scroll/1.25)+"px");
  $("#parallax-back5").css("top", -(scroll/1.5)+"px");
});
