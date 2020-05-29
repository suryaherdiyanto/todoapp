export default {

    processing(state) {
        state.isProcessing = true;
    },

    processed(state) {
        state.isProcessing = false;
    },

    loggedIn(state) {
        state.isAuth = true;
    },

    loggedOut(state) {
        state.isAuth = false;
    },

    setToken(state, token) {
        state.auth.token = token;
    },

    setUser(state, user) {
        state.auth.user = user;
    }

}