import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import axios from 'axios';
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
            text:'Active Nodes'
        },
    },
    xAxis: {
        type: "category",
        labels: {
            style: {
                fontSize: "8",
                fontWeight: "300",
                color: "#b7b3b3",
            }
        },
    },
    series: [
        {
            data: [],
        },
    ],
};

class AverageSessionDurationTab extends Component {
    state = {
        data: [],
        loading: false,
        error: null
    };

    getActiveNode = async (timeframe) => {
        if(timeframe == null){
            timeframe = '24h'
        }
        this.setState({
          loading: true
        });

        axios
            .get(`${process.env.REACT_APP_BASE_URL_LIVE}/sessions/length?duration=${timeframe}`)
            .then(({ data }) => {
                console.log(data)
                let newData = [],
                    date = null,
                    formattedDate = null;

                for (let i = 0; i < data.length; i++) {
                    date = new Date(data[i].timestamp);
                    formattedDate =  date.toString().split(' ')[2] + " " +date.toString().split(' ')[1] + " " + + date.toString().split(' ')[3];
                    newData.push({
                        name: formattedDate,
                        x: i,
                        y: Math.round((~~(data[i].duration % 3600) / 60) * 100) / 100
                    });
                }
                options.series[0].data = newData;
                this.setState({ data: newData, loading: false});
            })
            .catch(err => {
                console.log(err);  
                this.setState({
                    error: err,
                    loading: false
                }); 
            })
        
        console.log(this.state.data)
    };
    componentDidMount() {
        this.getActiveNode();
    }
    render() {
        const { loading, data } = this.state;
        return (
            <div className="statschart-card"  id={this.props.id} ref={this.props.refrence}>
                <div className="statschart-card-inner">
                    <div className="stats-chart">
                        <div className="chart-head">
                            <h3>Average Session Duration</h3>
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button onClick={()=>{this.getActiveNode("24h")}} value="a">daily</Radio.Button>
                                <Radio.Button onClick={()=>{this.getActiveNode("168h")}} value="b">weekly</Radio.Button>
                                <Radio.Button onClick={()=>{this.getActiveNode("720h")}} value="c">monthly</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={data===null ? "chart-wrap no-date": "chart-wrap"}>
                            <Spin spinning={loading} />
                            {!data && 
                                <div className="no-date">No data available</div>
                            }
                            {(!loading && data) &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options}
                                />
                            }
                        </div>  
                    </div>
                    <div className="stats-count">
                        <div className="count-card">
                            <h4>56.12</h4>
                            <p>Lifetime Avg. Duration (min)</p>
                        </div>
                        <div className="count-card">
                            <h4>40.40</h4>
                            <p>24Hr. Avg. Duration (min)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AverageSessionDurationTab
