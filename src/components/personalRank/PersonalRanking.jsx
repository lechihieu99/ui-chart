import { Minus, Plus } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Chart from "../Chart";

const PersonalRanking = ({ data }) => {
    const [showData, setShowData] = useState(false)

    return (
        <>
            <div className="w-full p-2 bg-white shadow-lg">
                <div className="w-full flex items-center justify-between gap-4">
                    <span>{data?.id}</span>
                    <div className="w-16 h-16 rounded-full" style={{ backgroundImage: `url(${data?.url})`, backgroundSize: 'cover' }}></div>
                    <div className="w-1/2 flex flex-col items-start justify-center">

                        <span>{data?.name}</span>

                    </div>
                    {showData ? (
                        <Minus size={24} color='black' className="cursor-pointer" onClick={() => setShowData(false)} />
                    ) : (
                        <Plus size={24} color='black' className="cursor-pointer" onClick={() => setShowData(true)} />
                    )}
                </div>
                {data?.asset && showData && (
                    <Chart allInfo={data?.asset} />
                )}
            </div>
        </>
    )
}

export default PersonalRanking