export default {

    loginUrl: (state) => {
        return `${state.serviceURL}${state.url.login}`
    },

    taskUrl: (state) => {
        return `${state.serviceURL}${state.url.task.index}`
    }

}