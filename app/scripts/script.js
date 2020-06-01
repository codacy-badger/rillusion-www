AOS.init(
  {
    duration: 700,
    once: true,
  }
);


const body = document.body;
const navHeader = 'header';
const triggerMenu = document.querySelector('.trigger-menu');
const triggerMenuButton = document.querySelector('.menu--items_close button');
const nav = document.querySelector('.header--navigation nav');
const menu = document.querySelector('.header--navigation + .menu--items');
const scrollUp = 'scroll-up';
const scrollDown = 'scroll-down';
let lastScroll = 0;

// // window scroll down add class to menu
// $(window).scroll(function () {
//   if ($(this).scrollTop() > '500') {
//     $(navHeader).addClass('scroll-fix-top');
//   } else {
//     $(navHeader).removeClass('scroll-fix-top');
//   }
// });


// menu items transition
var t1 = new TimelineMax({ paused: true });
t1.to('.menu--items', 0.5, {
  top: '0%',
  ease: Expo.easeInOut
});

t1.staggerFrom(
  '.menu--items ul li, .menu--items > div',
  1,
  { x: -200, opacity: 0, ease: Expo.easeOut },
  0.1
);

t1.reverse();


// menu transition and action on click
$(document).on(
  'click',
  '.trigger-menu, .menu--items_close, .menu--items ul li a',
  function() {
    body.classList.toggle('menu-open');
    t1.reversed(!t1.reversed());
    console.log('demo');
  }
);

// page transition
function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// Function to add and remove the page transition screen
function pageTransition() {
  $('.loading-container').each(function (i) {
    var tl = gsap.timeline();
    tl.set('.loading-screen', { transformOrigin: 'bottom left' });
    tl.to('.loading-screen', { duration: 0.5, scaleY: 1 });
    tl.to('.loading-screen', {
      duration: 0.5,
      scaleY: 0,
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out',
      delay: 0.5
    });
  });
}

// Function to animate the header of each page
function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(
    '.header--page .hero--text_title span, .header--page .section__header-text_kicker',
    1,
    { duration: 0.5, translateY: 10, opacity: 0, stagger: 0.4 }
  );
  tl.from(
    '.header--navigation',
    1,
    { duration: 0.5, translateY: -10, opacity: 0 },
    '-=1.5'
  );
}


