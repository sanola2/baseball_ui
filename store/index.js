import Vuex from 'vuex'

const store = () => new Vuex.Store({
    state: {
        gamePlayFlag: false,
        gameInformation: Object,
        maxTryNumber: Number,
        probNum: Number
    }
})

export default store