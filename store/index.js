import Vuex from 'vuex'

const store = () => new Vuex.Store({
    state: {
        gamePlayFlag: false,
        gameInformation: Object
    }
})

export default store