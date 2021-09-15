import React, { Component } from 'react';
import { Tabs } from 'antd';
import { SvgIcon, Container } from '../common';
import "./stats.scss";
import ActiveNodesTab from '../stats/activenodes-tab';
import SessionsTab from '../stats/sessions-tab';
import DataConsumedTab from '../stats/dataconsumed-tab';
import AverageSessionDurationTab from '../stats/averagesessionduration-tab';

const { TabPane } = Tabs;

class StatsView extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="stats-banner">
                    <Container>
                        <h1>NETWORK STATISTICS</h1>
                        <p>Metrics and Statistics of the Sentinel Node Network provide a deeper insight to the project growth and network development.</p>
                    </Container>
                </div>
                <div className="stats-section">
                    <SvgIcon className="stats-path" name="tri-path" viewbox="0 0 1449.219 352.213" />
                    <Container>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="ACTIVE NODES" key="1">
                                <ActiveNodesTab />
                            </TabPane>
                            <TabPane tab="sessions" key="2">
                                <SessionsTab />
                            </TabPane>
                            <TabPane tab="data consumed" key="3">
                                <DataConsumedTab />
                            </TabPane>
                            <TabPane tab="average session duration" key="4">
                                <AverageSessionDurationTab />
                            </TabPane>
                        </Tabs>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default StatsView

