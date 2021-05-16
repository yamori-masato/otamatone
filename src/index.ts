import p5 from 'p5'
import sketch from './sketch'
import FastClick from 'fastclick'

new p5(sketch)

// スクロール禁止
document.addEventListener("touchmove", e => e.preventDefault(), { passive: false })
document.addEventListener("mousewheel", e => e.preventDefault(), { passive: false })

// タップ判定高速化
document.addEventListener('DOMContentLoaded', function() {
  (FastClick as any).attach(document.body)
}, false)