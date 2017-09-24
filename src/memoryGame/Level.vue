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
import levelsService from './levelsService'
export default {
  name: 'level',
  props: ['level'],
  data () {
    return {
      levelData: { cards: [] }
    }
  },
  watch: {
    level: {
      immediate: true,
      handler (newLevel) {
        levelsService.startLevel(this.level).then(levelData => {
          this.levelData = levelData
        })
      }
    }
  },
  methods: {
    flipCard (id) {
      levelsService.flipCard(id).then(levelData => {
        this.levelData = levelData
      })
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
