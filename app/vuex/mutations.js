export default {

    processing(state) {
        state.isProcessing = true;
    },

    processed(state) {
        state.isProcessing = false;
    }

}