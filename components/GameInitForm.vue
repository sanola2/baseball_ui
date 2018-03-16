<template>
    <div>
        <form id="game_init" method="post" action="">
            <h5>이름을 적어주세요!</h5>
            <input type="text" placeholder="이름" v-model="form.playerName">
            <h5>최대 시도 횟수를 정해주세요!</h5>
            <input type="number" v-model.number="form.maxTryNumber">
            <h5>문제의 자리수를 정해주세요!</h5>
            <h6 style="color: red">(3 이상)</h6>
            <input type="number" v-model.number="form.probNum">
            <br>
        </form>
        <button @click="submit()">확인</button>
    </div>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'

export default {
    data() {
        return ({
            form: {
                playerName: "",
                maxTryNumber: 1,
                probNum: 3
            }
        })
    },
    methods: {
        submit() {
            axios.post(process.env.baseUrl + '/init/', querystring.stringify(this.form)).then(response => {
                if(response.data.errorCode == "200") {
                    this.$store.state.maxTryNumber = this.form.maxTryNumber
                    this.$store.state.probNum = this.form.probNum
                    this.$store.state.gamePlayFlag = true
                    this.$store.state.gameInformation = response
                } else {
                    alert("잘못된 요청입니다!")
                }
            }).catch(error => {
                alert("다시 한번 확인해 주십시오")
            })
        }
    }
}
</script>

<style>

</style>
