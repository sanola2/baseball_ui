<template>
  <div>
      <button @click="callGameInfo()">현재 게임 상태 요청</button><br><br>
      <p>각 칸에 숫자를 입력해 주세요!</p>
      <form class="gameplay-input" v-for="i in $store.state.probNum" :key="i">
          <!--엔터를 통한 자동 이동을 막기 위함-->
            <div style="display: none" >
                <input type="submit" onclick="return false;"/>
                <input type="text"/>
            </div>
            <input v-model="numbers[i]" type="number" min="1" max="9" @keyup="removeChar($event)">
      </form><br>
      <button class="gameplay-submit-button" type="submit" @click="bindNumbers()" :disabled="submitDisabled">정답 제출</button>
      <br><br>
      <div class="gameplay-log">
        <div v-for="log in logs" :key="log.gameNumber">
            <game-log :log-data=log />
        </div>
      </div>
      <div v-if="!isGamePlaying">
          <h3 style="margin-top: 13px; color: red;">게임이 종료 되었습니다!!</h3>
          <button @click="quitGame()">게임 종료</button>
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
                  probNum: this.$store.state.probNum,
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
            }],
            submitDisabled: false,
            isGamePlaying: true
        }
    },
    watch: {
        gameCount: function() {
            if(this.gameCount >= this.$store.state.maxTryNumber) {
                this.quitGamePlay()
            }
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
            let checkZero = false
            this.answer.params.answer.replace(this.numbers[0])
            for(let i=1; i< this.numbers.length; i++) {
                if(this.numbers[i] <= 0) {
                    checkZero = true
                }
                this.answer.params.answer += this.numbers[i]
            }
            if(this.answer.params.answer.length != this.$store.state.probNum || checkZero) {
                alert("각 숫자는 1~9까지 한자리의 숫자만 넣어 주십시오.")
                this.numbers = []
                this.answer = { //answer 값을 초기화
                        params: {
                            gameIdx: this.$store.state.gameInformation.data.gameInfo.idx,
                            probNum: this.$store.state.probNum,
                            answer: ""
                        }
                    }
            } else {
                this.submitAnswer()
            }
        },
        submitAnswer() {
            axios.get(process.env.baseUrl + '/answer/', this.answer).then(response => {
                if(response.data.errorCode == 200) {
                    this.answer = { //answer 값을 초기화
                        params: {
                            gameIdx: this.$store.state.gameInformation.data.gameInfo.idx,
                            probNum: this.$store.state.probNum,
                            answer: ""
                        }
                    }
                    this.gameCount++
                    if(response.data.strikeCnt == this.$store.state.probNum) { //모두 스트라이크로 정답을 맞추면 종료
                        this.quitGamePlay()
                    }
                    this.addDataToLogs(response.data.strikeCnt, response.data.ballCnt);
                }
            }).catch(error => {
                alert("error: " + error)
            })
        },
        addDataToLogs(strikeCnt, ballCnt) {
            this.logs.push({
                gameNumber: this.gameCount,
                numbers: this.numbers,
                gameResult: {
                    strikeCnt: strikeCnt,
                    ballCnt: ballCnt
                },
                point: strikeCnt*3 + ballCnt*1
            })
            //numbers를 초기화 해준다
            this.numbers = []
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
        },
        callGameInfo() {
            console.log(this.bestHistory[0].numbers)
            let message = ""
            message = "최대 시도 가능 횟수 : " + this.$store.state.maxTryNumber + "\n현재까지 시도한 횟수 : " + this.gameCount + "\n\n현재 게임의 최고 기록\n"
            for(let i in this.bestHistory) {
                if(this.bestHistory[i].point > -1)
                    message = message.concat(this.bestHistory[i].gameNumber + "번째 시도, 제출 정답 : " )
                    for(let n of this.bestHistory[i].numbers) {
                        if(!n) //undefined 면 건너뜀.. 왜 첫 인덱스에 undefined 가 될까??
                            continue

                        message = message.concat(n + " ")
                    }
                    message = message.concat("\n")
            }

            alert(message)
        },
        quitGamePlay() {
            this.submitDisabled = true
            this.isGamePlaying = false
        },
        quitGame() {
            this.$store.state.gamePlayFlag = false
        }
    },
    components: {
        GameLog
    }
}
</script>

<style>
.gameplay-input {
    display: inline;
}
.gameplay-submit-button {
    margin-top: 10px;
}
</style>
