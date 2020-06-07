export default {

    loginUrl: (state) => {
        return `${state.serviceURL}${state.url.login}`;
    },

    taskUrl: (state) => {
        return `${state.serviceURL}${state.url.task.index}`;
    },

    subtaskUrl: (state) => (id) => {
        return `${state.serviceURL}${state.url.task.index}/${id}${state.url.task.subtasks}`;
    }

}