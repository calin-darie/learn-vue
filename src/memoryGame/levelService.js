import deck from '@/decks/standard-52-card/deck.js'

function Level (settings) {
  const maxFaceUpCards = 2
  // todo specify deck dynacmically
  const levels = {
    1: {
      deck: deck,
      numberOfPairs: 2
    }
  }
  const level = levels[settings.levelNumber]
  const cards = {}
  for (let i = 0; i < level.numberOfPairs * 2; i++) {
    const id = i
    const card = Object.create(level.deck.cards[Math.floor(i / 2)], {
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

  let updates = []

  function flipCard (id) {
    const card = cards[id]
    card.faceUp = !card.faceUp
    card.revealed = true// todo: tie to faceup
    enqueueUpdate()
    let faceUpCards = Object.values(cards).filter(c => c.faceUp)
    if (faceUpCards.length === maxFaceUpCards) {
      for (const card of faceUpCards) {
        card.faceUp = false
      }
      enqueueUpdate()
    }
    flushUpdates()
  }
  function getVisibleCards () {
    const visibleCards = []
    for (const card of Object.values(cards)) {
      visibleCards.push({
        id: card.id,
        faceUp: card.faceUp,
        back: level.deck.back,
        face: card.revealed ? card.face.image : undefined
      })
    }
    return visibleCards
  }
  function start () {
    enqueueUpdate()
    flushUpdates()
  }
  function enqueueUpdate () {
    updates.push({
      cards: getVisibleCards()
    })
  }
  function flushUpdates () {
    settings.update(updates)
    updates = []
  }
  return {
    flipCard: flipCard,
    getVisibleCards: getVisibleCards,
    start: start
  }
}

function LevelService (settings) {
  let level = new Level(settings)
  let proxy = new Proxy(level, {
    get: (obj, prop) => {
      if (typeof level[prop] !== 'function') {
        return level[prop]
      }
      return function () {
        console.log(`calling ${prop} [${arguments}]]`)
        let result = level[prop].apply(level, arguments)
        return result
      }
    }
  })
  return proxy
}

export default LevelService
