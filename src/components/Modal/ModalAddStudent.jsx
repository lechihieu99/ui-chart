import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, Info, LinkSimpleHorizontal, Minus, Pencil, Plus, Star, X, XCircle } from '@phosphor-icons/react'
import { Badge, Modal, ToggleSwitch } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { studentsActions } from "../../store/features/studentsSlice";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ModalAddObject from "./ModalAddObject";
import ModalAddProperities from "./ModalAddPropertities";
import DefaultInfo from "../defaultInfo/DefaultInfo";

const options = [
    { value: 'student', label: 'Học sinh' },
    { value: 'teacher', label: 'Giáo viên' },
    { value: 'company', label: 'Công ty' },
    { value: 'other', label: 'Khác' }
];

const recommendLabel = [

    {
        id: '552210',
        name: 'Poster Truyền thông',
        point: 100,
        ratio: 90,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Nhạc Pop',
        point: 100,
        ratio: 90,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Poster Truyền thông',
        point: 100,
        ratio: 80,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Video dạy Tiếng Anh',
        point: 100,
        ratio: 50,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    }

]

const signLabel = ['warning', 'failure', 'purple', 'pink']

const ModalAddStudent = ({ show, setShow, students, info, setInfo, allInfo, setAllInfo }) => {
    const [newStu, setNewStu] = useState({
        name: '', email: '', phone: '', pass: '', gender: 'Nam', class: "", img: ''
    })

    const [typeObjectModal, setTypeObjectModal] = useState(options[0])

    const [showAddPro, setShowAddPro] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [properitiesList, setProperitiesList] = useState([{
        id: 0
    }])

    const keysArray = Object.keys(typeObjectModal);

    const [count, setCount] = useState(1)

    const dispatch = useDispatch();

    useEffect(() => {
        if (show) {
            setInfo()
            setAllInfo([])
        }
    }, [])

    const handleChange = (event) => {
        setNewStu(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = (event) => {
        setShow(false);
        if (typeObjectModal?.value === 'student') {
            const name = document.getElementById(`${keysArray[1] + typeObjectModal?.value}`)?.value
            const id = document.getElementById(`${keysArray[2] + typeObjectModal?.value}`)?.value
            const sex = 'Nam'
            const email = document.getElementById(`${keysArray[4] + typeObjectModal?.value}`)?.value
            const classObj = document.getElementById(`${keysArray[5] + typeObjectModal?.value}`)?.value
            const teacher = document.getElementById(`${keysArray[6] + typeObjectModal?.value}`)?.value

            dispatch(studentsActions.add({
                id: students.length + 1,
                idObj: id,
                name: name,
                sex: sex,
                email: email,
                class: classObj,
                teacher: teacher,
                type: typeObjectModal?.value?.toUpperCase(),
                asset: allInfo
            }))
        }

        if (typeObjectModal?.value === 'teacher') {
            const name = document.getElementById(`${keysArray[1] + typeObjectModal?.value}`)?.value
            const id = document.getElementById(`${keysArray[2] + typeObjectModal?.value}`)?.value
            const sex = 'Nam'
            const email = document.getElementById(`${keysArray[4] + typeObjectModal?.value}`)?.value
            const classObj = document.getElementById(`${keysArray[5] + typeObjectModal?.value}`)?.value
            const number = document.getElementById(`${keysArray[6] + typeObjectModal?.value}`)?.value

            dispatch(studentsActions.add({
                id: students.length + 1,
                idObj: id,
                name: name,
                sex: sex,
                email: email,
                class: classObj,
                number: number,
                type: typeObjectModal?.value?.toUpperCase(),
                asset: allInfo
            }))
        }

        if (typeObjectModal?.value === 'company') {
            const name = document.getElementById(`${keysArray[1] + typeObjectModal?.value}`)?.value
            const id = document.getElementById(`${keysArray[2] + typeObjectModal?.value}`)?.value
            const tax = document.getElementById(`${keysArray[3] + typeObjectModal?.value}`)?.value
            const total = document.getElementById(`${keysArray[4] + typeObjectModal?.value}`)?.value
            const phone = document.getElementById(`${keysArray[5] + typeObjectModal?.value}`)?.value

            dispatch(studentsActions.add({
                id: students.length + 1,
                idObj: id,
                name: name,
                tax: tax,
                total: total,
                phone: phone,
                type: typeObjectModal?.value?.toUpperCase(),
                asset: allInfo
            }))
        }
    }

    const handleSelectedPro = (idx) => {
        let arr = [...properitiesList];
        let arrTemp = [...arr.splice(idx, 1)]
        setProperitiesList([...arr])
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

    return (
        <>
            <Modal size='7xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng mới
                </Modal.Header>
                <Modal.Body>
                    <form action="javascript:void(0)" onSubmit={handleSubmit}>

                        {properitiesList?.map((item, idx) => (
                            <>
                                <div className="w-full flex gap-4 mb-2">
                                    <input type="text" id="name" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder={`Nhập tên đối tượng ${idx + 1}`} required />
                                    <input type="text" id="proType" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập điểm" required />
                                    <input type="text" id="proType" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tỷ trọng" required />
                                    {idx > 0 && (
                                        <Minus size={24} color='red' weight="bold" className="cursor-pointer" onClick={() => handleDelete(idx)} />
                                    )}

                                </div>
                                <div className="flex items-center gap-4 flex-wrap mb-2">
                                    {recommendLabel.map((item, idx) => (
                                        <>
                                            <Badge color={signLabel[idx]} className="cursor-pointer" >{item.name}</Badge>
                                        </>
                                    ))}

                                </div>
                            </>
                        ))}

                        {/* <div className="w-full p-2 flex flex-wrap items-center">

                            {properitiesList?.map((item, idx) => (
                                <div className="w-1/2 pb-4 flex items-center">
                                    <span className="pr-4 w-[30%] truncate">{item.name}:</span>
                                    {item.file === 'string' ? (
                                        <input type="text" id="proType" className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                                    ) : (
                                        <input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file"></input>
                                    )}
                                    <XCircle color="black" size={20} className="mx-4" onClick={() => handleSelectedPro(idx)} />
                                </div>
                            ))}
                        </div> */}

                        <span className="w-full flex gap-4 mt-2 items-center">Bạn có muốn thêm đối tượng bằng từ ngữ?
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </span>


                        {properitiesList?.map((item, idx) => (
                            <>
                                <div className="w-full flex gap-4 mb-2 items-center">

                                    <input type="text" id="name" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder={`Nhập tên đối tượng ${idx + 1}`} required />
                                    <input type="text" id="proType" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập giá trị" required />
                                    <input type="text" id="proType" className={`bg-white border-[1px] w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập đánh giá chi tiết" required />
                                    {idx > 0 && (
                                        <Minus size={24} color='red' weight="bold" className="cursor-pointer" onClick={() => handleDelete(idx)} />
                                    )}
                                </div>
                                <div className="flex items-center gap-4 flex-wrap mb-2">
                                    {recommendLabel.map((item, idx) => (
                                        <>
                                            <Badge color={signLabel[idx]} className="cursor-pointer">{item.name}</Badge>
                                        </>
                                    ))}

                                </div>
                            </>
                        ))}

                        <div className="cursor-pointer mt-2 px-4 py-[3px] flex justify-center items-center" onClick={handleAddProperities}>Thêm thuộc tính</div>
                        <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                        <span className="w-full py-2">Chi tiết đối tượng</span>
                        <div className="w-full mt-2 p-4 bg-[rgb(224,224,224)] rounded-xl">
                            <div className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex justify-between items-center rounded-xl mb-2 hover:text-black text-black`}>
                                <div className="cursor-pointer w-1/3" >1. Giáo trình ABC</div>
                                <div>Điểm số: 100 điểm</div>
                                <div>Tỷ trọng: 100 %</div>
                                <div className="flex items-center justify-center gap-2">
                                    <Info size={20} color='black' className="cursor-pointer" />
                                    <Pencil size={20} color='black' className="cursor-pointer" />
                                    <LinkSimpleHorizontal size={20} color='black' />
                                    <X size={20} color='black' className="cursor-pointer" />
                                </div>
                            </div>

                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            <span>Tài sản/dữ liệu của đối tượng: <span className="italic">{info?.name}</span></span>
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
                                <div className="w-full py-8 flex justify-center items-center">
                                    <span className="text-gray-400">Vui lòng thêm đối tượng để thực hiện bổ sung tài sản/dữ liệu của đối tượng</span>
                                </div>
                            </div>
                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            {/* Danh sách dữ liệu */}
                            <span>Data dữ liệu theo dạng JSON:</span>
                            <div className="my-2 flex items-center gap-4">
                                <span>Hiện JSON tổng: </span>
                                <ToggleSwitch />
                            </div>

                        </div>




                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center cursor-pointer">
                        <button type="submit" className="py-2 px-4 bg-[#3750AA] flex justify-center items-center rounded-full outline-0">
                            <span className="text-white">Thêm</span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ModalAddObject show={showModal} setShow={setShowModal} allInfo={allInfo} setAllInfo={setAllInfo} info={info} setInfo={setInfo} />
            <ModalAddProperities show={showAddPro} setShow={setShowAddPro} properitiesList={properitiesList} setProperitiesList={setProperitiesList} />
        </>
    )
}

export default ModalAddStudent;