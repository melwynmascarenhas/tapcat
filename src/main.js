/* eslint-disable */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// GIVE UNIQUE IDS TO EACH FILTER
document.querySelectorAll('.svg-filter').forEach(function (element, index) {
  element.parentElement.style.filter = 'url(#svg-filter-' + index + ')'
  element.querySelector('filter').setAttribute('id', 'svg-filter-' + index)
})

// on hover blur
let element = document.querySelector('.feature-text')
let svg = element.querySelector('.svg-filter')
let tl = gsap.timeline({
  paused: true,
  defaults: {
    duration: 0.5,
    ease: 'power1.out',
  },
})
tl.fromTo(
  svg.querySelectorAll('[stdDeviation]'),
  { attr: { stdDeviation: 0 } },
  { attr: { stdDeviation: 3 } }
)
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
const textslider = new Swiper('.swiper_titles', {
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

//ANIMATE IMAGES ON SCROLL WITH TOGGLE ACTIONS
document
  .querySelectorAll('.section-heading')
  .forEach(function (element, index) {
    let svg = element.querySelector('.svg-filter')

    let tl = gsap.timeline({
      scrollTrigger: {
        scrub: true,
        trigger: element,
        start: 'top bottom',
        end: 'top 50%',
        toggleActions: 'none play none reset',
      },
    })

    tl.fromTo(
      svg.querySelectorAll('[stdDeviation]'),
      { attr: { stdDeviation: 7 } },
      { attr: { stdDeviation: 0 } }
    )
  })
