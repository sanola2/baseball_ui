<template>
  <div class="container">
    <h1 class="title">Baseball Game</h1><br>
    <div v-if="!$store.state.gamePlayFlag">
      <game-init-form/><br>
    </div>
    <div v-if='$store.state.gamePlayFlag'>
      <game-view/>
    </div>
    <button @click="bb">버튼</button>
  </div>
</template>

<script>
import GameInitForm from '~/components/GameInitForm.vue'
import GameView from '~/components/GameView.vue'

export default {
  components: {
    GameInitForm, GameView
  },
  methods: {
    bb() {
      regex = /[0-9]/;
      console.log(regex.test("1"))
    }
  }
}
</script>

<style>
.container {
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
