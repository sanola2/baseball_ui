<template>
  <div>
    {{ logData.gameNumber }}회차 : {{ logData.numbers[0] }}, {{ logData.numbers[1] }}, {{ logData.numbers[2] }} =>
    <span v-if="logData.gameResult.strikeCnt == 3" style="color: green;">
        " WIN "
    </span>
    <span v-else-if="logData.gameResult.strikeCnt == 0 && logData.gameResult.ballCnt == 0" style="color: red;">
        " OUT "
    </span>
    <span v-else>
        " {{logData.gameResult.strikeCnt}} Strike<span v-if="logData.gameResult.strikeCnt > 1">s</span>
         {{logData.gameResult.ballCnt}} ball<span v-if="logData.gameResult.ballCnt > 1">s</span> "
    </span>
  </div>
</template>

<script>
export default {
    props: ['logData']
}
</script>

<style>

</style>
