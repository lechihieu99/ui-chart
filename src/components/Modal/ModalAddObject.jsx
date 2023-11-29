import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Check, Star } from '@phosphor-icons/react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
    'Tốt', 'Khá', 'Trung bình'
];

const options2 = [
    'Âm nhạc', 'Môn học', 'Sản phẩm truyền thông'
];

const axiosApi = axios.create({
    baseURL: 'http://192.168.1.193:5000/api',
    headers: {
        'Content-type': 'application/json',
    },
});

const ModalAddObject = ({ show, setShow, setAllInfo, allInfo }) => {

    const [isCheck, setIsCheck] = useState(false)
    const [review, setReview] = useState('Tốt')
    const [group, setGroup] = useState()
    // const [data, setData] = useState()

    // useEffect(() => {
    //     const data = {
    //         "prompt": "hello",
    //         "model": "hello"
    //     }

    //     const callApi = async () => {
    //         await axiosApi.post('/text-to-speech', JSON.stringify(data)
    //         ).then((res) => setData(res.data.choices[0].message.content))
    //             .catch((error) => console.log(error))
    //     }

    //     callApi()
    // }, [])

    const checkBoxChange = (e) => {
        setIsCheck(e.target.checked)
    }

    const handleChangeReview = (e) => {
        setReview(e.label)
    }

    const handleChangeGroup = (e) => {
        setGroup(e.label)
    }

    const handleAddObject = () => {
        const name = document.getElementById('name')?.value
        const point = document.getElementById('point')?.value
        const ratio = document.getElementById('ratio')?.value
        const message = document.getElementById('message')?.value
        const reviewPer = document.getElementById('reviewPer')?.value

        if (name || reviewPer) {
            if (!isCheck) {
                var isExist = false
                allInfo?.map((item) => {
                    if (name === item.name)
                        isExist = true;
                })


                if (isExist === false) {
                    var arrTemp = allInfo ? allInfo : []
                    arrTemp.push({
                        id: '1',
                        name: name,
                        point: point,
                        ratio: ratio,
                        message: '',
                        reviewPer: reviewPer,
                        reviewId: 'D5PP6612',
                        reliability: 5,
                        result: review,
                        group: group,
                        data: []
                    })
                    setAllInfo(arrTemp)
                    setShow(false)
                }
            }
            else {
                var isExist = false
                allInfo?.map((item) => {
                    if (name === item.name)
                        isExist = true;
                })

                if (isExist === false) {
                    var arrTemp = allInfo ? allInfo : []
                    arrTemp.push({
                        id: '1',
                        name: name,
                        point: '',
                        ratio: '',
                        message: message,
                        reviewPer: reviewPer,
                        reviewId: 'D5PP6612',
                        reliability: 5,
                        result: review,
                        group: group,
                        data: []
                    })
                    setAllInfo(arrTemp)
                    setShow(false)
                }
            }
        }
    }

    return (
        <>
            <Modal size='5xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4">Tên đối tượng:</span>
                        {/* <audio src={data ? data : ""} controls /> */}
                        <input type="text" id="name" class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Điểm số:</span>
                            {/* <audio src={data ? data : ""} controls /> */}
                            <input type="text" id="point" disabled={isCheck ? true : false} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${isCheck && "opacity-50 cursor-no-drop"}`} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">Tỷ trọng:</span>
                            {/* <audio src={data ? data : ""} controls /> */}
                            <input type="text" id="ratio" disabled={isCheck ? true : false} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${isCheck && "opacity-50 cursor-no-drop"}`} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center gap-2 p-2">
                        <span className="font-semibold">Bạn có muốn thêm đối tượng theo dạng text?</span>
                        <input id="remember" type="checkbox" value="" onChange={checkBoxChange} class="w-4 h-4 border-[1px] border-black bg-gray-50" required />
                    </div>
                    <div className={`w-full h-0 overflow-hidden ${isCheck && "h-fit"}`}>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-[1px] border-[rgba(0,0,0,0.5)]" style={{ resize: 'none' }} placeholder="Mô tả đối tượng..."></textarea>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Người đánh giá:</span>
                            {/* <audio src={data ? data : ""} controls /> */}
                            <input type="text" id="reviewPer" class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2 p-2 flex items-center rounded-xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                            <div className="pr-4 h-full flex items-center">Nguyễn Văn A</div>
                            <div className="flex h-full pb-[2px] gap-[2px] items-center">
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-2 flex items-center">
                        <span className="pr-4">Đánh giá:</span>
                        <Dropdown options={options} value={options[0]} onChange={handleChangeReview} placeholder="Tốt" />
                    </div>

                    <div className="w-1/2 p-2 flex items-center">
                        <span className="pr-4">Nhóm đối tượng:</span>
                        <Dropdown options={options2} value={options2[0]} onChange={handleChangeGroup} placeholder="Chọn nhóm đối tượng..." />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center cursor-pointer">
                        <div className="py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full" onClick={handleAddObject}>
                            <span className="text-white">Thêm đối tượng</span>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddObject;