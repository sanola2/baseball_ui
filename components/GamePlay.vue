<template>
  <div>
      <p>각 칸에 숫자를 입력해 주세요!</p>
      <form>
           <input type="number" min="1" max="9" @keyup="removeChar($event)">
           <input type="number" min="1" max="9" @keyup="removeChar($event)">
           <input type="number" min="1" max="9" @keyup="removeChar($event)">
      </form>
      <button type="submit" >정답 제출</button>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            answer: {
                params: {
                  answer: Number
                }
            }
        }
    },
    methods: {
        removeChar(event) {
            const value = event.srcElement.value
            const regex = /^[1-9]$/   // 1~9 까지의 숫자 정규식
            console.log(regex.test(value))
            if(!regex.test(value)) {
                event.srcElement.value = event.srcElement.value.substring(0, event.srcElement.value.length -1)
                event.srcElement.focus()
            }
        },
        submitAnswer() {
            axios.get(process.env.baseUrl + '/test/', this.answer).then(response => {
                console.log("success")
            }).catch(error => {
                alert("error: " + error)
            })
        }
    }
}
</script>

<style>

</style>
