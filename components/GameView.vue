<template>
  <div>
      {{count}}번째 게임 시작합니다<br>
      <button>현재 게임 상태 요청</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count: this.$store.state.gameInformation.data.idx
    }
  }
}
</script>

<style>

</style>
