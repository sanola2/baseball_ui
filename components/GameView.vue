<template>
  <div>
      <p class="gameview-text">{{count}}번째 게임 시작합니다</p><br>
      <game-play/><br>
      <button>현재 게임 상태 요청</button>
  </div>
</template>

<script>
import GamePlay from '~/components/GamePlay.vue'

export default {
  components: {
    GamePlay
  },
  data: function() {
    return {
      count: this.$store.state.gameInformation.data.gameInfo.idx
    }
  }
}
</script>

<style>
.gameview-text {
  font-size: 30px;
  font-style: bold;
}
</style>
