var imageTags = [ //line refers to (linecount - 2).jpg
  ["sunset", "hawaii", "favorites", "landscape"],
  ["night", "california", "favorites", "landscape"],
  ["sunset", "landscape", "favorites"],
  ["night", "composite", "favorites", "landscape"],
  ["sunset", "california", "favorites", "landscape"],
  ["sunset", "hawaii", "favorites", "landscape"],
  ["sunset", "landscape", "favorites"],
  ["night", "composite"],
  ["minimal", "favorites", "landscape"],
  ["favorites", "california"],
  ["night", "composite", "landscape"],
  ["night", "landscape"],
  ["night", "minimal"],
  ["night", "minimal", "california"],
  ["minimal", "landscape"],
  ["hawaii", "landscape"],
  ["minimal", "california"],
  ["night", "composite", "favorites"],
  ["night", "composite", "landscape", "favorites"],
  ["landscape", "sunset", "favorites", "iceland"],
  ["night", "landscape", "composite", "favorites"],
  ["iceland", "favorites"],
  ["sunset", "landscape", "favorites"],
  ["night", "composite", "favorites", "landscape"],
  ["night", "favorites"],
  ["macro", "favorites"],
  ["iceland", "landscape", "sunset", "favorites"],
  ["landscape", "composite"],
  ["landscape", "favorites", "minimal"],
  ["landscape", "favorites", "minimal"],
  ["night"],
  ["iceland", "landscape", "minimal", "favorites"],
  ["night", "composite", "landscape", "favorites"],
  ["iceland", "landscape", "sunset", "favorites"],
  ["night", "minimal"],
  ["landscape", "favorites"],
  ["macro", "favorites"],
  ["landscape", "sunset", "favorites"],
  ["minimal", "landscape"],
  ["minimal", "landscape"],
  ["night", "landscape", "composite"],
  ["macro", "minimal", "favorites"],
  ["night", "landscape", "minimal", "favorites"],
  ["night", "landscape"],
  ["iceland", "landscape", "sunset", "composite"],
  ["landscape", "minimal", "favorites"],
  ["iceland", "landscape"],
  ["iceland", "landscape", "sunset", "favorites"],
  ["landscape", "sunset"],
  ["night", "composite", "favorites", "minimal"],
  ["night", "landscape", "favorites"],
  ["macro"],
  ["sunset", "landscape", "favorites"],
  ["night", "minimal", "landscape"],
  ["night"],
  ["night", "composite"],
  ["macro"],
  ["sunset", "landscape"],
  ["landscape"],
  ["landscape"],
  ["landscape"]
];

var galleryResetTimeout;
var loadingTimeout;
var currentImage = 0;
var images = [];
var currentTags = [];
var uniqueTags = [];
var hash = window.location.hash.substring(1);

var Image = function(num, tags) {
  this.tags = tags;
  this.num = num;
  this.url = this.num+".jpg";
  this.thumb_url = "thumbnails/"+num+".jpg";
};

for(var i = 0; i < imageTags.length; i++) {
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
  $("body, .image-full").removeClass("loading");
  if(state) {
    $(".image-full").addClass("loading");
    $("body").addClass("loading");
    $("#image-full-outer").removeClass("hidden");

    $(".image-full").attr("src", "photography/"+image+".jpg");

    $(".image-full").on("load", function() {
      console.log("loaded");
      $(".image-full").removeClass("loading");
      checkWidth();
    }).each(function() {
      //if image is already cached/loaded
      if(this.complete) $(this).trigger('load');
    });
  }
  else {
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
    for(i = images.length - 1; i >= 0; i--) {
      if(hasTags(images[i].tags) || tags === '') {
        $("#gallery-content").prepend(
            '<div class="image-thumb-outer">' +
              '<img class="image-thumb" height="200px" width="auto" src="photography/thumbnails/'+i+'.jpg"/>' +
            '</div>');
        }
    }
    $(".image-thumb-outer").on("click", function() {
      clickSrc = $(this).children().attr("src");
      clickSrc = clickSrc.replace("photography/thumbnails/", "").replace(".jpg", "");
      currentImage = clickSrc;
      showImage(currentImage, true);
    });
  }, 200);
};

var checkWidth = function() {
  console.log("checking width");
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
    $("#gallery-header").append("<a class='gallery-selector' id='"+uniqueTags[i].replace(" ", "-")+"'>"+uniqueTags[i]+"</a>");
  }

  if(hasTags(hash) && hash !== "") {
    selectGallery(hash);
  } else {
    selectGallery("favorites");
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

        //images are sorted bigger#.jpg -> smaller#.jpg

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
