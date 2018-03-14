<template>
  <div>
      <p>각 칸에 숫자를 입력해 주세요!</p>
      <form>
           <input v-model="numbers[0]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[1]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[2]" type="number" min="1" max="9" @keyup="removeChar($event)">
      </form>
      <button class="gameplay-submit-button" type="submit" @click="bindNumbers()">정답 제출</button>
      <br><br>
      <div class="gameplay-log">
        <div v-for="log in logs" :key="log">
            <game-log :log-data=log />
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import GameLog from '~/components/GameLog.vue'

export default {
    data: function() {
        return {
            numbers: [],
            answer: {
                params: {
                  gameIdx: this.$store.state.gameInformation.data.gameInfo.idx,
                  answer: ""
                }
            },
            logs: [],
            gameCount: 0
        }
    },
    methods: {
        //숫자 입력이 2자리 넘어가면 한자리만 남기고 숫자 삭제
        removeChar(event) {
            const value = event.srcElement.value
            const regex = /^[1-9]$/   // 1~9 까지의 숫자 정규식
            console.log(regex.test(value))
            if(!regex.test(value)) {
                event.srcElement.value = event.srcElement.value.substring(0, event.srcElement.value.length -2)
                event.srcElement.focus()
            }
        },
        bindNumbers() {
            this.answer.params.answer = this.numbers[0] + this.numbers[1] + this.numbers[2]

            if(this.answer.params.answer.length != 3) {
                alert("각 숫자는 1~9까지 한자리의 숫자만 넣어 주십시오.")
                this.numbers = []
            } else {
                this.submitAnswer()
            }
        },
        submitAnswer() {
            axios.get(process.env.baseUrl + '/answer/', this.answer).then(response => {
                if(response.data.errorCode == 200) {
                    this.gameCount++
                    this.addDataToLogs(response.data.strikeCnt, response.data.ballCnt);
                }
                //to-do answer 컨트롤러에서 반환한걸로 판단해서 카운트 하나 늘리고 게임결과값 추가해서 addDataToLogs 에 넣어준다.
                
            }).catch(error => {
                alert("error: " + error)
            })
        },
        addDataToLogs(strikeCnt, ballCnt) {
            this.logs.push({
                gameNumber: this.gameCount,
                numbers: [this.numbers[0], this.numbers[1], this.numbers[2]],
                gameResult: {
                    strikeCnt: strikeCnt,
                    ballCnt: ballCnt
                }
            })
        }
    },
    components: {
        GameLog
    }
}
</script>

<style>
.gameplay-submit-button {
    margin-top: 10px;
}
</style>
