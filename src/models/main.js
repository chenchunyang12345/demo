export default {
    namespace: 'main',
    state: {
        inputText: '',
        dialog: [], // num1为问，num2为答
    },
    reducers: {
        setInputText(state, { payload: inputText }) {
            return { ...state, inputText };
        },
        sendText(state) {
            let newDialog = [...state.dialog];
            let text = state.inputText;
            newDialog.push({
                num: 1,
                text,
            });
            return { ...state, dialog: newDialog, inputText: '' };
        },
    },
    effects: {},
    subscriptions: {},
};
