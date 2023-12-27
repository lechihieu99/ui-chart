import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import TabComponents from "../components/tabs/Tab";
import RankingTab from "../components/RankingTab";
import { getAllObject, getAllRanking, rankingGroup } from "../redux/slice/object.slice";

const RankingPage = () => {
    const dispatch = useDispatch()
    const allObject = useSelector((state) => state.object.allObject)
    const allRanking = useSelector((state) => state.object.allRanking)
    const rankingGr = useSelector((state) => state.object.rankingGroup)

    const [groupType, setGroupType] = useState('Âm nhạc')

    useEffect(() => {
        dispatch(getAllRanking())
    }, [])

    useEffect(() => {
        if (groupType)
            dispatch(rankingGroup({ group: groupType }))
    }, [groupType])

    return (
        <>
            <div className="p-4">
                <Header />
                <div className="flex justify-between">
                    {/* Search box */}
                    <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-full md:w-2/3'>
                        <i class="fa-solid fa-magnifying-glass p-3"></i>
                        <input className='bg-white outline-0 border-0 focus:ring-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-8 mt-4">
                    <TabComponents groupType={groupType} setGroupType={setGroupType} objects={allRanking?.data} />
                    <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
                        <RankingTab objects={rankingGr?.data} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default RankingPage;