// Example 1
const inputField = document.querySelector('input')
const inputText = document.querySelector('.input-count')
const requestsText = document.querySelector('.requests-count')

let inputCount = 0
let requestsCount = 0
//
const timeout = 1200
let isWaiting = false

// การดำเนินการในภายใน Event
inputField.addEventListener('input', () => {
  // นับจำนวน Events
  inputText.innerHTML = ++inputCount
  // ทำงานตาม Callback ที่กำหนดไว้คือ httpRequest()
  if (!isWaiting) {
    isWaiting = true
    httpRequest()
    setTimeout(() => (isWaiting = false), timeout)
  }
})

// Request statement
function httpRequest() {
  // นับจำนวน Requests
  requestsText.innerHTML = ++requestsCount
}

// Example 2
const buttonClick = document.querySelector('button')
const buttonCountText = document.querySelector('.button-count')
const requestsText2 = document.querySelector('.requests-count2')

let buttonCount = 0
let requestsCount2 = 0
//
const timeout2 = 1200
let isWaiting2 = false

// การดำเนินการในภายใน Event
buttonClick.addEventListener('click', () => {
  // นับจำนวน Events
  buttonCountText.innerHTML = ++buttonCount
  // ทำงานตาม Callback ที่กำหนดไว้คือ httpRequest2()
  if (!isWaiting2) {
    isWaiting2 = true
    httpRequest2()
    setTimeout(() => (isWaiting2 = false), timeout2)
  }
})

// Request statement
function httpRequest2() {
  // นับจำนวน Requests
  requestsText2.innerHTML = ++requestsCount2
}