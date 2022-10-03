const gameBoard = document.querySelector('.Game-container')
const keyboard = document.querySelector('.Keyboard')
const message = document.querySelector('.message')

let startRow = 0
let startTile = 0

let word = 'Hello'

const gameRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  '«',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  'ENTER'
]

gameRows.forEach((row, rowIndex) => {
  const rows = document.createElement('div')
  rows.setAttribute('id', 'row-' + rowIndex)
  row.forEach((tile, tileIndex) => {
    const tiles = document.createElement('div')
    tiles.setAttribute('id', 'row-' + rowIndex + 'tile-' + tileIndex)
    tiles.classList.add('tile')
    rows.append(tiles)
  })
  gameBoard.append(rows)
})

keys.forEach((key) => {
  const keyButtons = document.createElement('button')
  keyButtons.innerText = key
  keyButtons.classList.add('key-buttons')
  keyButtons.addEventListener('click', keyClicked)
  keyboard.append(keyButtons)
})

const keyClicked = () => {
  console.log('clicked')
}
