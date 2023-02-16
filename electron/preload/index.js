function domReady(condition = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const styleContent = `

  .app-loading-wrap{
    position: fixed;
    left: 50%;
    top: 40vh;
    transform: translateX(-50%);
  }
  .css-loader{
    width: 100px;
    height: 100px;
    position: relative;
    animation: antRotate 1.5s linear infinite
  }
  
  .css-loader .item {
    z-index: 1000;
    position: absolute;
    display: block;
    width: 50px;
    height: 50px;
    background-color: #1677ff;
    border-radius: 100%;
    transform: scale(.70);
    transform-origin: 50% 50%;
    opacity: .3;
    animation-name: antSpinMove;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
  }
  
  .css-loader .item:nth-child(1){
    border-radius: 60.5px;
  
  }
  .css-loader .item:nth-child(2){
    border-radius: 60.5px;
    left: 50px;
    top: 50px;
    animation-delay: 0.4s;
  
  }
  
  .css-loader .item:nth-child(3){
    border-radius: 60.5px;
    left: -0px;
    top: 50px;
    animation-delay: 0.8s;
  }
  
  .css-loader .item:nth-child(4){
    left: 50px;
    border-radius: 60.5px;
    animation-delay: 1.2s;
    
  }
  
  @keyframes antSpinMove{
    0%{opacity: 0.1;}
    100%{opacity: 1}
  }
  
  
  @keyframes antRotate{
    0%{    transform: rotate(0deg)};
    100%{ transform: rotate(360deg)}
  }

    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')
  let loaderMarkup = `
  <div class="css-loader">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
`
  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = loaderMarkup

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }

}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)