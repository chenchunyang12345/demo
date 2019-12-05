import { message } from 'antd';

message.config({
    // message的全局配置，默认持续时间为2s
    duration: 2,
    maxCount: 2,
});

export default {
    namespace: 'main',
    state: {
        inputText: '',
        dialog: [{ num: 2, text: '下面是调查结果', type: 'PIE' }], // num1为问，num2为答
    },
    reducers: {
        setInputText(state, { payload: inputText }) {
            return { ...state, inputText };
        },
        sendText(state) {
            let newDialog = [...state.dialog];
            let text = state.inputText;
            if (/^\s*$/.test(text)) {
                // 输入为空
                message.warn('不能发送空内容');
                return { ...state, inputText: '' };
            }
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
