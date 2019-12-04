import React, { Component } from 'react';
import styles from './index.less';

class Answer extends Component {
    render() {
        let { text } = this.props;
        return (
            <div className={styles.wrap}>
                <div className={styles.content}>{text}</div>
            </div>
        );
    }
}

export default Answer;
