import deck from '@/decks/standard-52-card/deck.js'
// todo specify deck dynacmically

const levels = {
  1: {
    deck: deck,
    numberOfPairs: 2
  }
}

function Game (settings) {
  var cards = {}
  for (var i = 0; i < settings.numberOfPairs * 2; i++) {
    var id = i
    var card = Object.create(settings.deck.cards[Math.floor(i / 2)], {
      id: {
        value: id,
        writable: true,
        configurable: true,
        enumerable: true
      },
      faceUp: {
        value: false,
        writable: true,
        configurable: true,
        enumerable: true
      },
      revealed: {
        value: false,
        writable: true,
        configurable: true,
        enumerable: true
      }
    })
    cards[id] = card
  }
  function flipCard (id) {
    var card = cards[id]
    card.revealed = true// todo: tie to faceup
    card.faceUp = !card.faceUp
  }
  function getVisibleCards () {
    var visibleCards = []
    for (var id in cards) {
      var card = cards[id]
      visibleCards.push({
        id: card.id,
        faceUp: card.faceUp,
        back: settings.deck.back,
        face: card.revealed ? card.face.image : undefined
      })
    }
    return visibleCards
  }
  return {
    flipCard: flipCard,
    getVisibleCards: getVisibleCards
  }
}

var game

export default {
  startLevel: (levelNumber) => {
    return new Promise((resolve, reject) => {
      const level = levels[levelNumber]
      game = new Game(level)
      resolve({
        cards: game.getVisibleCards()
      })
    })
  },
  flipCard: (id) => {
    return new Promise((resolve, reject) => {
      game.flipCard(id)
      resolve({
        cards: game.getVisibleCards()
      })
    })
  }
}
