import React, { Component } from 'react';
import styles from './index.less';

class Ask extends Component {
    render() {
        let { text } = this.props;
        return (
            <div className={styles.wrap}>
                <div className={styles.content}>{text}</div>
            </div>
        );
    }
}

export default Ask;
