const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const board = document.querySelector('#board')
const colors = ['#59dece', '#bf064a', '#6f06bf', '#47ff7b', '#ffed47', '#47f3ff', '#ff47d7'];

const timeEl = document.querySelector('#time')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timelist.addEventListener('click', event => {
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

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle()
  timeEl.innerHTML = `00:${time}`
}

function decreaseTime() {
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

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Ваш счет: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRundomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRundomNumber(0, width - size)
  const y = getRundomNumber(0, width - size)

  setColor(circle)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = `${getRandomColor()}`

  board.append(circle)
}

function getRundomNumber(min, max) {
  return Math.floor(Math.random() * max) + min
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

