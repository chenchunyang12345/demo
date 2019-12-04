import { message } from 'antd';

const global = window.global;

message.config({
    // message的全局配置，默认持续时间为2s
    duration: 2,
    maxCount: 2,
});

export default {
    API_URL_BASE: global.API_URL_BASE,
};
