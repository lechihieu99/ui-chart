import React from "react";
import Header from "../components/Header";

import { useSelector } from "react-redux";
import TabComponents from "../components/tabs/Tab";
import PersonalRanking from "../components/personalRank/PersonalRanking";

const RankingPage = () => {
    const students = useSelector(state => state.students)
    return (
        <>
            <div className="p-4">
                <Header />
                <div className="flex justify-between">
                    {/* Search box */}
                    <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-2/3'>
                        <i class="fa-solid fa-magnifying-glass p-3"></i>
                        <input className='bg-white outline-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
                    </div>
                </div>
                <div className="w-full flex gap-8 mt-4">
                    <TabComponents students={students} />
                    <div className="w-1/3 rounded-lg overflow-hidden">
                        {students?.map((item) => (
                            <PersonalRanking data={item} />

                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default RankingPage;