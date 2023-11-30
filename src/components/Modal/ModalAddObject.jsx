import axios from "axios";
import { Badge, Button, Modal } from "flowbite-react";
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

const ModalAddObject = ({ show, setShow, setAllInfo, allInfo }) => {

    const [isCheck, setIsCheck] = useState(false)
    const [review, setReview] = useState('Tốt')
    const [group, setGroup] = useState()

    const [error, setError] = useState()
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

        if (name && reviewPer) {
            setAllInfo(prev => [
                ...prev, {
                    id: allInfo?.length + 1,
                    name: name,
                    point: point,
                    ratio: ratio,
                    message: message,
                    reviewPer: reviewPer,
                    reviewId: 'D5PP6612',
                    reliability: 5,
                    result: review,
                    group: group,
                    data: []
                }
            ])
            setShow(false)
        }
        else {
            setError('Vui lòng điền đầy đủ thông tin')
            setTimeout(() => {
                setError()
            }, 3000)
        }


    }

    const handleAddRecommendLabel = (item) => {
        document.getElementById('name').value = item.name
        document.getElementById('point').value = item.point
        document.getElementById('ratio').value = item.ratio
    }

    return (
        <>
            <Modal size='5xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng
                </Modal.Header>
                <Modal.Body>
                    {error && (
                        <span className="italic text-red-400">{error}</span>
                    )}

                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4">Tên đối tượng:</span>
                        <input type="text" id="name" class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4">Đề xuất label:</span>
                        <div className="flex items-center gap-4 flex-wrap">
                            {recommendLabel.map((item, idx) => (
                                <>
                                    <Badge color={signLabel[idx]} className="cursor-pointer" onClick={() => handleAddRecommendLabel(item)}>{item.name}</Badge>
                                </>
                            ))}

                        </div>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Điểm số:</span>
                            <input type="text" id="point" disabled={isCheck ? true : false} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${isCheck && "opacity-50 cursor-no-drop"}`} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">Tỷ trọng:</span>
                            <input type="text" id="ratio" disabled={isCheck ? true : false} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${isCheck && "opacity-50 cursor-no-drop"}`} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                    <div className="w-full h-8 p-2 flex items-center gap-4">
                        <div className="w-1/3 h-full bg-blue-200"></div>
                        <div className="w-1/3 h-full bg-red-200"></div>
                        <div className="w-1/3 h-full bg-yellow-200"></div>
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