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
    $(".angled-back, #desc").removeClass("hidden");
  }, function() {
    $("#everything").css("background-image", "url('img/transparent.png')");
    $(".angled-back, #desc").addClass("hidden");
  });
  $('a').click(function() {
    $("#green-left").addClass("peeking");
    setInterval(function() {
      $("#green-left").addClass("peeking");
    }, 1000);
    setTimeout(function() {
      $("#green-left").removeClass("peeking");
      setInterval(function() {
        $("#green-left").removeClass("peeking");
      }, 1000);
    }, 500);
  });
});
