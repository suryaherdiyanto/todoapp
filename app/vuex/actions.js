import { request } from 'tns-core-modules/http';

export default {
    async login({ getters }, { email, password }) {
        return await request({
            url: getters.loginUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            content: JSON.stringify({ email: email, password: password })
        }, (error) => {
            console.error(error);
        });
    },

    async getTasks({ getters, state }) {
        return await request({
            url: `${getters.taskUrl}?user_id=${state.auth.user.id}`,
            headers: {
                'Authorization': `Bearer ${state.auth.token}`,
            }
        });
    },

    async getSubTasks({ getters, state }, taskId) {
        return await request({
            url: `${ getters.subtaskUrl(taskId) }`,
            headers: {
                'Authorization': `Bearer ${state.auth.token}`,
            }
        });
    },

    async createSubTask({ getters, state }, {taskId, taskName}) {
        return await request({
            url: `${ getters.subtaskUrl(taskId) }`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.auth.token}`,
                'Content-Type': 'application/json'
            },
            content: JSON.stringify({ name: taskName, task_id: taskId, is_completed: 0 }),
        });
    }
}