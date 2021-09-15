import React, { Component } from 'react';
import { Radio } from 'antd';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
    chart: {
        type: "area",
        backgroundColor: null,
        height: "420",
    },
    credits: {
        enabled: false,
    },
    title: {
        text: null,
    },
    tooltip: {
        formatter: function () {
            return this.y;
        },
        backgroundColor: '#00CE7D',
        borderColor: 'black',
        borderRadius: 0,
        borderWidth: 0
    },
    plotOptions: {
        area: {
            size: "100%",
            showInLegend: false,
            lineWidth: 1,
            lineColor: "#707070",
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, "#0765A5"],
                    [1, "#142D5104"],
                ],
            },
            marker: {
                enabled: false,
            },
        },
    },
    yAxis: {
        gridLineColor: "#2B5072",
        title: {
            enabled: false,
        },
    },
    xAxis: {
        categories: ["JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN'],
        lineColor: "transparent",
        labels: {
            style: {
                fontSize: "8",
                fontWeight: "300",
                color: "#696969",
            },
        },
    },
    series: [
        {
            data: [50, 80, 100, 200, 500, 400, 100, 200, 80, 500, 650, 700, 500, 400, 600],
        },
    ],
};


const optionsDataConsumed = {
    chart: {
        type: 'column',
        backgroundColor: null,
        height: 420,
    },
    credits: {
        enabled: false,
    },
    title: {
        text: null,
    },
    legend: {
        enabled: false,
    },
    tooltip: {
        formatter: function () {
            return this.y;
        },
        backgroundColor: '#00CE7D',
        borderColor: 'black',
        borderRadius: 0,
        borderWidth: 0
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            borderWidth: 0,
        },
    },
    yAxis: {
        gridLineColor: '#2B5072',
        title: {
            enabled: false,
        },
    },
    xAxis: {
        categories: ["JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN', "JAN", 'JAN', 'JAN'],
        lineColor: "transparent",
        labels: {
            style: {
                fontSize: "8",
                fontWeight: "300",
                color: "#696969",
            },
        },
    },
    series: [
        {
            name: '',
            data: [
                { x: 1, y: 4, color: '#165686' },
                { x: 2, y: 3, color: '#165686' },
                { x: 3, y: 8, color: '#165686' },
                { x: 4, y: 4, color: '#165686' },
                { x: 5, y: 6, color: '#165686' },
                { x: 6, y: 9, color: '#165686' },
                { x: 7, y: 7, color: '#165686' },
                { x: 8, y: 25, color: '#165686' },
                { x: 9, y: 20, color: '#165686' },
                { x: 10, y: 22, color: '#165686' },
                { x: 11, y: 10, color: '#165686' },
                { x: 12, y: 8, color: '#165686' },
                { x: 13, y: 21, color: '#165686' },
                { x: 14, y: 35, color: '#165686' },
                { x: 15, y: 44, color: '#165686' },
                { x: 16, y: 70, color: '#165686' },
                { x: 17, y: 60, color: '#165686' },
                { x: 18, y: 55, color: '#165686' },
                { x: 19, y: 20, color: '#165686' },
                { x: 20, y: 5, color: '#165686' },
                { x: 21, y: 23, color: '#165686' },
                { x: 22, y: 20, color: '#165686' },
                { x: 23, y: 70, color: '#165686' },
                { x: 24, y: 65, color: '#165686' },
                { x: 25, y: 55, color: '#165686' },
                { x: 26, y: 30, color: '#165686' },
                { x: 27, y: 15, color: '#165686' },
                { x: 28, y: 40, color: '#165686' },
                { x: 29, y: 55, color: '#165686' },
                { x: 30, y: 65, color: '#165686' },
            ],
        },
    ],
};

class AverageSessionDurationTab extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="statschart-card">
                    <div className="statschart-card-inner">
                        <div className="stats-chart">
                            <div className="chart-head">
                                <h3>ACTIVE NODES</h3>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">daily</Radio.Button>
                                    <Radio.Button value="b">weekly</Radio.Button>
                                    <Radio.Button value="c">monthly</Radio.Button>
                                </Radio.Group>
                            </div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                        <div className="stats-count">
                            <div className="count-card">
                                <h1>597</h1>
                                <p>Active Nodes Right Now</p>
                            </div>
                            <div className="count-card">
                                <h1>124</h1>
                                <p>Average Active Nodes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="statschart-card">
                    <div className="statschart-card-inner">
                        <div className="stats-chart">
                            <div className="chart-head">
                                <h3>sessions </h3>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">daily</Radio.Button>
                                    <Radio.Button value="b">weekly</Radio.Button>
                                    <Radio.Button value="c">monthly</Radio.Button>
                                </Radio.Group>
                            </div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                        <div className="stats-count">
                            <div className="count-card">
                                <h1>1811</h1>
                                <p>Active Sessions</p>
                            </div>
                            <div className="count-card">
                                <h1>10643</h1>
                                <p>Average Sessions</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="statschart-card">
                    <div className="statschart-card-inner">
                        <div className="stats-chart">
                            <div className="chart-head">
                                <h3>data consumed</h3>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">daily</Radio.Button>
                                    <Radio.Button value="b">weekly</Radio.Button>
                                    <Radio.Button value="c">monthly</Radio.Button>
                                </Radio.Group>
                            </div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={optionsDataConsumed} />
                        </div>
                        <div className="stats-count">
                            <div className="count-card">
                                <h1>5007</h1>
                                <p>Data (GB/24hr)</p>
                            </div>
                            <div className="count-card">
                                <h1>1273</h1>
                                <p>Total Data Consumed (TB)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="statschart-card">
                    <div className="statschart-card-inner">
                        <div className="stats-chart">
                            <div className="chart-head">
                                <h3>Average Session Duration</h3>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">daily</Radio.Button>
                                    <Radio.Button value="b">weekly</Radio.Button>
                                    <Radio.Button value="c">monthly</Radio.Button>
                                </Radio.Group>
                            </div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                        <div className="stats-count">
                            <div className="count-card">
                                <h1>56.12</h1>
                                <p>Lifetime Avg. Duration (min)</p>
                            </div>
                            <div className="count-card">
                                <h1>40.40</h1>
                                <p>24Hr. Avg. Duration (min)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AverageSessionDurationTab
