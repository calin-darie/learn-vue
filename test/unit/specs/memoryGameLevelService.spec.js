import levelsService from '@/memoryGame/levelsService'

describe('memory game level service', () => {
  it('starts with 4 cards for level 1', (done) => {
    levelsService.startLevel(1).then(levelData => {
      levelData.cards.length.should.equal(4)
      done()
    }, done)
    .catch(done)
  })
})
