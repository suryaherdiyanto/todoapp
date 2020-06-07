export default {
    isAuth: false,
    auth: {
        user: {},
        token: ''
    },
    url: {
        login: '/user/auth',
        task: {
            index: '/tasks',
            subtasks: '/subtasks'
        }
    },
    isProcessing: false,
    serviceURL: 'http://todoservice.kodinggen.com/api'
}