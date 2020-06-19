/* cursor  */
let cursor = document.getElementById("cursor");
document.addEventListener("mousemove", function (e) {
  let x = e.clientX,
    y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

document.querySelectorAll("a").forEach(function (el) {
  el.addEventListener("mouseover", function (e) {
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.opacity = "0.3";
  });
  el.addEventListener("mouseout", function (e) {
    cursor.style.width = "6px";
    cursor.style.height = "6px";
    cursor.style.opacity = "1";
  });
});

// page transition
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// Function to add and remove the page transition screen
function pageTransition() {
  $(".loading-container").each(function (i) {
    let tl = gsap.timeline();
    tl.set(".loading-screen", { transformOrigin: "bottom left" });
    tl.to(".loading-screen", { duration: " .5", scaleY: 1 });
    tl.to(".loading-screen", {
      duration: ".5",
      scaleY: 0,
      skewX: 0,
      transformOrigin: "top left",
      ease: "power1.out",
      delay: 0,
    });
  });
}
pageTransition();

// Function to animate the header of each page
function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(
    ".header--page .hero--text_title span, .header--page .section__header-text_kicker",

    { duration: 0.5, translateY: 10, opacity: 0, stagger: 0.4 }
  );
  tl.from(
    ".header--navigation",

    { duration: 0.5, translateY: -10, opacity: 0 }
  );
  tl.from(
    "main",

    { duration: 0.5, translateY: -10, opacity: 0 }
  );
}
contentAnimation();
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

// $(function () {
//   barba.init({
//     sync: true,

//     transitions: [
//       {
//         async leave(data) {
//           const done = this.async();

//           pageTransition();
//           await delay(1000);
//           done();
//         },

//         async enter(data) {
//           contentAnimation();
//         },

//         async once(data) {
//           contentAnimation();
//         },
//       },
//     ],
//   });
// });

AOS.init({
  duration: 700,
  once: true,
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
if (screen.width > 620) {
  var previousScroll = 0,
    headerOrgOffset = $("header").height();
  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > headerOrgOffset) {
      if (currentScroll > previousScroll) {
        $("header").slideUp();
      } else {
        $("header").slideDown();
      }
    } else {
      $("header").slideDown();
    }
    previousScroll = currentScroll;
  });
}

/* footer rillusion logo animation  */
if (document.getElementById("footer-logo")) {
  new Vivus("footer-logo", { duration: 200 });
}

/* header nav */
const body = document.body;
const navHeader = document.getElementsByTagName("header");

// menu items transition
var t1 = new TimelineMax({ paused: true });
// t1.staggerFrom('.menu--items', 0.2, {
//   x: '0%',
//   ease: Expo.easeInOut,
// });

t1.staggerFrom(".menu--items ul li", 0.2, {
  x: -200,
  opacity: 0,
  ease: Expo.easeOut,
});

t1.reverse();

// menu transition and action on click
$(document).on("click", ".trigger-menu, .menu--items_close", function () {
  body.classList.toggle("menu-open");
  t1.reversed(!t1.reversed());
  console.log("demo");
});
