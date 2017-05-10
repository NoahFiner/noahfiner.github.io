var imageTags = [ //line refers to (linecount - 2).jpg
  ["favorites", "macro", "flowers", "minimal"],
  ["macro", "flowers", "minimal"],
  ["macro", "minimal"],
  ["macro", "flowers", "minimal"],
  ["macro", "flowers", "minimal"],
  ["macro", "flowers", "minimal"],
  ["macro", "minimal", "abstract"],
  ["sunset", "minimal", "landscape"],
  ["minimal", "abstract"],
  ["minimal", "landscape"],
  ["landscape"],
  ["minimal", "landscape"],
  ["landscape"],
  ["landscape"],
  ["landscape", "photoshop"],
  ["macro", "flowers", "minimal"],
  ["landscape", "long exposure"],
  ["landscape", "long exposure"],
  ["sunset", "landscape"],
  ["long exposure", "landscape", "sunset"],
  ["long exposure", "landscape", "sunset"],
  ["long exposure", "landscape", "sunset", "favorites"],
  ["abstract", "minimal"],
  ["abstract", "minimal"],
  ["astro", "photoshop", "milky way", "favorites"],
  ["abstract", "minimal"],
  ["astro", "photoshop", "milky way"],
  ["abstract", "minimal"],
  ["astro", "photoshop"],
  ["astro", "photoshop"],
  ["abstract", "colorful milk"],
  ["abstract", "long exposure"],
  ["abstract", "colorful milk"],
  ["abstract", "colorful milk"],
  ["macro", "abstract"],
  ["abstract", "landscape"],
  ["abstract", "long exposure"],
  ["macro", "abstract", "minimal"],
  ["macro", "abstract", "minimal", "favorites"],
  ["abstract", "minimal", "favorites"],
  ["fall", "landscape"],
  ["minimal", "macro", "fall"],
  ["macro"],
  ["minimal"],
  ["minimal", "landscape"],
  ["landscape"],
  ["astro", "long exposure"],
  ["sunset", "long exposure"],
  ["long exposure", "fall", "landscape"],
  ["macro", "abstract"],
  ["abstract", "long exposure", "astro"],
  ["minimal"],
  ["favorites"],
  ["minimal"],
  ["abstract", "long exposure", "favorites"],
  ["astro", "favorites"],
  ["fall", "abstract", "favorites"],
  ["macro"],
  ["fall", "landscape"],
  ["landscape", "long exposure"],
  ["minimal", "abstract"],
  ["abstract", "colorful milk", "favorites"],
  ["fall", "landscape", "long exposure"],
  ["fall", "landscape", "long exposure"],
  ["abstract", "long exposure"],
  ["astro", "long exposure"],
  ["abstract", "colorful milk"],
  ["abstract", "colorful milk"],
  ["abstract", "colorful milk", "favorites"],
  ["abstract", "colorful milk"],
  ["fall", "landscape"],
  ["abstract", "colorful milk"],
  ["abstract", "colorful milk", "favorites"],
  ["fall", "landscape"],
  ["macro"],
  ["fall", "macro", "favorites"],
  ["astro", "landscape", "long exposure"],
  ["fall", "macro", "abstract"],
  ["astro", "photoshop", "long exposure"],
  ["astro", "photoshop", "long exposure", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way"],
  ["astro", "photoshop", "long exposure"],
  ["astro", "photoshop", "long exposure"],
  ["astro", "photoshop", "long exposure"],
  ["astro", "photoshop", "long exposure", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way"],
  ["astro", "photoshop", "long exposure", "favorites"],
  ["astro", "photoshop", "long exposure"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["minimal", "abstract"],
  ["macro"],
  ["sunset", "long exposure", "photoshop"],
  ["astro", "photoshop", "long exposure", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["astro", "long exposure", "landscape"],
  ["astro", "photoshop", "long exposure", "milky way"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites"],
  ["macro", "minimal", "abstract"],
  ["macro", "minimal"],
  ["astro", "photoshop", "long exposure", "milky way"],
  ["landscape"],
  ["landscape", "astro", "long exposure", "favorites", "photoshop"],
  ["abstract", "long exposure"],
  ["abstract", "long exposure"],
  ["abstract", "long exposure", "favorites"],
  ["abstract", "long exposure", "favorites"],
  ["landscape", "photoshop", "long exposure", "favorites"],
  ["landscape", "photoshop", "long exposure", "favorites"],
  ["landscape", "fall", "photoshop", "favorites"],
  ["landscape", "sunset", "photoshop"],
  ["macro", "flowers"],
  ["long exposure", "abstract", "favorites"],
  ["long exposure", "abstract"],
  ["abstract", "minimal", "long exposure"],
  ["landscape", "photoshop", "sunset", "favorites"],
  ["macro"],
  ["landscape", "photoshop", "long exposure"],
  ["landscape", "photoshop", "sunset", "favorites"],
  ["astro", "photoshop", "long exposure", "milky way", "favorites", "landscape"],
  ["landscape", "photoshop", "sunset", "favorites"]
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
        $("#gallery-content").prepend(
            '<div class="image-thumb-outer">' +
              '<img class="image-thumb" height="100px" width="auto" src="photography/thumbnails/'+i+'.jpg"/>' +
            '</div>');
        }
    }
    $(".image-thumb-outer").on("click", function() {
      clickSrc = $(this).children().attr("src");
      clickSrc = clickSrc.replace("photography/thumbnails/", "").replace(".jpg", "");
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
          incrementImage();
          e.preventDefault();
          break;

        case 39: // right
          decrementImage();
          e.preventDefault();
          break;
      }
    }
  });
});
