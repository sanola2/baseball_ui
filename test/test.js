const assert = require('assert')

//Mocha 를 이용한 자바스크립트 단위 테스팅
/*describe('정규식 테스트', function() {
    it('입력 값은 10', function() {
        assert.equal(false, removeChar(10))
    })
})

function removeChar(num) {
    const value = num
    const regex = /^[1-9]$/

    return regex.test(value)
}*/

describe('포문 테스트', function() {
    it('포문 다루기', function() {
        const logs = []

        for(let i=0; i< 11; i++) {
            logs.push({
                gameNumber: i,
                numbers: [i, i, i],
                gameResult: {
                    strikeCnt: i,
                    ballCnt: i
                },
                point: (i+10)*3 + (i+20)*1
            })
        }

        let temp = []
        temp.push(logs[0])

        for(let i in logs) {
            if(temp[0].point < logs[i].point) {
                temp = []
                temp.push(logs[i])
            } else if(temp[0].point == logs[i].point) {
                temp.push(logs[i])
            }
        }

        console.log(temp)
    })
})