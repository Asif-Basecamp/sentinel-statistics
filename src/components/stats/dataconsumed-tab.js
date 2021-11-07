import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { extendMoment } from 'moment-range';
import { SvgIcon } from '../common';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Moment = require('moment');
const moment = extendMoment(Moment);

let kb = 1024,
    mb = 1024*kb,
    gb = 1024*mb,
    tb = 1024*gb;
let options = {
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
        series: {
            stacking: 'normal',
            borderWidth: 0,
        },
    },
    yAxis: {
        gridLineColor: "#fff",
        title: {
            enabled: false,
            text:'Data Consumed',
        },
        labels: {
            style: {
                fontSize: "10px",
                fontWeight: "300",
                color: "#b7b3b3",
            },
            formatter: function () {
                var maxElement = this.axis.max;
                if (maxElement > tb) {
                    return (this.value / tb).toFixed(2) + " TB";
                } else if (maxElement > gb) {
                    return (this.value / gb).toFixed(2) + " GB";
                } else if (maxElement > mb) {
                    return (this.value / mb).toFixed(0) + " MB";
                } else if (maxElement > kb) {
                    return (this.value / kb).toFixed(0) + " KB";
                } else {
                    return (this.value) + " B";
                }
            },
        },
    },
    xAxis: {
        type: "category",
        lineColor: "transparent",
        labels: {
            style: {
                fontSize: "10px",
                fontWeight: "300",
                color: "#b7b3b3",
            }
        },
    },
    series: [
        {
            showInLegend: false,   
            data: null,
        }
    ],
    
};
class DataConsumedTab extends Component {
    state = {
        data: [],
        dataConsumed:null,
        totalDataConsumed:null,
        chartType:"area",
        loading: true,
    };
    arryaTotal = (accumulator, a)=>{
        return accumulator + a;
    }
    sum=( obj )=> {
        let sum = 0;
        for( var el in obj ) {
            if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
            }
        }
        return sum;
    }
    ordinal_suffix_of = (i)=> {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }

    formatBytes = (bytes, decimals = 0, showSize = true)=>{
        if (bytes === 0){
            return '0 Bytes'
        };
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        if(showSize){
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }else{
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        }
        
    }
    getDataConsumption = () =>{
        let preData = this.props.data.count,
            avarageNode = null;

        avarageNode =(this.sum(preData)/ Object.keys(preData).length).toFixed(0);
        this.setState({ dataConsumed: this.formatBytes(avarageNode, 2, false)});
    }

    getTotalConsumedData = () =>{
        let preData = this.props.data.count,
            avarageNode = null;

        avarageNode =this.sum(preData);

        this.setState({ totalDataConsumed:this.formatBytes(avarageNode, 2, false) });
    }

    getDailyConsumption = () => {
        this.setState({
            loading: true
        })
        let newData = [],
            preData = this.props.data.count,
            date = null,
            formattedDate = null,
            nodeData = Object.keys(preData).map(function(key) {
                return preData[key];
            });

        for (let i = 0; i < Object.keys(preData).length; i++) {
            
            date = new Date(Object.keys(preData)[i]);
            formattedDate =  moment(date).format('Do MMM YY');
            newData.push({
                name: formattedDate,
                x: i,
                y: nodeData[i],
                color: '#165686'
            });
        }
        let that = this;
        options.series[0].data = newData;
        options.tooltip.formatter = function () {
            return 'Date: '+ this.key + '<br /> Data Consumed: '+ that.formatBytes(this.y);
        };
        this.setState({ data: newData}, ()=>{
            this.setState({
                loading: false
            })
        });
    };

    getWeeklyDataConsumption = () =>{
        this.setState({loading: true});

        let preData = this.props.data.count,
            newData=[],
            monthData=[],
            nodeData = Object.keys(preData).map(function(key) {
                return preData[key];
            });
        
        for (let i = 0; i < Object.keys(preData).length; i++) {
            monthData.push({    
                date: Object.keys(preData)[i],
                data:nodeData[i],
                color: '#165686'
            });
        }

        const groupsByWeek = monthData.reduce((acc, date) => {
            // create a composed key: 'year-week' 
            const yearWeek = `${moment(date.date).year()}-${moment(date.date).week()}`;
            // add this key as a property to the result object
            if (!acc[yearWeek]) {
                acc[yearWeek] = [];
            }
            // push the current date that belongs to the year-week calculated befor
            acc[yearWeek].push(date);
            
            return acc;
        
        }, {});

        let weekArray = Object.values(groupsByWeek);

        for (let i= 0; i< weekArray.length; i++ ){
            var data = weekArray[i].reduce(function(prev, cur) {
                return prev + cur.data;
                }, 0);
            var weekValue = Object.keys(groupsByWeek)[i].split('-');
            newData.push({
                name: this.ordinal_suffix_of(weekValue[1])+ ' week ' + weekValue[0],
                x: i,
                y: data,
                color: '#165686'
            });
        }
        let that = this;
        options.series[0].data = newData;
        options.tooltip.formatter = function () {
            return this.key + '<br /> Data Consumed: ' + that.formatBytes(this.y, 2);
        };
        this.setState({ data: newData}, ()=>{
            this.setState({
                loading: false
            })
        });
    }
    
    getMonthlyDataConsumption = () =>{
        this.setState({loading: true});

        let preData = this.props.data.count,
            date = null,
            formattedDate = null,
            newData=[],
            monthData=[],
            nodeData = Object.keys(preData).map(function(key) {
                return preData[key];
            });
        
        for (let i = 0; i < Object.keys(preData).length; i++) {
            date = new Date(Object.keys(preData)[i]);
            formattedDate =  moment(date).format('Do MMM YY');
            monthData.push({
                date: formattedDate,
                data:nodeData[i]
            });
        }

        // 2: Define models
        const DateEntry = ({ date, data }) => ({
            date: moment(date, "Do MMM YY"),
            data: data
        });

        const EntryRange = ( dateEntries ) => {
            const dates = dateEntries.map(d => d.date);
            const data = dateEntries.map(d => d.data).reduce(this.arryaTotal, 0);
            const from = moment.min(dates);
            const to = moment.max(dates);
            return {
                dates,
                data,
                from,
                to
            }
        };
        
        EntryRange.sorter = (r1, r2) => r1.from.isBefore(r2.from) ? -1 : 1;
        // Utils
        const groupBy=(getKey, items)=>{
            return items.reduce(
            (groups, item) => {
                const k = getKey(item);
                if (!groups[k]) groups[k] = [ item ];
                else groups[k].push(item);
                return groups;
            }, {});
        }
        // 3. Convert data to easy-to-work-with formats
        const entries = monthData.map(DateEntry);
        const entriesByMonth = groupBy(
            ({ date }) => date.format("MM.YYYY"),
            entries
        );
        // Sorted list of EntryRanges
        const entryGroups = Object
            .values(entriesByMonth)
            .map(EntryRange)
            .sort(EntryRange.sorter);
        
        let finalData = entryGroups
            .map(({ to, data }) => ({
                date: to.format("MMMM YYYY"),
                data: data,
            }))
        for (let i = 0; i < finalData.length; i++) {
            newData.push({
                name: finalData[i].date,
                x: i,
                y: finalData[i].data,
                color: '#165686'
            });
        }
        let that = this;
        options.series[0].data = newData;
        options.tooltip.formatter = function () {
            return this.key + '<br /> Data Consumed: ' + that.formatBytes(this.y, 2);
        };
        this.setState({ data: finalData}, ()=>{
            this.setState({
                loading: false
            })
        });
    }

    chartViewToggle = (view) =>{
        
        this.setState({
            loading: true,
            chartType:view,
        });
        options.chart.type = view;
        setTimeout(function(){
            this.setState({loading: false});
            }.bind(this),10
        );
    }

    componentDidMount() {
        this.getDailyConsumption();
        this.getDataConsumption();
        this.getTotalConsumedData();
    }
    render() {
        const { loading, data, dataConsumed, totalDataConsumed, chartType } = this.state;
        
        return (
            <div className="statschart-card" id={this.props.id} ref={this.props.refrence}>
                <div className="statschart-card-inner">
                    <div className="stats-chart">
                        <div className="chart-head">
                            <h3>data consumed</h3>
                            <Radio.Group defaultValue="daily" buttonStyle="solid">
                                <Radio.Button onClick={this.getDailyConsumption} value="daily">daily</Radio.Button>
                                <Radio.Button onClick={this.getWeeklyDataConsumption} value="weekly">weekly</Radio.Button>
                                <Radio.Button onClick={this.getMonthlyDataConsumption} value="monthly">monthly</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={data===null ? "chart-wrap no-date": "chart-wrap"}>
                            <Spin spinning={loading} />
                            {(!data && loading) &&
                                <div className="no-date">No data available</div>
                            }
                            {(!loading && data) &&
                                <>
                                    <Radio.Group defaultValue={chartType} className="ml-auto" buttonStyle="solid" size="small">
                                        <Radio.Button onClick={()=>{this.chartViewToggle("area")}} value="area"><SvgIcon fill="#fff" name="line-chart" viewbox="0 0 512 512" /></Radio.Button>
                                        <Radio.Button onClick={()=>{this.chartViewToggle("column")}} value="column"><SvgIcon fill="#fff" name="bar-chart" viewbox="0 0 24 24" /></Radio.Button>
                                    </Radio.Group>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                    />
                                </>
                            }
                        </div>  
                    </div>
                    <div className="stats-count">
                        <div className="count-card">
                            <h4>{dataConsumed}</h4>
                            <p>AVERAGE DATA CONSUMED (GB/24HR)</p>
                        </div>
                        <div className="count-card">
                            <h4>{totalDataConsumed}</h4>
                            <p>TOTAL DATA CONSUMED (TB)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataConsumedTab
