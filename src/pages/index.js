import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Input, Button } from 'antd';

import { Ask, Answer } from '../components/main';

class Page extends Component {
    // 渲染对话流
    renderDialog = () => {
        let { dialog } = this.props;
        return dialog.map((item, idx) => {
            let { num, text } = item;
            switch (num) {
                case 1:
                    return <Ask text={text} key={idx} />;
                case 2:
                    return <Answer text={text} key={idx} />;
                default:
                    return null;
            }
        });
    };

    render() {
        let { inputText, changInputText, sendText } = this.props;
        return (
            <div className={styles.wrap}>
                <header>
                    <h1>对话展示</h1>
                </header>
                <main>{this.renderDialog()}</main>
                <footer>
                    <div className={styles.audio}>
                        <Button icon="audio">按住说话</Button>
                    </div>
                    <div className={styles.inputArea}>
                        <Input
                            autoFocus
                            placeholder="请输入问题"
                            allowClear={true}
                            value={inputText}
                            onChange={e => {
                                changInputText(e.target.value);
                            }}
                            onPressEnter={sendText}
                        />
                    </div>
                    <div className={styles.send}>
                        <Button onClick={sendText}>发送</Button>
                    </div>
                </footer>
            </div>
        );
    }
}

let mapStateToProps = ({ main }) => {
    return { ...main };
};

let mapDispatchToProps = dispatch => {
    return {
        changInputText: value => {
            dispatch({
                type: 'main/setInputText',
                payload: value,
            });
        },
        sendText: payload => {
            dispatch({
                type: 'main/sendText',
                payload: payload,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
