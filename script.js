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
// $(document).ready(function() {
//   $('a').hover(function() {
//     $(this).addClass("hover");
//     var site = links[$(this).attr("id")];
//     $("#everything").css("background-image", "url('img/"+site.name+".png')");
//     $("#desc").html(site.desc);
//     $(".angled-back, #desc").removeClass("hidden");
//   }, function() {
//     $(this).removeClass("hover");
//     $("#everything").css("background-image", "url('img/transparent.png')");
//     $(".angled-back, #desc").addClass("hidden");
//   });
// });
