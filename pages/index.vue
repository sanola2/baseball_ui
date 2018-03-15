<template>
  <div class="container">
    <h1 class="title">Baseball Game</h1><br>
    <div v-if="!$store.state.gamePlayFlag">
      <game-init-form/><br>
      <button @click="callAllHistory()">게임 별 최고기록</button>
      <div v-if="bestHistoryFlag">
        <h2 style="color: green">- 최고 기록 -</h2>
        <div v-for="data in bestHistory" :key="data.idx">
          <h3>{{setFormattedDate(data.date)}} 총 {{data.triedNumber}}번 시도 {{data.playerName}}</h3>
        </div>
      </div>
    </div>
    <div v-if='$store.state.gamePlayFlag'>
      <game-view/>
    </div><br>
    

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import GameInitForm from '~/components/GameInitForm.vue'
import GameView from '~/components/GameView.vue'

export default {
  components: {
    GameInitForm, GameView
  },
  data: function() {
    return {
      bestHistory: [],
      bestHistoryFlag: false
    }
  },
  methods: {
    callAllHistory() {
      axios.get(process.env.baseUrl + "/history").then(response => {
        this.bestHistory = response.data
        this.bestHistoryFlag = true
      }).catch(error => {
        alert("승리한 게임이 없습니다..!")
      })
    },
    setFormattedDate(date) {
      let resultDate = new Date(date)
      return moment(resultDate).format('YYYY-MM-DD hh:mm:ss')
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
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
