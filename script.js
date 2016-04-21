var descTimeout;

var Site = function(name, desc) {
  this.name = name;
  this.desc = desc;
};

var links = {
  multitaskilus: new Site("multitaskilus", "A stress-inducing multitasking game."),
  joanna: new Site("joanna", "An art portfolio for Joanna First."),
  jhumpa: new Site("jhumpa", "A video game for Jhumpa Lahiri's book."),
  sqar: new Site("sqar", "A newer, better puzzle edition of sqr."),
  sqr: new Site("sqr", "The earlier, survival edition of sqar."),
  xinabox: new Site("xinabox", "A site for the xinabox Minecraft server"),
  bri: new Site("bri", "A site for Boulder Radiologists, Inc.")
}

$(document).ready(function() {
  $('a').hover(function() {
    var site = links[$(this).attr("id")];
    $("#everything").css("background-image", "url('img/"+site.name+".png')");
    $("#desc").html(site.desc);
    $("#desc-outer").removeClass("hidden");
  }, function() {
    $("#everything").css("background-image", "url('img/transparent.png')");
    $("#desc-outer").addClass("hidden");
  });
});
