;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-back" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M1023.936 512c0 282.730667-229.205333 511.936-511.936 511.936C229.269333 1023.936 0.064 794.730667 0.064 512 0.064 229.269333 229.269333 0.064 512 0.064 794.730667 0.064 1023.936 229.269333 1023.936 512zM512 44.693333C253.909333 44.693333 44.693333 253.909333 44.693333 512c0 258.090667 209.216 467.306667 467.306667 467.306667 258.090667 0 467.306667-209.237333 467.306667-467.306667C979.306667 253.909333 770.090667 44.693333 512 44.693333z"  ></path>'+
      ''+
      '<path d="M350.037333 512l263.488 263.488-23.573333 23.573333L302.805333 512 589.866667 224.938667l23.573333 23.594667L350.037333 512z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-cart" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M352.512 832c-35.36 0-64 28.64-64 64s28.64 64 64 64 64-28.64 64-64S387.872 832 352.512 832L352.512 832zM800.512 832c-35.36 0-64 28.64-64 64s28.64 64 64 64 64-28.64 64-64S835.872 832 800.512 832L800.512 832zM864 800 344.224 800c-46.112 0-86.656-36.48-92.288-83.04l-54.272-382.08-30.88-178.56C164.864 140.736 150.656 128 136.768 128L96 128C78.336 128 64 113.664 64 96s14.336-32 32-32l40.768 0c46.688 0 87.68 36.48 93.344 83.04l30.816 177.888 54.496 383.712C317.216 723.488 330.656 736 344.224 736L864 736c17.696 0 32 14.304 32 32S881.696 800 864 800zM384.224 672c-16.608 0-30.656-12.8-31.872-29.664-1.312-17.632 11.936-32.96 29.536-34.24l434.112-32c15.936-0.096 29.376-12.608 31.136-26.848l50.4-288.384c1.28-10.752-1.696-22.528-8.128-29.824C885.28 226.368 880.096 224 874.048 224L320 224C302.336 224 288 209.664 288 192s14.336-32 32-32l554.048 0c24.448 0 46.912 10.144 63.264 28.608 18.688 21.088 27.264 50.816 23.52 81.632l-50.432 288.416C904.96 603.52 864.448 640 818.336 640l-431.744 31.904C385.792 671.968 384.992 672 384.224 672z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-reduce" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M511.118 6.364C230.99 6.364 3.903 233.455 3.903 513.583c0 280.124 227.087 507.215 507.215 507.215s507.215-227.091 507.215-507.215C1018.333 233.455 791.246 6.364 511.118 6.364zM514.868 956.583c-244.526 0-442.754-198.784-442.754-444 0-245.22 198.228-444.008 442.754-444.008s442.754 198.788 442.754 444.008C957.622 757.799 759.393 956.583 514.868 956.583z"  ></path>'+
      ''+
      '<path d="M273.429 475.771l475.379 0 0 75.62-475.379 0 0-75.62Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-add" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M511.734 0.53C229.577 0.53 0 230.107 0 512.265 0 794.423 229.577 1024 511.734 1024c282.158 0 511.735-229.577 511.735-511.735C1023.47 230.107 793.893 0.53 511.734 0.53zM511.734 960.033c-246.912 0-447.768-200.855-447.768-447.769 0-246.912 200.856-447.768 447.768-447.768 246.913 0 447.769 200.855 447.769 447.768C959.503 759.178 758.647 960.033 511.734 960.033zM703.636 480.282 543.719 480.282 543.719 320.365c0-17.655-14.297-31.984-31.984-31.984-17.686 0-31.983 14.329-31.983 31.984l0 159.917L319.834 480.282c-17.687 0-31.983 14.328-31.983 31.982 0 17.655 14.297 31.984 31.983 31.984l159.917 0 0 159.917c0 17.654 14.297 31.983 31.983 31.983 17.688 0 31.984-14.329 31.984-31.983L543.718 544.249l159.917 0c17.687 0 31.983-14.329 31.983-31.984C735.619 494.61 721.322 480.282 703.636 480.282z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-loading" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512.212 31.667"  ></path>'+
      ''+
      '<path d="M512.005 63.932c-0.133 0-0.265 0.002-0.397 0.003 0 0-13.474-1.081-26.394 11.84-10.22 10.22-9.426 24.438-9.426 24.438s-0.053 14.906 8.79 23.749c12.762 12.762 27.03 11.535 27.03 11.535 208.174 0 376.932 168.758 376.932 376.932S719.781 889.36 511.608 889.36 134.676 720.602 134.676 512.428c0-0.274 0.005-0.547 0.005-0.821 0 0 0.755-14.594-10.441-25.79-10.417-10.417-24.521-9.638-24.521-9.638s-14.226-0.681-24.74 9.833c-12.948 12.948-11.045 25.595-11.045 25.595 0 0.133-0.003 0.266-0.003 0.399 0 247.464 200.61 448.074 448.074 448.074s448.074-200.61 448.074-448.074S759.469 63.932 512.005 63.932z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
