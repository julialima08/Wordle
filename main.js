const gameBoard = document.querySelector('.Game-container')
const keyboard = document.querySelector('.Keyboard')
const message = document.querySelector('.message')

let startRow = 0
let startTile = 0

let word = 'hello'

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

let endGame = false

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
  keyButtons.addEventListener('click', () => keyClicked(key))
  keyboard.append(keyButtons)
})

const keyClicked = (key) => {
  if (!endGame) {
    if (key === '«') {
      deleteLetter()
      return
    }
    if (key === 'ENTER') {
      checkRow()
      return
    }
    addLetter(key)
  }
}

const addLetter = (letter) => {
  if (startTile < 5 && startRow < 6) {
    const tile = document.getElementById(
      'row-' + startRow + 'tile-' + startTile
    )
    tile.innerHTML = letter
    gameRows[startRow][startTile] = letter
    tile.setAttribute('data', letter)
    startTile++
  }
}

const deleteLetter = () => {
  if (startTile > 0) {
    startTile--
    const tile = document.getElementById(
      'row-' + startRow + 'tile-' + startTile
    )
    tile.innerHTML = ''
    gameRows[startRow][startTile] = ''
    tile.setAttribute('data', '')
  }
}

const checkRow = () => {
  const playerWord = gameRows[startRow].join('')
  tileColor()
  if (startTile >= 4) {
    if (playerWord == word.toUpperCase()) {
      endGame = true
      return
    } else {
      if (startRow < 5) {
        startRow++
        startTile = 0
        return
      }
      if (startRow >= 5) {
        endGame = true
        return
      }
    }
  }
}

const tileColor = () => {
  const rowChildren = document.getElementById('row-' + startRow).childNodes
  rowChildren.forEach((tile, index) => {
    const letter = tile.getAttribute('data')
    if (letter == word[index].toUpperCase()) {
      tile.classList.add('green')
    } else if (word.toUpperCase().includes(letter)) {
      tile.classList.add('yellow')
    } else {
      tile.classList.add('grey')
    }
  })
}
