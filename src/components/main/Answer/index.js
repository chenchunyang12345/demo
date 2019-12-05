import React, { Component } from 'react';
import styles from './index.less';
import echarts from 'echarts';

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
            case 'PIE':
                this.echartDom = document.getElementById(this.id);
                let myChart = echarts.init(this.echartDom);
                myChart.setOption({
                    title: {
                        text: 'ECharts 入门示例',
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            data: [5, 20, 36, 10, 10, 20],
                        },
                    ],
                });
                break;
            default:
                return null;
        }
    }

    render() {
        let { text } = this.props;
        return (
            <div className={styles.wrap}>
                <img src={require('../../../assets/robot_1227356_easyicon.net.svg')} alt="" />
                <div className={styles.content}>
                    {text}
                    <div id={this.id} style={{ width: '500px', height: '300px' }}></div>
                </div>
            </div>
        );
    }
}

export default Answer;
