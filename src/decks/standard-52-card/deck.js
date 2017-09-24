const SpritesFile = require('./sprites.svg')
const deck = {
  cards: [
    card('', 'redJoker'),
    card('', 'blackJoker'),
    card('', 'blank')
  ],
  back: sprite('back')
}
for (let suite of ['spades', 'hearts', 'diamonds', 'clubs']) {
  for (let rank of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
    deck.cards.push(card(suite, rank))
  }
}
function sprite (id) {
  return `${SpritesFile}#${id}`
}
function card (suite, rank) {
  const id = `${suite}${rank}`
  return {
    id: id,
    face: {
      image: sprite(id)
    },
    suite: suite,
    rank: rank
  }
}

export default deck
