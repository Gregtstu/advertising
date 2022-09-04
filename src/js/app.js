const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const countdown = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ce2714', '#FF1493', '#ef0a40',
  '#EE25EE', '#832355', '#440c0c', '#ee1e75']
const reload = document.querySelector('.reload');
let time = 20
let score = 0
let text = document.querySelectorAll('.text')
startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()

  }
})

function startGame () {
  setInterval(decreaseTime, 1000)
  setTime(time)
  createRandomCircle()
}

function decreaseTime () {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime (value) {
  countdown.innerHTML = `00:${value}`
}

function finishGame () {
  board.innerHTML = `
  <h1>Your score: <span class="primary">${score}</span></h1>
  <button class="next">подробнее</button>
  `
  document.querySelector('.next').addEventListener('click', ()=> {
    screens[2].classList.add('up')
  })
  // countdown.parentNode.classList.add('hide')
  text.innerHTML = score;
}

function createRandomCircle () {
  const circle = document.createElement('div')
  const size = getRandomNumber(15, 70)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = board.style.backgroundColor  =  getRandomColor()
  board.append(circle)
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor () {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

reload.addEventListener('click' , ()=>{
  window.location.reload();
})

