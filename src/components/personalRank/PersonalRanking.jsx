import { Minus, Plus } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "../Chart";

const PersonalRanking = ({ data, idx }) => {
    const [showData, setShowData] = useState(false)

    return (
        <>
            <div className="w-full p-2 bg-white mb-2 shadow-lg rounded-lg overflow-hidden">
                <div className="w-full flex items-center justify-between gap-4">
                    <span className={`w-[10%] text-center ${data?.id === 1 ? 'text-xl font-bold text-[#ffd700]' : data?.id === 2 ? 'text-lg font-bold text-[#c0c0c0]' : data?.id === 3 ? 'font-bold text-[#cd7f32]' : 'text-black'}`}>{idx}</span>
                    <div className="w-12 h-12 rounded-full" style={{ backgroundImage: `url(${data?.url})`, backgroundSize: 'cover' }}></div>
                    <div className="flex flex-col items-start justify-center" style={{ width: 'calc(75% - 88px)' }}>

                        <span>{data?.name}</span>

                    </div>
                    {showData ? (
                        <Minus size={24} color='black' className="cursor-pointer" onClick={() => setShowData(false)} />
                    ) : (
                        <Plus size={24} color='black' className="cursor-pointer" onClick={() => setShowData(true)} />
                    )}
                </div>
                {showData && (
                    <div className="w-full">
                        <div className="w-full flex gap-2 items-start">
                            <strong>pointText:</strong>
                            <p>{data?.pointText}</p>
                        </div>
                        <div className="w-full flex gap-2 items-start">
                            <strong>ratioText:</strong>
                            <p>{data?.ratioText}</p>
                        </div>
                        <div className="w-full flex gap-2 items-start">
                            <strong>point:</strong>
                            <p>{data?.point}</p>
                        </div>
                        <div className="w-full flex gap-2 items-start">
                            <strong>ratio:</strong>
                            <p>{data?.ratio}</p>
                        </div>
                        <Link to={`/object/${data?.id}`}>
                            <span className="text-blue-400 w-full text-center">Xem chi tiết</span>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default PersonalRanking