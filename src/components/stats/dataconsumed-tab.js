import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import axios from 'axios';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



const options = {
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
        // formatter: function () {
        //     return this.y;
        // },
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
            data: null,
        }
    ],
};

class DataConsumedTab extends Component {
    state = {
        chartData: [],
        loading: false,
        totalConsumed:null,
    };
    formatBytes=(bytes, decimals = 2)=>{
        // if (bytes === 0) return '0 Bytes';
        if (bytes === 0) return 0;
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    }

    formatBytesString=(bytes, decimals = 2)=> {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    getActiveNode = async (timeframe) => {
        if(timeframe == null){
            timeframe = '24h'
        }
        this.setState({
          loading: true
        });
        axios
            .get(`${process.env.REACT_APP_BASE_URL_LIVE}/sessions/${timeframe}`)
            .then(({ data }) => {
                console.log(data)
                let newData = [];
                    newData.push(
                        {
                            name: 'Upload',
                            y: this.formatBytes(data.upload)
                        },
                        {
                            name: 'Download',
                            y: this.formatBytes(data.download)
                        }
                    );
                options.series[0].data = newData;
                options.tooltip.formatter = function () {
                    return this.y + ' GB';
                };

                this.setState({ chartData: newData, loading: false, totalConsumed:this.formatBytes(data.upload+data.download)});
            })
            .catch(err => {
                console.log(err);   
                this.setState({
                    chartData: null,
                    loading: false
                });
            })
        
        console.log(this.state.chartData)
    };
    componentDidMount() {
        // this.getActiveNode();
    }
    render() {
        const { loading, chartData } = this.state;
        return (
            <div className="statschart-card" id={this.props.id} ref={this.props.refrence}>
                <div className="statschart-card-inner">
                    <div className="stats-chart">
                        <div className="chart-head">
                            <h3>data consumed</h3>
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button onClick={()=>{this.getActiveNode("24h")}} value="a">daily</Radio.Button>
                                <Radio.Button onClick={()=>{this.getActiveNode("168h")}} value="b">weekly</Radio.Button>
                                <Radio.Button onClick={()=>{this.getActiveNode("720h")}} value="c">monthly</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={chartData===null ? "chart-wrap no-date": "chart-wrap"}>
                            <Spin spinning={loading} />
                            {!chartData && 
                                <div className="no-date">No data available</div>
                            }
                            {(!loading && chartData) &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options}
                                />
                            }
                        </div>
                    </div>
                    <div className="stats-count">
                        <div className="count-card">
                            <h4>{this.state.totalConsumed}</h4>
                            <p>Data (GB/24hr)</p>
                        </div>
                        <div className="count-card">
                            <h4>{this.state.totalConsumed}</h4>
                            <p>Total Data Consumed (GB)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataConsumedTab
