import React, { Component } from 'react';
import styles from './index.less';
import echarts from 'echarts';

import echartConfig from './echartConfig';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.id = new Date().getTime();
        this.echartDom = null;
    }

    componentDidMount() {
        let { type } = this.props;
        type && this.renderChart(type);
    }

    renderChart(type) {
        switch (type) {
            case '报表':
                this.echartDom = document.getElementById(this.id);
                let myChartOne = echarts.init(this.echartDom);
                myChartOne.setOption(echartConfig.BAR);
                break;
            case '饼图':
                this.echartDom = document.getElementById(this.id);
                let myChartTwo = echarts.init(this.echartDom);
                myChartTwo.setOption(echartConfig.PIE);
                break;
            default:
                return null;
        }
    }

    render() {
        let { text, type } = this.props;
        return (
            <div className={styles.wrap}>
                <img src={require('../../../assets/robot_1227356_easyicon.net.svg')} alt="" />
                <div className={styles.content}>
                    {text}
                    {type ? (
                        <div id={this.id} style={{ width: '500px', height: '200px' }}></div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Answer;
