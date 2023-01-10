import './style.css'
import Lenis from '@studio-freight/lenis'

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function offset(el) {
  const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

//DOM
const DOM = {}
DOM.main = document.querySelector('.c-main')

//VARS
const offsetHeightMain = DOM.main.offsetHeight
const startMain = offset(DOM.main).top
let scrollPercent = 0

lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  if(scroll >= startMain) {
    scrollPercent = (scroll - startMain) / offsetHeightMain
    
    DOM.main.setAttribute('style', `--progress:${scrollPercent}`)
  }

})