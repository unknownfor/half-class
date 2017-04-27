;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-mima" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M780.993942 419.328367l-14.94948 0 0 0L631.291408 419.328367l0 0L376.921024 419.328367 376.921024 269.642207c0-49.581232 60.318784-104.745622 134.659933-104.745622 74.368778 0 134.754077 55.165414 134.754077 104.745622l0 36.789904c0 0.214894 0 0.435928 0 0.645706 0 0.199545 0 0.418532 0 0.650823l0 6.840802 0.530073 0c3.579525 25.388227 25.418926 44.89449 51.773154 44.89449 26.446325 0 48.220235-19.506263 51.867298-44.89449l0.595564 0 0-44.926212c0-115.713418-107.280352-209.525014-239.518119-209.525014-132.210138 0-239.457744 93.812619-239.457744 209.525014l0 149.686161-29.960359 0c-49.549509 0-89.74907 40.205701-89.74907 89.787956l0 359.218338c0 49.583279 40.199561 89.773629 89.74907 89.773629l538.831089 0c49.617048 0 89.781816-40.190351 89.781816-89.773629L870.777805 509.116323C870.775758 459.534068 830.61099 419.328367 780.993942 419.328367zM556.518425 750.851946l0 40.933271c0 25.716708-20.1182 46.550199-44.936445 46.550199-24.75787 0-44.910862-20.833491-44.910862-46.550199l0-40.933271c-35.361369-16.570397-59.887972-52.175313-59.887972-93.429903 0-57.116859 46.962591-103.433744 104.798834-103.433744 57.896618 0 104.792695 46.316885 104.792695 103.433744C616.374674 698.676633 591.913563 734.281549 556.518425 750.851946z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xialajiantou" viewBox="0 0 1028 1024">' +
    '' +
    '<path d="M1012.100996 272.91167c-0.001023 12.384052-4.697999 24.158213-13.225209 33.154098l-439.766862 464.939171c-14.035668 14.875802-36.366256 18.683525-55.590086 9.488095l-0.00921-0.00614c-0.722454-0.508583-1.775436-1.248434-3.118014-1.963725-1.164522-0.661056-2.345418-1.287319-3.53143-1.912559-2.24718-1.182942-4.062526-2.140757-5.29561-3.189645-0.537236-0.671289-1.140986-1.394766-1.896186-2.180666-1.532913-1.676176-3.116991-2.774183-4.234441-3.457752L42.478464 308.250526c-8.767688-9.008164-13.58132-20.865213-13.58132-33.410947 0.002047-12.971429 5.41329-25.612331 14.846126-34.68087 19.241226-18.48705 49.881061-17.935488 68.299549 1.234107l411.257551 426.799526 405.381727-428.53096c18.34788-19.349697 48.984644-20.206204 68.292386-1.899256 9.753131 9.246595 15.125489 21.727861 15.125489 35.146475L1012.099972 272.91167z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yanzhengma" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M919.561369 245.727541c-0.899486-28.28623-24.311709-55.009871-52.010561-59.8409 0 0-107.385752-16.977673-167.643138-38.420031-75.231425-26.770713-149.681044-85.617983-149.681044-85.617983-23.220864-16.58063-58.83806-15.552208-80.374562 2.372024 0 0-52.704362 53.179177-151.044088 84.22117-90.852194 36.510542-163.464979 40.248679-163.464979 40.248679-27.402093 3.571339-50.991348 28.867468-51.522444 57.147558 0 0-3.690042 145.387251 0.966001 272.985348 1.759063 228.268914 271.994788 453.937606 408.55193 453.937606 134.416386 0 366.709963-157.224858 403.249157-450.619024C925.617295 347.953783 919.561369 245.727541 919.561369 245.727541zM709.887976 445.981401 477.54835 681.152515c-9.899464 10.018168-26.696012 11.174504-38.07927 2.124384l-121.329323-96.414887c-22.289656-17.711384-24.614607-48.538483-4.89038-69.169359 19.587104-20.48966 53.223179-23.199375 75.962066-5.403057l56.322773 44.083008 193.563484-182.358281c20.162202-18.995633 52.216245-18.458397 71.897493 0.325411-0.281409-0.293689-0.35918-0.693802-0.649799-0.984421l1.64036 1.64343c-0.290619-0.290619-0.696872-0.3776-0.99056-0.659009C729.922265 394.23076 729.659275 425.969625 709.887976 445.981401z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iphone" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M704 64H285.866667c-49.066667 0-89.6 40.533333-89.6 89.6v716.8c0 49.066667 40.533333 89.6 89.6 89.6H704c49.066667 0 89.6-40.533333 89.6-89.6V153.6C793.6 104.533333 753.066667 64 704 64z m-209.066667 866.133333c-25.6 0-44.8-19.2-44.8-44.8s19.2-44.8 44.8-44.8 44.8 19.2 44.8 44.8-19.2 44.8-44.8 44.8z m209.066667-149.333333c0 17.066667-12.8 29.866667-29.866667 29.866667H315.733333c-17.066667 0-29.866667-12.8-29.866666-29.866667V213.333333c0-17.066667 12.8-29.866667 29.866666-29.866666h358.4c17.066667 0 29.866667 12.8 29.866667 29.866666v567.466667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
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

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)