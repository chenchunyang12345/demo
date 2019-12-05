import { get, post, put, del, getDataAndTotal } from '../utils/request';

export default {
    main: {
        openSession: ({ payload }) => post('/sessions', { botName: payload }),
        ask: ({ botId, payload }) => post(`/session/${botId}`, { query: payload }),
    },
};
