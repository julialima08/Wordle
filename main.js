const gameBoard = document.querySelector('.Game-container')
const keyboard = document.querySelector('.Keyboard')
const message = document.querySelector('.message')

let startRow = 0
let startTile = 0

const wordList = async () => {
  let response = await axios.get( url:
    'https://random-words5.p.rapidapi.com/getRandom',
    params: { wordLength: '5' },
    headers: {
      'X-RapidAPI-Key': '7d3489c981mshd8b003a4a76fc64p1d5f38jsn5939fc8db612',
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    })
  console.log(response)
}
wordList()
// let words = [
//   'Alert',
//   'Alive',
//   'Audio',
//   'Actor',
//   'Angry',
//   'Beach',
//   'Birth',
//   'Blame',
//   'Basic',
//   'Board',
//   'Crash',
//   'Crime',
//   'Clear',
//   'Cause',
//   'Cycle',
//   'Dance',
//   'Delay',
//   'Dozen',
//   'Drawn',
//   'Dying',
//   'Early',
//   'Enemy',
//   'Enjoy',
//   'Error',
//   'Extra',
//   'Fraud',
//   'Fully',
//   'Fight',
//   'Floor',
//   'Faith',
//   'Globe',
//   'Going',
//   'Gross',
//   'Given',
//   'Guest',
//   'Heart',
//   'Heavy',
//   'Hotel',
//   'Human',
//   'Happy',
//   'Image',
//   'Input',
//   'Issue',
//   'Irony',
//   'Inner',
//   'Juice',
//   'Joint',
//   'Judge',
//   'juicy',
//   'Known',
//   'Knife',
//   'Large',
//   'Laugh',
//   'Logic',
//   'Lunch',
//   'Lying',
//   'Leave',
//   'Media',
//   'Minor',
//   'Mouth',
//   'Major',
//   'Music',
//   'Novel',
//   'Newly',
//   'North',
//   'Nurse',
//   'Needs',
//   'Offer',
//   'Order',
//   'Other',
//   'Other',
//   'Ocean',
//   'Paint',
//   'Paper',
//   'Photo',
//   'Piece',
//   'Place',
//   'Queen',
//   'Quiet',
//   'Quick',
//   'Quite',
//   'Roman',
//   'Rough',
//   'River',
//   'Ready',
//   'Rural',
//   'Serve',
//   'Shall',
//   'Sharp',
//   'Shift',
//   'Shown',
//   'Sixty',
//   'Taxes',
//   'Touch',
//   'Tower',
//   'Trade',
//   'Theft',
//   'Upset',
//   'Urban',
//   'Usage',
//   'Usual',
//   'Unity',
//   'Value',
//   'Video',
//   'Vital',
//   'Virus',
//   'Visit',
//   'Woman',
//   'Water',
//   'Wheel',
//   'While',
//   'World',
//   'yacht',
//   'Yield',
//   'Young',
//   'Youth',
//   'zappy',
//   'zebra',
//   'zilch'
// ]

// let word = words[Math.floor(Math.random() * words.length)]

let popUp = document.querySelector('.popup')
let close = document.querySelector('.close')
let popUpMessage = document.querySelector('h4')
let confettiFalling = document.querySelector('#my-canvas')

let gameRows = [
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
      popUp.classList.add('active')
      popUpMessage.innerText = `Correct!`
      const replayButton = document.createElement('button')
      replayButton.setAttribute('id', 'replay')
      replayButton.innerText = 'replay'
      popUpMessage.append(replayButton)
      close.onclick = function () {
        popUp.classList.remove('active')
        confettiFalling.classList.remove('active')
      }
      confettiFalling.classList.add('active')
      var confettiSettings = { target: 'my-canvas' }
      var confetti = new ConfettiGenerator(confettiSettings)
      confetti.render()
      replayGame()
      return
    } else {
      if (startRow < 5) {
        startRow++
        startTile = 0
        return
      }
      if (startRow >= 5) {
        endGame = true
        popUp.classList.add('active')
        popUpMessage.innerText = `Nope! Try again`
        close.onclick = function () {
          popUp.classList.remove('active')
          confettiFalling.classList.remove('active')
        }
        const replayButton = document.createElement('button')
        replayButton.setAttribute('id', 'replay')
        replayButton.innerText = 'replay'
        popUpMessage.append(replayButton)
        replayGame()
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

const replayGame = () => {
  const replayButton = document.getElementById('replay')
  replayButton.addEventListener('click', () => {
    location.reload()
  })
}
