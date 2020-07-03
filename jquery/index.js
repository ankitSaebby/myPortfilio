
$(window).scroll(function() {
  var scrollPos = $(this).scrollTop();
  //console.log(scrollPos);
  
  $(".hero-back").css({
        'background-size' : 100 + scrollPos + '%'      
  });
});


//works transitions
var Boxlayout = function() {

  var wrapper = document.body,
      sections = Array.from(document.querySelectorAll('.section')),
      closeButtons = Array.from(document.querySelectorAll('.close-section')),
      expandedClass = 'is-expanded',
      hasExpandedClass = 'has-expanded-item';

  return { init : init };

  function init() {
    _initEvents();
  }

  function _initEvents() {    
    sections.forEach(function(element) {
      element.onclick = function() {
        _openSection(this);
      };
    });
    closeButtons.forEach(function(element) {
      element.onclick = function(element) {
        element.stopPropagation();
        _closeSection(this.parentElement);
      };
    });
  }

  function _openSection(element) {
    if ( ! element.classList.contains(expandedClass) ) {
      element.classList.add(expandedClass);
      wrapper.classList.add(hasExpandedClass);
    }
  }

  function _closeSection(element) {
    if ( element.classList.contains(expandedClass) ) {
      element.classList.remove(expandedClass);
      wrapper.classList.remove(hasExpandedClass);
    }
  }

}();

Boxlayout.init();


// // Porfolio isotope and filter
// var portfolioIsotope = $('.portfolio-container').isotope({
//   itemSelector: '.portfolio-item',
//   layoutMode: 'fitRows'
// });

// $('#portfolio-flters li').on( 'click', function() {
//   $("#portfolio-flters li").removeClass('filter-active');
//   $(this).addClass('filter-active');

//   portfolioIsotope.isotope({ filter: $(this).data('filter') });
// });


//------------------codepen-----------------
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};