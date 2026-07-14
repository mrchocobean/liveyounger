// Carousel
var currentSlide = 0;
var totalSlides = 5;
var track = document.getElementById('carousel-track');
var dotsContainer = document.getElementById('carousel-dots');
var captionEl = document.getElementById('carousel-caption');

var slideData = [
  { year: '1672', name: 'Isaac Newton', desc: 'Isaac Newton described light as streams of tiny particles traveling in straight lines, supporting the idea that light behaves like particles.' },
  { year: '1678', name: 'Christian Huygens', desc: 'Christian Huygens proposed that light travels as waves, helping explain phenomena such as reflection and refraction.' },
  { year: '1801', name: 'Thomas Young', desc: "Thomas Young's famous double-slit experiment demonstrated that light behaves like a wave, producing interference patterns through constructive and destructive interference." },
  { year: '1860s', name: 'James Clerk Maxwell', desc: "James Clerk Maxwell unified electricity and magnetism through Maxwell's equations, revealing that light is an electromagnetic wave and part of the electromagnetic spectrum." },
  { year: '1905', name: 'Albert Einstein', desc: 'Albert Einstein showed that light can also behave as discrete particles, later called photons, helping explain the photoelectric effect.' }
];

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
  // Update caption
  var data = slideData[currentSlide];
  captionEl.innerHTML = '<div class="slide-year">' + data.year + '</div>' +
    '<div class="slide-name">' + data.name + '</div>' +
    '<div class="slide-desc">' + data.desc + '</div>';
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

// Initialize caption
updateCarousel();

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
