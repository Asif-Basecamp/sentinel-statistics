import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { extendMoment } from 'moment-range';
import { SvgIcon } from '../common';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Moment = require('moment');
const moment = extendMoment(Moment);

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
                fontSize: "10",
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
class ActiveNodesTab extends Component {
    state = {
        data: [],
        activeNode:null,
        averageNode:null,
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
    getActiveNode = () =>{
        let preData = this.props.data.count,
            nodeData = null;

        nodeData = Object.keys(preData).map(function(key) {
            return preData[key];
        });

        this.setState({ activeNode:nodeData[Object.keys(preData).length - 1] });
    }

    getAvarageNode = () =>{
        let preData = this.props.data.count,
            avarageNode = null;

        avarageNode =(this.sum(preData)/ Object.keys(preData).length).toFixed(0);

        this.setState({ averageNode:avarageNode });
    }

    getDailyNode = () => {
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
                y: nodeData[i]
            });
        }
        options.series[0].data = newData;
        options.tooltip.formatter = function () {
            return 'Data: '+ this.key + '<br /> Active Nodes: '+ this.y;
        };
        this.setState({ data: newData}, ()=>{
            this.setState({
                loading: false
            })
        });
    };

    getWeeklyNode = () =>{
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
            monthData.push({    
                date: Object.keys(preData)[i],
                data:nodeData[i]
            });
        }

        const groupsByWeek = monthData.reduce((acc, date) => {
            // create a composed key: 'year-week' 
            // const yearWeek = `${moment(date.date).isoWeek()}`;
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
                y: data
            });
        }
        console.log(weekArray)
        console.log(newData)
        // for (let i = 0; i < finalData.length; i++) {
        
        //     newData.push({
        //         name: finalData[i].date,
        //         x: i,
        //         y: finalData[i].data
        //     });
        // }
        options.series[0].data = newData;
        // options.chart.type = "column";
        options.tooltip.formatter = function () {
            // var weekValue = this.key .split('-');
            // return weekValue[1]+ ' week ' + weekValue[0] + '<br /> Active Nodes: ' + this.y;
            return this.key + '<br /> Active Nodes: ' + this.y;
        };
        this.setState({ data: newData}, ()=>{
            this.setState({
                loading: false
            })
        });
        // this.setState({
        //     loading: false
        // })
    }
    
    getMonthlyNode = () =>{
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
                data: data
            }))
        for (let i = 0; i < finalData.length; i++) {
            newData.push({
                name: finalData[i].date,
                x: i,
                y: finalData[i].data
            });
        }
        options.series[0].data = newData;
        // options.chart.type = "column";
        options.tooltip.formatter = function () {
            return 'Month: '+ this.key + '<br /> Active Nodes: ' + this.y;
        };
        this.setState({ data: finalData}, ()=>{
            this.setState({
                loading: false
            })
        });
    }

    chartViewToggle = (view) =>{
        this.setState({loading: true}, ()=>{
            options.chart.type = view;
        });
        setTimeout(function(){
            this.setState({loading: false});
            }.bind(this),10
        );
    }

    componentDidMount() {
        this.getDailyNode();
        this.getActiveNode();
        this.getAvarageNode();
    }
    render() {
        const { loading, data, activeNode, averageNode } = this.state;
        
        return (
            <div className="statschart-card" id={this.props.id} ref={this.props.refrence}>
                <div className="statschart-card-inner">
                    <div className="stats-chart">
                        <div className="chart-head">
                            <h3>ACTIVE NODES</h3>
                            <Radio.Group defaultValue="line" buttonStyle="solid">
                                <Radio.Button onClick={()=>{this.chartViewToggle("area")}} value="line"><SvgIcon fill="#fff" name="line-chart" viewbox="0 0 512 512" /></Radio.Button>
                                <Radio.Button onClick={()=>{this.chartViewToggle("column")}} value="bar"><SvgIcon fill="#fff" name="bar-chart" viewbox="0 0 24 24" /></Radio.Button>
                            </Radio.Group>

                            <Radio.Group defaultValue="daily" buttonStyle="solid">
                                <Radio.Button onClick={this.getDailyNode} value="daily">daily</Radio.Button>
                                <Radio.Button onClick={this.getWeeklyNode} value="weekly">weekly</Radio.Button>
                                <Radio.Button onClick={this.getMonthlyNode} value="monthly">monthly</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={data===null ? "chart-wrap no-date": "chart-wrap"}>
                            <Spin spinning={loading} />
                            {(!data && loading) &&
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
                            <h4>{activeNode}</h4>
                            <p>Active Nodes Right Now</p>
                        </div>
                        <div className="count-card">
                            <h4>{averageNode}</h4>
                            <p>Average Active Nodes</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActiveNodesTab
