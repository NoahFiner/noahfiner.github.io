var height = window.innerHeight;
var mobileHoverTimeout;
var mobileHeaderDelay = 50;
var amountOfIntroSquares = 25;

var goToPage = function(page, hash) {
  var urlHash = hash || 0;
  $(".local-link").css("pointer-events", "none");
  $("#loading-outer").css("display", "block");
  $("#loading-main").removeClass("index photos sites games");
  $("#loading-main").addClass(page);
  $("#loading-back, #loading-main").addClass("leave-page");
  setTimeout(function() {
    $("#loading-back, #loading-main").removeClass("down");
    $("body").addClass("loading");
  }, 10);
  setTimeout(function() {
    if(urlHash) {
      location.href = (page+".html"+urlHash);
    } else {
      location.href = (page+".html");
    }
  }, 1000);
};

var scrollAmt;

$(document).ready(function() {

  function touchscreenCheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }

  if(touchscreenCheck()) {
    mobileHeaderDelay = 250;
    amountOfIntroSquares = 4;
  }

  scrollAmt = Math.floor(($(window).scrollTop() - 100) / window.innerHeight);
  if(scrollAmt < 0) {
    scrollAmt = 0;
  }

  $("#scroll-up").click(function() {
    scrollAmt--;
    if(scrollAmt < 0) {
      scrollAmt = 0;
    }
    $('body, html').animate({scrollTop: window.innerHeight*scrollAmt - 100}, 500);
  });

  $("#scroll-down").click(function() {
    scrollAmt++;
    if(scrollAmt > 7) {
      scrollAmt = 7;
    }
    $('body, html').animate({scrollTop: window.innerHeight*scrollAmt - 100}, 500);
  });

  $("#hamburger-outer").click(function() {
    $(".hamburger, #header-links").toggleClass("expanded");
  });

  $(document).on('click touchstart', function(e) {
    if(!$("#header-links, #hamburger-outer").is(e.target) &&
        $("#header-links, #hamburger-outer").has(e.target).length === 0 &&
        $("#header-links, #hamburger-outer").hasClass("expanded")) {
          $("#header-links, .hamburger").removeClass("expanded");
    }
    if(!$("#header-links > a").is(e.target) &&
        $("#header-links > a").has(e.target).length === 0) {
          $("#header-links > a").removeClass("hovered");
    }
  });

  $("#header-links > a").hover(function() {
    var that = this;
    mobileHoverTimeout = setTimeout(function() {$(that).addClass("hovered");}, mobileHeaderDelay);
  }, function() {
    clearTimeout(mobileHoverTimeout);
    $(this).removeClass("hovered");
  });

  $(".local-link").click(function(event) {
    if(($(this).parent().attr("id") === "header-links") && !($(this).hasClass("hovered")) && !($("#header-links").hasClass("expanded"))) {
      event.preventDefault();
      $(this).addClass("hovered");
    } else {
      var classes = $(this).attr('class').split(' ');
      var lastClass = classes.pop();
      while(lastClass === "hovered") {
        lastClass = classes.pop();
      }
      var firstClass = classes[0];
      if(firstClass[0] === "#") {
        goToPage(lastClass.substr(2, lastClass.length), firstClass);
      } else {
        goToPage(lastClass.substr(2, lastClass.length));
      }
    }
  });

  setTimeout(function() {
    $("#loading-main, #loading-back").addClass("up");
    $("body").removeClass("loading");
    setTimeout(function() {
      $("#loading-back, #loading-main").attr("style", "transition: all 1ms");
      $("#loading-back, #loading-main").addClass("down");
      $("#loading-main, #loading-back").removeClass("up");
      setTimeout(function() {
        $("#loading-outer").css("display", "none");
        $("#loading-back, #loading-main").attr("style", "transition: all 500ms cubic-bezier(0.420, 0.000, 1.000, 1.000);");
      }, 10);
    }, 600);
  }, 250);

  $(window).resize(function() {
    height = window.innerHeight;
  });
  for(var i = 1; i < 4; i++) {
    for(var j = 0; j < amountOfIntroSquares; j++) {
      var elemWidth = Math.floor(Math.random()*150+10);
      var elemHeight = Math.floor(Math.random()*200+10);
      var randHeight = Math.random();
      var randWidth = Math.random();
      var heightMultiplier = 1.2;
      console.log(Math.pow(Math.random(), 5));
      $("#parallax-back"+i).append("<div style='height: "+elemHeight+"px;\
                width: "+elemWidth+"px;\
                top: "+randHeight*100+"%;\
                left: "+randWidth*100+"%'>\
                </div>");
    }
  }
});

$(window).scroll(function() {
  scroll = $(window).scrollTop();
  scrollAmt = Math.ceil((scroll - 100) / window.innerHeight);
  if(scrollAmt < 0) {
    scrollAmt = 0;
  }
  var offset = 100;
  var heightsScrolled = Math.ceil((scroll-offset)/height);
  if(heightsScrolled <= 2) {
    $("#parallax-back1").css("transform", "translateY(-"+(scroll/0.75)+"px)");
    $("#parallax-back2").css("transform", "translateY(-"+(scroll/1.0)+"px)");
    $("#parallax-back3").css("transform", "translateY(-"+(scroll/1.25)+"px)");
  }
  if(heightsScrolled <= 1) {
    $("#parallax-background").css("background-image", "url('photography/intro1.jpg')");
  } else {
    $("#parallax-background").css("background-image", "url('photography/intro"+(heightsScrolled + 1)+".jpg')");
  }
});
