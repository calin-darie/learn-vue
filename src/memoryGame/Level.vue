<template>
  <div>
    test level {{level}}: {{levelData.numberOfPairs}}
    <img class="card" v-for="card of levelData.cards" :key="card.id" :src="card.faceUp?card.face:card.back" />
  </div>
</template>

<script>
import levelsService from './levelsService'
export default {
  name: 'level',
  props: ['level'],
  data () {
    return {
      levelData: { deck: { cards: [], numberOfPairs: 0 } }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 30px;
}
</style>
