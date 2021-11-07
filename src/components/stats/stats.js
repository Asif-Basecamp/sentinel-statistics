import React, { useEffect, useState } from "react";
import { SvgIcon, Container } from '../common';
import { Link } from 'react-scroll';
import axios from 'axios';
import "./stats.scss";
import ActiveNodesTab from '../stats/activenodes-tab';
import SessionsTab from '../stats/sessions-tab';
import DataConsumedTab from '../stats/dataconsumed-tab';
import AverageSessionDurationTab from '../stats/averagesessionduration-tab';

const TabId = [
    {
      id: "ActiveNodesTab",
      name:"Active Nodes"
    },
    {
      id: "SessionsTab",
      name:"Sessions"
    },
    {
      id: "DataConsumedTab",
      name:"Data Consumed"
    },
    {
      id: "AverageSessionDurationTab",
      name:"Average session duration"
    },
];

const StatsView = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL_LIVE)
          .then(function(response) {
            setData(response.data);
            setLoading(false)
          }).catch(function(error) {
            console.log(error);
          })
      }, [loading]);
    return (
        <>
            <div className="stats-banner">
                <Container>
                    <h1>NETWORK STATISTICS</h1>
                    <p>Metrics and Statistics of the Sentinel Node Network provide a deeper insight to the project growth and network development.</p>
                </Container>
            </div>
            <div className="stats-section">
                <SvgIcon className="stats-path" name="tri-path" viewbox="0 0 1449.219 352.213" />
                <Container>
                    <ul className="scroll-tab">
                        {TabId.map((tab, index) => {
                            return (
                                <li key={index}><Link activeClass="active" to={tab.id} spy={true} smooth={true} offset={-70}>{tab.name}</Link></li>
                            );
                        })}
                    </ul>
                    {!loading && 
                        <>
                            <ActiveNodesTab id="ActiveNodesTab" data={data.nodes} />
                            <SessionsTab id="SessionsTab" data={data.sessions} />
                            <DataConsumedTab id="DataConsumedTab" data={data.bandwidth} />
                            <AverageSessionDurationTab id="AverageSessionDurationTab" data={data.duration} />
                        </>
                    }
                </Container>
            </div>
        </>
    )
}

export default StatsView

