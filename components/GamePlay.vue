<template>
  <div>
      <p>각 칸에 숫자를 입력해 주세요!</p>
      <form>
           <input v-model="numbers[0]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[1]" type="number" min="1" max="9" @keyup="removeChar($event)">
           <input v-model="numbers[2]" type="number" min="1" max="9" @keyup="removeChar($event)">
      </form>
      <button class="gameplay-submit-button" type="submit" @click="bindNumbers()">정답 제출</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            numbers: [],
            answer: {
                params: {
                  answer: ""
                }
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
                console.log("success")
            }).catch(error => {
                alert("error: " + error)
            })
        }
    }
}
</script>

<style>
.gameplay-submit-button {
    margin-top: 10px;
}
</style>
