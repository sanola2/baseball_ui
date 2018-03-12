const assert = require('assert')

function removeChar(num) {
    const value = num
    const regex = /^[1-9]$/   // 1~9 까지의 숫자 정규식

    return regex.test(value)
}

//Mocha 를 이용한 자바스크립트 단위 테스팅
describe('정규식 테스트', function() {
    it('입력 값은 10', function() {
        assert.equal(false, removeChar(10))
    })
})