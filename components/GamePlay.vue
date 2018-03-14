<template>
  <div>
      <button @click="callGameInfo()">현재 게임 상태 요청</button><br><br>
      <p>각 칸에 숫자를 입력해 주세요!</p>
      <form>
           <input v-model="numbers[0]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[1]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[2]" type="number" min="1" max="9" @keyup="removeChar($event)">
      </form>
      <button class="gameplay-submit-button" type="submit" @click="bindNumbers()">정답 제출</button>
      <br><br>
      <div class="gameplay-log">
        <div v-for="log in logs" :key="log.gameNumber">
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
            gameCount: 0,
            bestHistory: [{
                gameNumber: -1,
                numbers: [],
                gameResult: {
                    strikeCnt: -1,
                    ballCnt: -1
                },
                point: -1
            }]
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
                },
                point: strikeCnt*3 + ballCnt*1
            })
            this.getBestHistory();
        },
        getBestHistory() {
            for(let i in this.logs) {
                if(this.bestHistory[0].point < this.logs[i].point) {
                    this.bestHistory = []
                    this.bestHistory.push(this.logs[i])
                } else if(this.bestHistory[0].point == this.logs[i].point) {
                    // 최고기록이 중복으로 리스트에 담기는것 방지
                    var flag = true
                    for(let j in this.bestHistory) {
                        if(this.bestHistory[j].gameNumber == this.logs[i].gameNumber)
                            flag = false
                    }
                    if(flag)
                        this.bestHistory.push(this.logs[i])
                }
            }
            console.log(this.bestHistory.length)
        },
        callGameInfo() {
            let message = ""
            message = "최대 시도 가능 횟수 : " + this.$store.state.maxTryNumber + "\n현재까지 시도한 횟수 : " + this.gameCount + "\n\n현재 게임의 최고 기록\n"
            for(let i in this.bestHistory) {
                if(this.bestHistory[i].point > -1)
                    message = message.concat(this.bestHistory[i].gameNumber + "번째 시도, 제출 정답 : " + this.bestHistory[i].numbers[0] + ", " + this.bestHistory[i].numbers[1] + ", " + this.bestHistory[i].numbers[2] + "\n")
            }

            alert(message)
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
