import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Input, Button } from 'antd';

import { Ask, Answer, Recorder } from '../components/main';

class Page extends Component {
    componentDidMount() {
        let { openSession } = this.props;
        openSession();
    }

    // 渲染对话流
    renderDialog = () => {
        let { dialog } = this.props;
        return dialog.map((item, idx) => {
            let { num, text, type } = item;
            switch (num) {
                case 1:
                    return <Ask text={text} key={idx} />;
                case 2:
                    return <Answer text={text} type={type} key={idx} />;
                default:
                    return null;
            }
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.dialog.length !== this.props.dialog.length) {
            // 如果对话内容更新了
            console.log(this.el);
            this.el.scrollTo(9999);
        }
    }

    render() {
        let { inputText, changInputText, ask } = this.props;
        return (
            <div className={styles.wrap}>
                <header>
                    <h1>对话展示</h1>
                </header>
                <main ref={el => (this.el = el)}>{this.renderDialog()}</main>
                <footer>
                    <div className={styles.audio}>
                        <Recorder />
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
                            onPressEnter={ask}
                        />
                    </div>
                    <div className={styles.send}>
                        <Button onClick={ask}>发送</Button>
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
        ask: () => {
            dispatch({
                type: 'main/ask',
            });
        },
        openSession: () => {
            dispatch({
                type: 'main/openSession',
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
