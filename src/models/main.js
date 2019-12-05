import { message } from 'antd';
import services from '../services/services';
import { botName } from '../utils/config';

message.config({
    // message的全局配置，默认持续时间为2s
    duration: 2,
    maxCount: 2,
});

export default {
    namespace: 'main',
    state: {
        inputText: '',
        dialog: [{ num: 2, text: '下面是调查结果' }], // num1为问，num2为答
        botId: 0, // 机器人id为0就是未开启
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
        setBotId(state, { payload: botId }) {
            return { ...state, botId };
        },
        setAnswer(state, { payload }) {
            let { instructions, result } = payload;
            let newDialog = [...state.dialog];
            // 只有一句话
            if (instructions && instructions.length === 0) {
                newDialog.push({
                    num: 2,
                    text: result,
                });
            } else {
                let renderArr;
                instructions.forEach(item => {
                    if (item.type === 'highlights') {
                        renderArr = item.params.params;
                    }
                });
                console.log(renderArr);
                renderArr.forEach(item => {
                    newDialog.push({
                        num: 2,
                        text: item.sentence,
                        type: item.displaying,
                    });
                });
            }
            return { ...state, dialog: newDialog };
        },
    },
    effects: {
        *openSession({}, { call, put }) {
            const res = yield call(services.main['openSession'], { payload: botName });
            if (res.err) {
                message.error('开启对话失败，请重试');
            } else {
                let { id } = res.data.msg;
                yield put({ type: 'setBotId', payload: id });
            }
        },
        *ask({}, { call, put, select }) {
            const botId = yield select(state => state.main.botId);
            const inputText = yield select(state => state.main.inputText);
            yield put({ type: 'sendText', payload: inputText });
            const res = yield call(services.main['ask'], { botId, payload: inputText });
            if (res.err) {
                message.error('对话失败，请重试');
            } else {
                yield put({ type: 'setAnswer', payload: res.data.msg });
            }
        },
    },
    subscriptions: {},
};
