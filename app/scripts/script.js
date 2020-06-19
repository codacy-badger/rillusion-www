/* cursor  */
let cursor = document.getElementById('cursor');
document.addEventListener('mousemove', function (e) {
  let x = e.clientX,
    y = e.clientY;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
});

document.querySelectorAll('a').forEach(function (el) {
  el.addEventListener('mouseover', function (e) {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.opacity = '0.3';
  });
  el.addEventListener('mouseout', function (e) {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.opacity = '1';
  });
});

// Function to add and remove the page transition screen
function pageTransition() {
  $('.loading-container').each(function (i) {
    let tl = gsap.timeline();
    tl.set('main', {
      translateY: '-30',
      opacity: 0
    });
    tl.set('.loading-screen', {
      transformOrigin: 'bottom left'
    });
    tl.to('.loading-screen', {
      duration: ' .5',
      scaleY: 1
    });
    tl.to('.loading-screen', {
      duration: '.5',
      scaleY: 0,
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out',
      delay: 0,
    });
    tl.from(
      '.header--navigation .width-box a',
      {
        duration: 0.26,
        translateY: '-10',
        opacity: 0,
        stagger: 0.4
      }
    );
    tl.to('main', {
      translateY: 0,
      opacity: 1
    });
  });
}
pageTransition();

AOS.init({
  duration: 700,
  once: true,
});


/* header nav */
const body = document.body,
    navHeader = document.getElementsByTagName('header');

// menu items transition
let t1 = new TimelineMax({
  paused: true
});

t1.staggerFrom('.menu--items', 0.2, {
  x: '0%',
  ease: Expo.easeInOut,
});

t1.staggerFrom('.menu--items ul li', 0.2, {
  x: -200,
  opacity: 0,
  ease: Expo.easeOut,
});

t1.reverse();

// menu transition and action on click
$(document).on('click', '.trigger-menu, .menu--items_close', function () {
  body.classList.toggle('menu-open');
  t1.reversed(!t1.reversed());
  console.log('demo');
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
if (screen.width > 620) {
  var previousScroll = 0,
    headerOrgOffset = $('header').height();
  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > headerOrgOffset) {
      if (currentScroll > previousScroll) {
        $('header').slideUp();
      } else {
        $('header').slideDown();
      }
    } else {
      $('header').slideDown();
    }
    previousScroll = currentScroll;
  });
}

/* footer rillusion logo animation  */
if (document.getElementById('footer-logo')) {
  new Vivus('footer-logo', {
    duration: 200
  });
}
