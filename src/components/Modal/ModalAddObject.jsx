import React, { useEffect, useState } from "react";
import { LinkSimpleHorizontal, Minus, Plus, X } from '@phosphor-icons/react'
import { Badge, Modal, ToggleSwitch } from "flowbite-react";
import { useDispatch } from "react-redux";
import PDF from '../../asset/images/pdf_icon.svg'

import 'react-dropdown/style.css';
import JSONPretty from 'react-json-pretty';
import Chart from "../Chart";
import { addDataObject, addObject } from "../../redux/slice/object.slice";

const recommendLabel = [

    {
        id: '552210',
        name: 'Poster Truyền thông',
    },
    {
        id: '552210',
        name: 'Nhạc Pop',
    },
    {
        id: '552210',
        name: 'Poster Truyền thông',
    },
    {
        id: '552210',
        name: 'Video dạy Tiếng Anh',
    }

]

const signLabel = ['warning', 'failure', 'purple', 'pink']

const ModalAddObject = ({ parent, show, setShow }) => {
    const [properitiesList, setProperitiesList] = useState([{
        id: 0
    }])

    const [info, setInfo] = useState()

    const [count, setCount] = useState(1)
    const [finalArr, setFinalArr] = useState([])
    const [indexItem, setIndexItem] = useState(0)
    const [loadFile, setLoadFile] = useState(false)
    const [isSwitch, setIsSwitch] = useState(false)
    const [allFile, setAllFile] = useState()

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (finalArr)
    //         setInfo(finalArr[indexItem])
    // }, [finalArr, indexItem])

    useEffect(() => {
        if (show) {
            setFinalArr([])
        }
    }, [show])

    const handleSubmit = async (event) => {
        event.preventDefault()

        finalArr?.map((item, idx) => {
            dispatch(addObject({
                name: item.name,
                email: item.email,
                url: item.url,
                pointText: item.pointText,
                ratioText: item.ratioText,
                point: item.point,
                ratio: item.ratio,
                parent: parent,
                dataFile: item.data
            }))
        })

        setShow(false)
    }

    const handleAddProperities = () => {
        setProperitiesList([...properitiesList, {
            id: count
        }])

        setCount(count + 1)
    }

    const handleDelete = (idx) => {
        let arr = [...properitiesList];
        let arrTemp = [...arr.splice(idx, 1)]
        setProperitiesList([...arr])
    }

    const handleShowInfo = () => {
        const nameList = document.getElementsByClassName('nameText')
        const pointList = document.getElementsByClassName('pointText')
        const ratioList = document.getElementsByClassName('ratioText')
        const pointNumList = document.getElementsByClassName('pointNum')
        const ratioNumList = document.getElementsByClassName('ratioNum')

        var arr = []
        for (let i in nameList) {
            if (nameList[i]?.value && pointList[i]?.value && ratioList[i]?.value && pointNumList[i]?.value && ratioNumList[i]?.value) {
                arr.push({
                    name: nameList[i]?.value,
                    pointText: pointList[i]?.value,
                    ratioText: ratioList[i]?.value,
                    point: pointNumList[i]?.value,
                    ratio: ratioNumList[i]?.value,
                    data: finalArr[i]?.data ? finalArr[i]?.data : []
                })
            }
        }
        setFinalArr(arr)
    }

    const handlePostLabel = (name, idx) => {
        const nameList = document.getElementsByClassName('nameText')
        nameList[idx].value = name;
        handleShowInfo()
    }

    const handleSelectItem = (item, idx) => {
        setIndexItem(idx)
        setInfo(item)
    }

    const handleDeleteImage = (idx) => {
        var arrTemp = finalArr;
        var arr = arrTemp[indexItem]?.data?.splice(idx, 1)
        setFinalArr([...arrTemp])
    }

    const changeFile = async (e) => {
        e.preventDefault()

        const files = document.getElementById('fileModal').files;

        var arr = []

        Object.keys(files).forEach(i => {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                arr.push({
                    item: file.name,
                    data: e.target.result,
                    type: file.type
                })
                setLoadFile(e.target.result)
                setFinalArr(prevState => {
                    const newArray = [...prevState]; // Create a shallow copy of the array
                    newArray[indexItem] = { ...newArray[indexItem], data: arr }; // Update the data property
                    return newArray;
                });
            }
            reader.readAsDataURL(file);

        })


    }

    // useEffect(() => {
    //     console.log(finalArr)
    // }, [finalArr])

    return (
        <>
            <Modal style={{ minWidth: window.innerWidth > 1280 ? '66%' : '90%' }} position={`${finalArr?.length > 0 && window.innerWidth > 1280 ? 'center-left' : 'center'}`} show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng mới
                </Modal.Header>
                <Modal.Body>
                    <form action="javascript:void(0)" onSubmit={handleSubmit}>

                        {properitiesList?.map((item, idx) => (
                            <div className="w-full mb-4 border-b-[1px] border-gray-400">
                                <div className={`w-full flex flex-col md:flex-row gap-4 md:mb-2 items-center`}>

                                    <input type="text" id="name" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] nameText`} onChange={handleShowInfo} placeholder={`Nhập tên đối tượng ${idx + 1}`} required />
                                    <div className={`flex md:hidden items-center gap-4 flex-wrap`}>
                                        {recommendLabel.map((item, idx2) => (
                                            <>
                                                {document.getElementsByClassName('nameText')[idx]?.value && item.name.toLowerCase().includes(document.getElementsByClassName('nameText')[idx]?.value?.toLowerCase()) && (
                                                    <Badge color={signLabel[idx2]} className="cursor-pointer" onClick={() => handlePostLabel(item.name, idx)}>{item.name}</Badge>

                                                )}
                                            </>
                                        ))}

                                    </div>
                                    <input type="text" id="pointText" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] pointText`} onChange={handleShowInfo} placeholder="Nhập giá trị (bằng chữ)" required />
                                    <input type="text" id="ratioText" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ratioText`} onChange={handleShowInfo} placeholder="Nhập đánh giá chi tiết (bằng chữ)" required />

                                </div>
                                <div className={`hidden md:flex items-center gap-4 flex-wrap mb-2`}>
                                    {recommendLabel.map((item, idx2) => (
                                        <>
                                            {document.getElementsByClassName('nameText')[idx]?.value && item.name.toLowerCase().includes(document.getElementsByClassName('nameText')[idx]?.value?.toLowerCase()) && (
                                                <Badge color={signLabel[idx2]} className="cursor-pointer" onClick={() => handlePostLabel(item.name, idx)}>{item.name}</Badge>

                                            )}
                                        </>
                                    ))}

                                </div>
                                <div className={`w-full flex flex-col md:flex-row gap-4 mb-4 items-center`}>
                                    <div className="w-1/3 h-full"></div>
                                    <input type="text" id="point" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] pointNum`} onChange={handleShowInfo} placeholder="Nhập điểm (bằng số)" required />
                                    <input type="text" id="ratio" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ratioNum`} onChange={handleShowInfo} placeholder="Nhập tỷ trọng (bằng số)" required />
                                    {idx > 0 && (
                                        <Minus size={24} color='red' weight="bold" className="cursor-pointer" onClick={() => handleDelete(idx)} />
                                    )}
                                </div>

                            </div>
                        ))}

                        <div className="w-full flex gap-4">
                            <div className="cursor-pointer mt-2 px-4 py-[3px] w-full flex justify-center items-center bg-blue-200 rounded-full" onClick={handleAddProperities}>Thêm</div>
                            {/* <div className="cursor-pointer mt-2 px-4 py-[3px] w-1/2 flex justify-center items-center bg-gray-200 rounded-full" onClick={handleSaveInfo}>Lưu tạm thời</div> */}

                        </div>
                        <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                        <span className="w-full py-2">Chi tiết đối tượng</span>
                        <div className="w-full mt-2 p-4 bg-[rgb(224,224,224)] rounded-xl">

                            {finalArr ? finalArr?.map((item, idx) => (
                                <div key={idx} className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex flex-col md:flex-row justify-between md:items-center rounded-xl mb-2 hover:text-black ${idx === indexItem ? "text-black" : "text-gray-400"}`}>
                                    <div className="cursor-pointer md:w-1/3" onClick={() => handleSelectItem(item, idx)}>{idx + 1}. {item.name}</div>
                                    <div>Điểm số: {item.point} điểm</div>
                                    <div>Tỷ trọng: {item.ratio} %</div>
                                    <div className="flex md:items-center justify-end md:justify-center gap-2">

                                        <X size={20} color='black' className="cursor-pointer" />
                                    </div>
                                </div>
                            )) : (
                                <></>
                            )}

                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            <span>Tài sản/dữ liệu của đối tượng: <span className="italic">{finalArr[indexItem]?.name}</span></span>
                            <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center">
                                <span>
                                    Link drive:
                                </span>
                                <form className="flex-1 flex items-center" onSubmit={(event) => { alert("Cập nhật link thành công") }}>
                                    <input type="text" className="w-full ms-1 rounded-md outline-0" />
                                    <button type="submit"></button>
                                </form>
                            </div>
                            <div className="w-full bg-[rgba(255,255,255,0.4)] mt-2 rounded-xl flex justify-center items-center">

                                {finalArr[indexItem] ? loadFile ? (
                                    <>
                                        <div className="w-full h-full flex flex-wrap p-8 gap-8">
                                            {finalArr[indexItem]?.data?.map((item, idx) => (
                                                <div className="relative">
                                                    <img id="preview" key={idx} src={item.type === 'application/pdf' ? PDF : item.data} className="h-32 w-32 object-fit rounded-lg shadow-xl" />
                                                    <div className="p-[3px] rounded-full flex justify-center items-center bg-gray-700 absolute -top-2 -right-2 cursor-pointer" onClick={() => handleDeleteImage(idx)}>
                                                        <X size={12} color='white' />
                                                    </div>
                                                </div>
                                            ))}
                                            <label htmlFor="fileModal" className="h-32 w-32 flex justify-center items-center bg-yellow-200 cursor-pointer">
                                                <Plus size={20} color="black" />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="fileModal" className="w-full h-full flex pt-8 pb-8 justify-center items-center cursor-pointer">
                                            <Plus size={20} color="black" />
                                        </label>
                                    </>
                                ) : (
                                    <div className="w-full p-8 flex justify-center items-center">
                                        <span className="text-gray-400">Vui lòng thêm đối tượng để thực hiện bổ sung tài sản/dữ liệu của đối tượng</span>
                                    </div>
                                )}

                            </div>
                            {/*  */}
                            <input type="file" id="fileModal" name="fileModal" multiple className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input>
                            {show && finalArr?.length > 0 && (
                                <>
                                    <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                                    <div className="text-white flex xl:hidden justify-center items-center ">
                                        <Chart finalArr={finalArr} />
                                    </div>
                                </>
                            )}
                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            {/* Danh sách dữ liệu */}
                            <span>Data dữ liệu theo dạng JSON:</span>
                            <div className="my-2 flex items-center gap-4">
                                <span>Hiện JSON tổng: </span>
                                <ToggleSwitch checked={isSwitch} onChange={setIsSwitch} />
                            </div>

                            <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center overflow-x-auto">
                                <JSONPretty id="json-pretty" data={isSwitch ? finalArr : finalArr[indexItem]}></JSONPretty>
                            </div>

                        </div>




                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center cursor-pointer">
                        <button type="submit" className="py-2 px-4 bg-[#3750AA] flex justify-center items-center rounded-full outline-0" onClick={handleSubmit}>
                            <span className="text-white">Thêm</span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {show && finalArr?.length > 0 && (
                <div className="hidden xl:flex text-white absolute top-0 right-0 z-[9999] w-1/3 h-screen justify-center items-center">
                    <Chart finalArr={finalArr} />
                </div>
            )}

        </>
    )
}

export default ModalAddObject;