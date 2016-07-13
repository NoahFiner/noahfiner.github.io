var imageTags = [ //line refers to (linecount - 2).jpg
  ["macro", "flowers"],
  ["hdr", "long exposure", "landscape"],
  ["landscape"],
  ["macro", "flowers"],
  ["spiky1"],
  ["macro", "flowers"],
  ["spiky1"],
  ["macro"],
  ["spiky1"],
  ["macro"],
  ["spiky1"],
  ["macro", "flowers"],
  ["macro", "abstract"],
  ["spiky1"],
  ["spiky1"],
  ["landscape", "long exposure"],
  ["macro"],
  ["spiky1"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["long exposure", "abstract"],
  ["spiky1", "spiky2"],
  ["spiky1"],
  ["macro"],
  ["spiky1", "spiky2"],
  ["spiky1", "spiky2"],
  ["spiky2"],
  ["spiky2"],
  ["spiky1"],
  ["spiky2"],
  ["long exposure", "abstract"],
  ["spiky2"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["abstract"],
  ["spiky2"],
  ["long exposure", "abstract"],
  ["spiky2"],
  ["spiky1"],
  ["spiky1"],
  ["long exposure", "abstract"],
  ["spiky1", "spiky2"],
  ["abstract"],
  ["spiky2"],
  ["long exposure", "landscape"],
  ["long exposure", "landscape"],
  ["long exposure", "landscape"],
  ["landscape"],
  ["long exposure", "landscape"],
  ["long exposure", "landscape"],
  ["abstract"],
  ["long exposure", "landscape"],
  ["abstract"],
  ["macro", "abstract"],
  ["macro", "abstract"],
  ["long exposure", "landscape"],
  ["landscape"],
  ["long exposure", "landscape"],
  ["long exposure", "landscape"],
  ["long exposure", "landscape"],
  ["landscape"],
  ["landscape"],
  ["macro"],
  ["long exposure", "landscape"],
  ["landscape"],
  ["landscape"],
  ["macro"],
  ["spiky1"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["macro", "flowers"],
  ["spiky2"],
  ["spiky1"],
  ["macro"],
  ["spiky1"],
  ["macro", "flowers"],
  ["macro"],
  ["spiky1"],
  ["spiky2"],
  ["spiky1"],
  ["macro"],
  ["spiky1"],
  ["macro"],
  ["macro", "flowers"],
  ["spiky2"],
  ["macro", "flowers"],
  ["spiky2"],
  ["macro", "flowers"],
  ["spiky1"],
  ["macro", "flowers"],
  ["macro", "abstract"],
  ["spiky1"],
  ["macro", "flowers"],
  ["spiky1"],
  ["macro"],
  ["macro", "flowers"],
  ["spiky1"],
  ["macro", "abstract"],
  ["macro", "flowers"],
  ["macro", "abstract"],
  ["macro", "flowers"],
  ["macro", "flowers"],
  ["macro", "flowers"],
  ["macro", "flowers"],
  ["macro"],
  ["macro"],
  ["macro", "flowers"],
  ["spiky2"],
  ["spiky2"],
  ["macro", "flowers"],
  ["macro"],
  ["spiky1"],
  ["macro", "flowers"],
  ["spiky1"],
  ["spiky2"],
  ["spiky2"],
  ["spiky2"],
  ["landscape"],
  ["landscape", "abstract"]
];

var galleryResetTimeout;
var loadingTimeout;
var currentImage = 0;
var images = [];
var currentTags = [];
var uniqueTags = ["spiky1", "spiky2"];
var hash = window.location.hash.substring(1);


var Image = function(num, tags) {
  this.tags = tags;
  this.num = num;
  this.url = this.num+".jpg";
  this.thumb_url = "thumbnails/"+num+".jpg";
};

for(var i = 0; i < imageTags.length - 1; i++) {
  images.push(new Image(i, imageTags[i]));
}

for(var i = 0; i < imageTags.length; i++ ){
  for(var j = 0; j < imageTags[i].length; j++) {
    if((uniqueTags.indexOf(imageTags[i][j]) === -1)) {
      uniqueTags.push(imageTags[i][j]);
    }
  }
}

var showImage = function(image, state) {
  clearTimeout(loadingTimeout);
  if(state) {
    currentImage = image;
    $("body").addClass("loading");
    $("#image-full-outer").removeClass("hidden");
    setTimeout(function() {$(".image-full").attr("src", "photography/"+currentImage+".jpg");}, 10);
    checkWidth();
  }
  else {
    $("body").removeClass("loading");
    loadingTimeout = setTimeout(function() {$(".image-full").attr("src", "photography/loading.jpg");}, 500);
    $("#image-full-outer").addClass("hidden");
  }
};

var incrementImage = function() {
  currentImage++;
  if(currentImage >= images.length) {
    currentImage = 0;
  }
  while(hasTags(images[currentImage].tags) === false) {
    currentImage++;
    if(currentImage >= images.length) {
      currentImage = 0;
    }
  }
  showImage(currentImage, true);
  checkWidth();
};

var decrementImage = function() {
  currentImage--;
  if(currentImage < 0) {
    currentImage = images.length - 1;
  }
  while(hasTags(images[currentImage].tags) === false) {
    currentImage--;
    if(currentImage < 0) {
      currentImage = images.length - 1;
    }
  }
  showImage(currentImage, true);
  checkWidth();
};

var hasTags = function(goalTags) {
  if(currentTags === "") {
    return true;
  }
  for(var i = 0; i < goalTags.length; i++) {
    if(currentTags.indexOf(goalTags[i]) > -1) {
      return true;
    }
  }
  return false;
};

var resetGallery = function(tags) {
  $(".image-thumb-outer").animate({opacity: 0}, 250, function() {
    $(this).remove();
  });
  clearTimeout(galleryResetTimeout);
  currentTags = tags;
  currentImage = 0;
  galleryResetTimeout = setTimeout(function() {
    for(i = 0; i <= images.length - 1; i++) {
      if(hasTags(images[i].tags) || tags === '') {
        $("#gallery-content").append(
            '<div class="image-thumb-outer">' +
              '<img class="image-thumb" height="100px" width="auto" src="photography/'+i+'.jpg"/>' +
            '</div>');
        }
    }
    $(".image-thumb-outer").on("click", function() {
      clickSrc = $(this).children().attr("src");
      clickSrc = clickSrc.replace("photography/", "").replace(".jpg", "");
      showImage(clickSrc, true);
    });
  }, 200);
};

var checkWidth = function() {
  var wHeight = window.innerHeight;
  var wWidth = window.innerWidth;
  var iHeight = $(".image-full").height();
  var iWidth = $(".image-full").width();
  if(iWidth >= wWidth*0.9) {
    $(".image-full").addClass("width90");
  }
  if(iHeight >= wHeight*0.9) {
    $(".image-full").removeClass("width90");
  }
};

var selectGallery = function(gal) {
  $(".gallery-selector").removeClass("selected");
  $(".gallery-selector:contains('"+gal+"')").addClass("selected");
  if(gal === "all photos") {
    resetGallery("");
  } else {
    resetGallery(gal);
  }
};

$(window).resize(function() {
  checkWidth();
});

$(document).ready(function() {
  resetGallery("");

  $("#image-full-outer").click(function() {
    showImage("", false);
  });

  $("#image-full-outer > img, #image-full-left, #image-full-right").click(function(event) {
    event.stopPropagation();
  });

  for(i = 0; i < uniqueTags.length; i++) {
    $("#gallery-header").append("<a class='gallery-selector' id='"+uniqueTags[i]+"'>"+uniqueTags[i]+"</a>");
  }

  if(hasTags(hash) && hash !== "") {
    selectGallery(hash);
  }

  $(".gallery-selector").click(function() {
    selectGallery($(this).html());
  });

  $(document).keydown(function(e) {
    if(!($("#image-full-outer").hasClass("hidden"))) {
      switch(e.which) {
        case 27: // esc
          showImage("", false);
          break;

        case 37: // left
          decrementImage();
          e.preventDefault();
          break;

        case 39: // right
          incrementImage();
          e.preventDefault();
          break;
      }
    }
  });
});
