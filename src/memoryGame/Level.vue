<template>
  <div class="level">
    test level {{level}}

    <div class="card" v-for="card of levelData.cards" :key="card.id" 
      :class="{ faceUp: card.faceUp }"
      @click="flipCard(card.id)">
      <img class="back side" :src="card.back"/>
      <img class="face side" :src="card.face" :v-if="card.face"/>
    </div>
  </div>
</template>

<script>
import LevelService from './levelService'
function debugTime () {
  let date = new Date()
  return `${date.getMinutes()}:${date.getSeconds()},${date.getMilliseconds()}`
}
export default {
  name: 'level',
  props: ['level'],
  data () {
    return {
      levelData: { cards: [] },
      pendingUpdates: [],
      updateIntervalToken: null
    }
  },
  watch: {
    level: {
      immediate: true,
      handler (newLevel) {
        this.levelService = new LevelService({
          levelNumber: this.level,
          update: this.update
        })
        this.$options.methods = new Proxy(this.levelService, {})
        this.levelService.start()
      }
    }
  },
  methods: {
    flipCard (cardId) { this.levelService.flipCard(cardId) },
    displayNextUpdate () {
      let update = this.pendingUpdates.shift()
      this.levelData = update
      console.log(`${debugTime()} executing update`, update)
    },
    update (newUpdates) {
      Array.prototype.push.apply(this.pendingUpdates, newUpdates)
      console.log(`${debugTime()} scheduling ${this.pendingUpdates.length} pending update(s)`)
      let refresh = () => {
        if (this.pendingUpdates.length === 0) {
          clearInterval(this.updateIntervalToken)
          this.updateIntervalToken = null
          return false
        }
        this.displayNextUpdate()
        return true
      }
      if (this.updateIntervalToken === null) {
        console.log(`${debugTime()} first refresh of a new interval`)
        let shouldScheduleNextRefresh = refresh()
        if (shouldScheduleNextRefresh) {
          console.log(`${debugTime()} starting new interval`)
          this.updateIntervalToken = setInterval(refresh, 500)
        }
      }
    }
  }
}
</script>

<style scoped>
.card {
  transition: 0.7s;
  position:relative;
  transform-style: preserve-3d;
  display: inline-block;
  width: 30px;
  height: 48.331px;
}

.card .face {
  transform: rotateY( 180deg );
}

.card .side {
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.card.faceUp{
  transform: rotateY(180deg);
}

.level {
  perspective: 200px;
}
</style>
