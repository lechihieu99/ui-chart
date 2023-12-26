import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editObject } from '../redux/slice/object.slice'

function StudentBoard({ page, id, url, name, classname, gender, pointText, ratioText, point, ratio, isEdit, setIsEdit }) {
    const dispatch = useDispatch()
    const object = useSelector((state) => state.object.object)

    const [isDisable, setIsDisable] = useState(true)

    const [nameVal, setNameVal] = useState(object?.data[0]?.name)
    const [pointTVal, setPointTVal] = useState(object?.data[0]?.pointText)
    const [ratioTVal, setRatioTVal] = useState(object?.data[0]?.ratioText)
    const [pointVal, setPointVal] = useState(object?.data[0]?.point)
    const [ratioVal, setRatioVal] = useState(object?.data[0]?.ratio)

    useEffect(() => {
        if (nameVal !== '' && pointTVal !== '' && ratioTVal !== '' && pointVal !== '' && ratioVal !== '')
            setIsDisable(false)
        else
            setIsDisable(true)
    }, [nameVal, pointTVal, ratioTVal, pointVal, ratioVal])

    const handleEdit = async () => {
        if (isDisable === false) {
            dispatch(editObject({
                id: object?.data[0]?.id,
                name: nameVal,
                pointText: pointTVal,
                ratioText: ratioTVal,
                point: pointVal,
                ratio: ratioVal
            }))

            await setIsEdit(false)
        }
    }
    return (
        <div className='flex md:flex-col gap-4 md:gap-0 items-center space-y-3 w-full rounded-lg shadow-lg md:rounded-none md:shadow-none md:w-5/6 h-full mx-auto shadow-style p-6 bg-white'>
            <span className='hidden md:block'>{id}</span>
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <img src={url} alt="" className='w-16 h-16 md:w-40 md:h-40 rounded-full object-center object-cover' />
                <div className='flex flex-col md:w-full'>
                    {isEdit ? (
                        <input type="text" id="editName" onChange={(e) => setNameVal(e.target.value)} defaultValue={object?.data[0]?.name} className={`bg-white border-[1px] w-full border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-full p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} required />
                    ) : (
                        <span className="text-center font-bold md:text-xl">{name}</span>
                    )}
                </div>
            </div>

            <div className='hidden md:block'>
                <strong>About</strong>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eveniet, enim delectus similique totam error cumque quas possimus numquam ea illum obcaecati facilis aut expedita quaerat illo. Sed, unde dolore.</p>
            </div>
            {page !== 'dashboard' ? (
                <>
                    <div className='w-full flex flex-wrap'>
                        {isEdit ? (
                            <>
                                <div className='w-full flex flex-col'>
                                    <strong>pointText:</strong>
                                    <input type="text" id="editPointText" onChange={(e) => setPointTVal(e.target.value)} defaultValue={object?.data[0]?.pointText} className={`bg-white border-[1px] w-full border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-full p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} required />
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2 items-start w-full">
                                <strong>pointText:</strong>
                                <p>{pointText}</p>
                            </div>
                        )}

                        {isEdit ? (
                            <>
                                <div className='w-full flex flex-col mt-2'>
                                    <strong>ratiotext:</strong>
                                    <input type="text" id="editRatioText" onChange={(e) => setRatioTVal(e.target.value)} defaultValue={object?.data[0]?.ratioText} className={`bg-white border-[1px] w-full border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-full p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} required />
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2 items-start w-full">
                                <strong>ratioText:</strong>
                                <p>{ratioText}</p>
                            </div>
                        )}

                        {isEdit ? (
                            <>
                                <div className='w-full flex flex-col mt-2'>
                                    <strong>point:</strong>
                                    <input type="text" id="editPoint" onChange={(e) => setPointVal(e.target.value)} defaultValue={object?.data[0]?.point} className={`bg-white border-[1px] w-full border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-full p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} required />
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2 items-start w-full">
                                <strong>point:</strong>
                                <p>{point}</p>
                            </div>
                        )}

                        {isEdit ? (
                            <>
                                <div className='w-full flex flex-col mt-2'>
                                    <strong>ratio:</strong>
                                    <input type="text" id="editRatio" onChange={(e) => setRatioVal(e.target.value)} defaultValue={object?.data[0]?.ratio} className={`bg-white border-[1px] w-full border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-full p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} required />
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2 items-start w-full">
                                <strong>ratio:</strong>
                                <p>{ratio}</p>
                            </div>
                        )}

                        {isEdit ? (
                            <div className='w-full flex md:hidden items-center gap-2 '>
                                <div className='w-1/2 py-[3px] flex justify-center items-center rounded-full bg-gray-400 text-black cursor-pointer' onClick={() => setIsEdit(false)}>Quay lại</div>
                                <div className={`w-1/2 py-[3px] flex justify-center items-center rounded-full ${isDisable ? "bg-blue-200 text-white cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"}  `} onClick={handleEdit}>Lưu</div>

                            </div>
                        ) : (
                            <div className="cursor-pointer mt-2 px-4 py-[3px] w-full flex md:hidden justify-center items-center bg-blue-200 rounded-full" onClick={() => setIsEdit(true)}>Chỉnh sửa</div>
                        )}

                    </div>
                    {isEdit ? (
                        <div className='w-full hidden md:flex items-center gap-2 '>
                            <div className='w-1/2 py-[3px] flex justify-center items-center rounded-full bg-gray-400 text-black cursor-pointer' onClick={() => setIsEdit(false)}>Quay lại</div>
                            <div className={`w-1/2 py-[3px] flex justify-center items-center rounded-full ${isDisable ? "bg-blue-200 text-white cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"}  `} onClick={handleEdit}>Lưu</div>

                        </div>
                    ) : (
                        <div className="cursor-pointer mt-2 px-4 py-[3px] w-full hidden md:flex justify-center items-center bg-blue-200 rounded-full" onClick={() => setIsEdit(true)}>Chỉnh sửa</div>
                    )}
                </>
            ) : (
                <div className='w-full flex-col text-sm md:text-base md:block'>
                    <div className="flex gap-2 items-start w-full">
                        <strong>pointText:</strong>
                        <p>{pointText}</p>
                    </div>
                    <div className="flex gap-2 items-start w-full">
                        <strong>ratioText:</strong>
                        <p>{ratioText}</p>
                    </div>
                    <div className="flex gap-2 items-start w-full">
                        <strong>point:</strong>
                        <p>{point}</p>
                    </div>
                    <div className="flex gap-2 items-start w-full">
                        <strong>ratio:</strong>
                        <p>{ratio}</p>
                    </div>
                </div>
            )}


        </div>
    )
}

export default StudentBoard