import React from "react";
import PersonalRanking from "./personalRank/PersonalRanking";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const RankingTab = ({ objects, idx }) => {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Tuần</Tab>
                    <Tab>Tháng</Tab>
                </TabList>

                <TabPanel>
                    {objects?.map((item, idx) => (
                        <PersonalRanking data={item} idx={idx + 1} />

                    ))}
                </TabPanel>
                <TabPanel>
                    {objects?.map((item, idx) => (
                        <PersonalRanking data={item} idx={idx + 1} />

                    ))}
                </TabPanel>
            </Tabs>

        </>
    )
}

export default RankingTab;