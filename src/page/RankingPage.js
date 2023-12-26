import React, { useEffect } from "react";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import TabComponents from "../components/tabs/Tab";
import RankingTab from "../components/RankingTab";
import { getAllObject } from "../redux/slice/object.slice";

const RankingPage = () => {
    const dispatch = useDispatch()
    const allObject = useSelector((state) => state.object.allObject)

    useEffect(() => {
        dispatch(getAllObject())
    }, [])
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
                    <TabComponents objects={allObject?.data} />
                    <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
                        <RankingTab objects={allObject?.data} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default RankingPage;