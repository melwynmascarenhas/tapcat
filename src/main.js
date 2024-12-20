/* eslint-disable */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import ScrambleText from 'scramble-text'
gsap.registerPlugin(ScrollTrigger)

import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
} from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
Swiper.use([
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
])

//LENIS SCROLL
window.onload = function () {
  document.body.style.overflow = 'hidden'
  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  //PRELOADER

  const preloaderTL = gsap.timeline()
  // GIVE UNIQUE IDS TO EACH FILTER
  document.querySelectorAll('.svg-filter').forEach(function (element, index) {
    element.parentElement.style.filter = 'url(#svg-filter-' + index + ')'
    element.querySelector('filter').setAttribute('id', 'svg-filter-' + index)
  })

  let loaderBg = document.querySelector('.loader-bg')
  let loadGrid = document.querySelector('.load-grid')

  let sceneWrap = document.querySelector('.hero_coin-spline-wrap')
  let splineFilter = sceneWrap.querySelector('.svg-filter')

  gsap.set(splineFilter.querySelector('[baseFrequency]'), {
    attr: { baseFrequency: 0.9 },
  })
  gsap.set(splineFilter.querySelector('[scale]'), { attr: { scale: 2000 } })

  // on cover text
  let coverText = document.querySelector('.hero_text-wrap')
  let coverFilter = coverText.querySelector('.svg-filter')

  //PRELOADER TIMELINE

  const numberElement = document.querySelector('.number')
  let counter = 0
  const duration = 2500 // 4 seconds
  const interval = duration / 100 // interval for each increment

  function updateCount() {
    const updateCounter = setInterval(() => {
      counter++
      numberElement.textContent = counter
      if (counter === 100) {
        clearInterval(updateCounter)
      }
    }, interval)
  }

  preloaderTL
    .to('svg rect', {
      duration: 3,
      width: '100%', // Animate the width to cover the SVG
      ease: 'power1.inOut',
      onStart: updateCount,
    })
    .to(['.loader-wrap', '.status-wrap'], {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.inOut',
    })
    .to(loaderBg, {
      opacity: 0,
      duration: 3,
    })
    .to(
      loadGrid,
      {
        opacity: 0,
        duration: 3,
      },
      '<+1'
    )
    .to(
      splineFilter.querySelector('[scale]'),
      { attr: { scale: 0 }, duration: 3 },
      '<-1'
    )
    .fromTo(
      coverFilter.querySelector('[stdDeviation]'),
      { attr: { stdDeviation: 100 } },
      {
        attr: { stdDeviation: 0 },
        duration: 2,
        onComplete: enableScrolling,
      },
      '>-1'
    )
}

function enableScrolling() {
  // Enable scrolling after the delay
  document.body.style.overflowY = 'auto'
}

// //

//menu nav links code
let menuWrap = document.querySelector('.menu_wrap')
let menuIcon = document.querySelector('.menu')
let closeIcon = document.querySelector('.close')
let mobLinks = document.querySelectorAll('.mob-nav-link')

mobLinks.forEach((link) => {
  link.addEventListener('click', hideMenu)
})

function showMenu() {
  menuWrap.style.display = 'flex'
  setTimeout(() => {
    closeIcon.classList.add('show-icon')
    menuIcon.classList.remove('show-icon')
    menuWrap.style.opacity = '1'
  }, 100)
}

function hideMenu() {
  menuIcon.classList.add('show-icon')
  closeIcon.classList.remove('show-icon')
  menuWrap.style.opacity = '0'
  setTimeout(() => {
    menuWrap.style.display = 'none'
  }, 500)
}

menuIcon.addEventListener('click', showMenu)
closeIcon.addEventListener('click', hideMenu)
//menu nav links code ends

//  feature swiper hover blur
let element = document.querySelector('.feature_slide')
let svg = element.querySelector('.svg-filter')
let glow = document.querySelector('.is-features .glow')

let tl = gsap.timeline({
  paused: true,
  defaults: {
    duration: 0.2,
    ease: 'power1.out',
  },
})
tl.fromTo(
  svg.querySelectorAll('[stdDeviation]'),
  { attr: { stdDeviation: 0 } },
  { attr: { stdDeviation: 3 } }
).to(glow, { opacity: 0.3 }, '<')

element.addEventListener('mouseenter', function () {
  tl.play()
})
element.addEventListener('mouseleave', function () {
  tl.reverse()
})

const bulletWrapper = document.querySelector('.swiper-bullet-wrapper')
bulletWrapper.style.borderRadius = '100vw'
bulletWrapper.style.overflow = 'hidden'

//TEXT SLIDER
const textslider = new Swiper('.features_swiper', {
  slidesPerView: 1,
  speed: 1000,
  loop: true,
  grabCursor: true,
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  slideToClickedSlide: true,
  centeredSlides: true,
  allowTouchMove: true, //click and drag to change
  followFinger: true, //move with click and drag
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: bulletWrapper,
    bulletClass: 'swiper-bullet',
    bulletActiveClass: 'is-active',
    bulletElement: 'button',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        //
        '<div class="' +
        'bullet-bg' +
        '">' +
        '</div>' +
        //
        '<div class="' +
        'bullet-progress' +
        '">' +
        '</div>' +
        //
        '<div class="' +
        'o-progress' +
        '">' +
        '</div>' +
        //
        '</span>'
      )
    },
  },

  on: {
    realIndexChange: function () {
      // Get the real index
      const realIndex = this.realIndex

      // Loop through each bullet
      document.querySelectorAll('.swiper-bullet').forEach((bullet, index) => {
        const oProgress = bullet.querySelector('.o-progress')
        // Check if the index of the bullet is less than the realIndex
        if (realIndex == 0) {
          if (oProgress) {
            oProgress.style.display = 'none'
          }
        } else if (index < realIndex) {
          // Find the o-progress div within the bullet and set its display to block
          if (oProgress) {
            oProgress.style.display = 'block'
          }
        }
      })
    },
  },
})
//

//ghost text reveal
document
  .querySelectorAll('.section-heading')
  .forEach(function (element, index) {
    let svg = element.querySelector('.svg-filter')

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
      },
    })

    tl.fromTo(
      svg.querySelector('[stdDeviation]'),
      { attr: { stdDeviation: 100 } },
      { attr: { stdDeviation: 0 }, duration: 0.3, ease: 'power1.out' }
    )
  })

// Initialize bgSwiper
const bgSwiper = new Swiper('.is-gallery-text', {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  allowTouchMove: false,
})

// Initialize gallerySlider
const gallerySlider = new Swiper('.swiper.is-gallery', {
  slidesPerView: 1,
  loop: true,
  centeredSlides: true,
  speed: 800,
  allowTouchMove: true,
  keyboard: true,
  mousewheel: {
    enabled: true,
    forceToAxis: true, // Ensures only horizontal scrolling changes slides
    releaseOnEdges: false, // Prevents release on edges if you want continuous scrolling
    sensitivity: 1, // Adjust sensitivity to your preference
  },
  thumbs: {
    swiper: bgSwiper,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 3,
    },
  },
})

// Set the control of bgSwiper to gallerySlider
//bgSwiper.controller.control = gallerySlider

let splitText
splitText = new SplitType('[scramble]', {
  types: 'words, chars',
})

const links = document.querySelectorAll('[scramble]')
links.forEach((link) => {
  //select the letters to add stagger
  //!select the letters in the current link not the document
  const letters = link.querySelectorAll('[scramble-text] .char')
  //add event lintener to all links
  link.addEventListener('mouseenter', function hovered(event) {
    letters.forEach((letter) => {
      var scrambleText = new ScrambleText(letter, {
        timeOffset: 300,
        chars: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ],
        callback: function () {
          setTimeout(() => {
            event.target.addEventListener('mouseenter', hovered)
          }, 300)
        },
      })
      scrambleText.start().play()
      event.target.removeEventListener('mouseenter', hovered)
    })
  })
})

// let rtContain = document.querySelectorAll('[rt-contain]')
// rtContain.forEach((contain) => {
//   const headingtext = contain.querySelectorAll('[rt-head] .char')
//   const subtext = contain.querySelectorAll('[rt-sub] .char')
//   gsap.set([headingtext, subtext], { autoAlpha: 0 })

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: contain,
//       start: 'top 95%',
//       end: 'top 80%',
//       toggleActions: 'none play none reset',
//     },
//   })

//   tl.to(headingtext, {
//     autoAlpha: 1,
//     duration: 1,
//     ease: 'none',
//     stagger: { each: 0.04, from: 'start' },
//     overwrite: true,
//   }).to(
//     subtext,
//     {
//       autoAlpha: 1,
//       duration: 1,
//       ease: 'power1',
//       stagger: { each: 0.005, from: 'random' },
//       overwrite: true,
//     },
//     '>-0.5'
//   )
// })

//refresh on resize
window.addEventListener('resize', () => {
  hideMenu()
})

let seperator = document.querySelector('.seperator')
console.log(seperator)

let des = seperator.querySelectorAll('.design-wrap')

gsap.fromTo(
  des,
  { autoAlpha: 0 },
  {
    autoAlpha: 1,
    duration: 0.2,
    ease: 'none',
    stagger: { each: 0.01, from: 'center' },
    scrollTrigger: {
      trigger: seperator,
      start: 'top 100%',
      toggleActions: 'play none none reset',
    },
  }
)
