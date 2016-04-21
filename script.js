$(document).ready(function() {
  $('a').hover(function() {
    var id = $(this).attr("id");
    $("#everything").css("background-image", "url('img/"+id+".png')");
  }, function() {
    $("#everything").css("background-image", "url('img/transparent.png')");
  });
});
