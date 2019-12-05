import React, { Component } from 'react';
import styles from './index.less';
import { Modal, Icon, Layout } from 'antd';
import { connect } from 'dva';

import XunfeiASR from './XunfeiASR'; // 讯飞语音

class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            result: '',
        };
        this.recorder = null;
        this.stream = null;
        this.asr = new XunfeiASR(
            '5cdbd843',
            '728831b24f929138e37e5fe57d405b68',
            'bb6c4d2ba4123fe5158aeb7a0e990f63',
        );
        this.bufferSize = 4096;
    }

    // 点击语音按钮
    onToggleClick = e => {
        console.log(e);
        if (!this.state.recording) {
            this.setState({ result: '' });
            this.getUserMedia();
        }
    };

    // 获取麦克风
    getUserMedia = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(this.onMediaSuccess)
            .catch(this.onMediaError);
    };

    // 获取媒体成功
    onMediaSuccess = stream => {
        this.stream = stream;
        this.asr.openConnection({
            onConnectionSuccess: this.onASRConnectionSuccess, // conn success
            onConnectionError: this.onASRConnectionError, // conn error
            onProgress: this.onProgress, // on result
            onComplete: this.onComplete,
        });
    };

    // 媒体发生问题
    onMediaError = e => {
        console.error('media error', e);
        this.close();
    };

    // 连接成功
    onASRConnectionSuccess = () => {
        const context = new AudioContext();
        const audioInput = context.createMediaStreamSource(this.stream);
        this.recorder = context.createScriptProcessor(this.bufferSize, 1, 1);
        this.recorder.onaudioprocess = this.asr.onAudioProcess;
        audioInput.connect(this.recorder);
        this.recorder.connect(context.destination);
        this.setState({ recording: true });
    };

    // 连接错误
    onASRConnectionError = e => {
        console.error('asr error', e);
        this.close();
    };

    // 识别中
    onProgress = result => {
        this.setState({ result });
    };

    // 识别结束
    onComplete = result => {
        this.asr.stop();
        if (this.state.recording && result) {
            // 对结果可以进行一些其他业务操作
            this.props.setText(result);
            // this.props.inputDom.focus();
        }
        this.close();
    };

    // 取消录音
    cancelRecording = () => {
        this.asr.stop();
        this.close();
    };

    // 关闭录音
    close = () => {
        if (this.recorder) {
            this.recorder.disconnect();
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        this.setState({ recording: false });
    };

    render() {
        return (
            <>
                <div className={styles.btn} onClick={this.onToggleClick}>
                    <Icon type="audio" />
                </div>
                <Modal
                    closable={false}
                    footer={null}
                    width={720}
                    centered
                    zIndex={99999}
                    visible={this.state.recording}
                    onCancel={this.cancelRecording}
                >
                    <Layout>
                        <Layout.Sider style={{ background: '#fff' }} width={120}>
                            <Icon
                                type="audio"
                                style={{
                                    fontSize: 96,
                                    color: '#1890ff',
                                    marginTop: 18,
                                    marginBottom: 18,
                                }}
                            />
                        </Layout.Sider>
                        <Layout.Content style={{ background: '#fff', fontSize: 48 }}>
                            {this.state.result || (
                                <span style={{ color: '#888' }}>想问什么，说来听听</span>
                            )}
                        </Layout.Content>
                    </Layout>
                </Modal>
            </>
        );
    }
}

let mapStateToProps = ({ main }) => {
    return { ...main };
};

let mapDispatchToProps = dispatch => {
    return {
        setText: value => {
            dispatch({
                type: 'main/setInputText',
                payload: value,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
