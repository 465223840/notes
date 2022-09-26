import { reactive } from 'vue'
export default function (reducer, initialState) {
    const state = reactive(initialState)
    const dispatch = (type) => {

        return function (payload) {
            reducer(state, { type, payload })
        }
    }

    return [
        state, dispatch
    ]
}
