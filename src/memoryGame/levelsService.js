import deck from '@/core/decks/standard-52-card/deck.js'

const levels = {
  1: {
    deck: deck,
    numberOfPairs: 2
  }
}

export default {
  startLevel: (levelNumber) => {
    return new Promise((resolve, reject) => {
      const level = levels[levelNumber]
      var cards = []
      var i
      for (i = 0; i < level.numberOfPairs * 2; i++) {
        cards.push({
          id: i,
          faceUp: false,
          back: deck.back
        })
      }
      resolve({
        cards: cards
      })
    })
  }
}
