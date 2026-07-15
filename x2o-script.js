// Carousel
var currentSlide = 0;
var totalSlides = 5;
var track = document.getElementById('carousel-track');
var dotsContainer = document.getElementById('carousel-dots');

// Create dots
for (var i = 0; i < totalSlides; i++) {
  (function(idx) {
    var dot = document.createElement('div');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dot.onclick = function() { goToSlide(idx); };
    dotsContainer.appendChild(dot);
  })(i);
}

function updateCarousel() {
  track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
  var dots = dotsContainer.querySelectorAll('.carousel-dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
  }
}

function moveSlide(dir) {
  currentSlide += dir;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateCarousel();
}

function goToSlide(idx) {
  currentSlide = idx;
  updateCarousel();
}

// Auto-advance every 6 seconds
var autoAdvance = setInterval(function() { moveSlide(1); }, 6000);

// Pause on hover
var carouselEl = document.getElementById('science-carousel');
carouselEl.addEventListener('mouseenter', function() { clearInterval(autoAdvance); });
carouselEl.addEventListener('mouseleave', function() {
  autoAdvance = setInterval(function() { moveSlide(1); }, 6000);
});

// Touch/swipe support
var touchStartX = 0;
var touchEndX = 0;
carouselEl.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; });
carouselEl.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  var diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    moveSlide(diff > 0 ? 1 : -1);
  }
});

// Arrow buttons
var prevBtn = document.querySelector('.carousel-btn.prev');
var nextBtn = document.querySelector('.carousel-btn.next');
if (prevBtn) prevBtn.addEventListener('click', function() { moveSlide(-1); });
if (nextBtn) nextBtn.addEventListener('click', function() { moveSlide(1); });

// Vimeo video facade - load real iframe on click
var vimeoFacade = document.getElementById('vimeo-facade');
if (vimeoFacade) {
  vimeoFacade.addEventListener('click', function() {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/1017643167';
    iframe.title = 'LifeWave X2O Light-Infused Water';
    iframe.loading = 'lazy';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
    vimeoFacade.innerHTML = '';
    vimeoFacade.style.cursor = 'default';
    vimeoFacade.style.background = 'transparent';
    vimeoFacade.appendChild(iframe);
  });
}

// Expandable "Read more"
function toggleExpand(btn) {
  var content = btn.nextElementSibling;
  content.classList.toggle('open');
  btn.style.opacity = content.classList.contains('open') ? '.6' : '1';
}

var expandBtns = document.querySelectorAll('[data-toggle="expand"]');
for (var j = 0; j < expandBtns.length; j++) {
  (function(btn) {
    btn.addEventListener('click', function() { toggleExpand(btn); });
  })(expandBtns[j]);
}
