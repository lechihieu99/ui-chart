import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, Minus, Plus, Star } from '@phosphor-icons/react'
import { Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { studentsActions } from "../../store/features/studentsSlice";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ModalAddObject from "./ModalAddObject";



const ModalAddStudent = ({ show, setShow, students }) => {
    const [newStu, setNewStu] = useState({
        name: '', email: '', phone: '', pass: '', gender: 'Nam', class: "", img: ''

    })

    const [showAddPro, setShowAddPro] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch();
    const handleChange = (event) => {
        setNewStu(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = (event) => {
        console.log(newStu);
        setShow(false);
        dispatch(studentsActions.add({
            id: students.length + 1,
            name: newStu.name,
            url: newStu.img,
            email: newStu.email,
            class: newStu.class,
            gender: newStu.gender,

        }))
    }

    return (
        <>
            <Modal size='5xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng mới
                </Modal.Header>
                <Modal.Body>
                    <form action="javascript:void(0)" onSubmit={handleSubmit}>
                        {/* <div className="w-full p-2 flex flex-wrap items-center">
                                <span className="pr-4 w-1/4">Link hình ảnh: </span>
                                <input value={newStu.img} onChange={handleChange} name="img" type="text" id="first_name" className="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="image.png..." required />
                                <span className="text-green-700 flex gap-2 ml-4">Tên học sinh hợp lệ <Check size={20} color='green' /> </span>
                            </div> */}
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Tên học sinh:</span>
                            <input value={newStu.name} onChange={handleChange} name="name" type="text" id="first_name" className="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nguyen Van A...." required />
                            <span className="text-green-700 flex gap-2 ml-4">Tên học sinh hợp lệ <Check size={20} color='green' /> </span>
                        </div>
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Giới tính</span>
                            {/* <input name="" type="text" id="first_name" className="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nguyen Van A...." required /> */}
                            <div className="w-2/5 flex items-center">
                                <label htmlFor="gendermale">Nam</label>
                                <input checked={newStu.gender === 'Nam'} onChange={handleChange} id="gendermale" type="radio" name="gender" value="Nam" />
                                <label htmlFor="genderfemale" className="ms-4">Nữ</label>
                                <input checked={newStu.gender === 'Nữ'} onChange={handleChange} id="genderfemale" type="radio" name="gender" value="Nữ" className="" />
                            </div>
                            <span className="text-green-700 flex gap-2 ml-4">Tên học sinh hợp lệ <Check size={20} color='green' /> </span>
                        </div>
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Email</span>
                            <input value={newStu.email} onChange={handleChange} name="email" type="email" id="first_name" className={`w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="abc@gmail.com" required />
                            <span className="text-green-700 flex gap-2 ml-4">Emai hợp lệ <Check size={20} color='green' /> </span>

                        </div>
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Số điện thoại</span>
                            <input name="phone" type="text" id="first_name" class="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="18001091" required />
                            <span className="text-green-700 flex gap-2 ml-4">SĐT hợp lệ <Check size={20} color='green' /> </span>
                        </div>
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Mật khẩu</span>
                            <input name="pass" type="password" id="first_name" class="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="*****" required />
                            <span value={newStu.pass} onChange={handleChange} className="text-green-700 flex gap-2 ml-4">Mật khẩu hợp lệ <Check size={20} color='green' /> </span>
                        </div>
                        <div className="w-full p-2 flex flex-wrap items-center">
                            <span className="pr-4 w-1/4">Lớp</span>
                            <input value={newStu.class} onChange={handleChange} name="class" type="text" id="first_name" class="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="IS207" required />
                            <span className="text-green-700 flex gap-2 ml-4">Tên lớp hợp lệ <Check size={20} color='green' /> </span>
                        </div>
                        {showAddPro && (
                            <>
                                <div className="w-full flex p-2">
                                    <div className="w-1/2 flex items-center gap-4">
                                        <span>Tên thuộc tính: </span>
                                        <input value="" name="properties" type="text" id="properties" class="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="properties" required />

                                    </div>
                                    <div className="w-1/2 flex items-center gap-4">
                                        <span>Dữ liệu thuộc tính: </span>
                                        <input value="" name="properties" type="text" id="properties" class="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="properties" required />

                                    </div>
                                </div>
                            </>
                        )}
                        <div className="w-full flex gap-4">
                            {showAddPro ? (
                                <div className="w-1/2 cursor-pointer bg-yellow-200 p-2 opacity-80 flex justify-center items-center rounded-full" onClick={() => setShowAddPro(false)}>

                                    <Minus size={16} color="black" />
                                </div>
                            ) : (
                                <div className="w-1/2 cursor-pointer bg-yellow-200 p-2 opacity-80 flex justify-center items-center rounded-full" onClick={() => setShowAddPro(true)}>

                                    <Plus size={16} color="black" />
                                </div>
                            )}

                            {showAddPro && (
                                <div className="w-1/2 cursor-pointer bg-blue-200 p-2 opacity-80 flex justify-center items-center rounded-full" onClick={() => setShowAddPro(true)}>
                                    <span>Thêm thuộc tính</span>
                                </div>
                            )}


                        </div>
                        <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                        <div className="w-full mt-2 p-4 bg-[rgba(0,0,0,0.1)] rounded-xl" onClick={() => setShowModal(true)}>
                            <div className="w-full bg-[rgba(177,177,177,0.4)] flex justify-center items-center cursor-pointer rounded-full pt-[3px] pb-[3px]"
                            >
                                <Plus size={24} color='white' />
                            </div>
                        </div>
                        <div className="w-full flex justify-end items-center cursor-pointer mt-4">
                            <button type="submit" className="py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full outline-0">
                                <span className="text-white">Thêm</span>
                            </button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
            <ModalAddObject show={showModal} setShow={setShowModal} />
        </>
    )
}

export default ModalAddStudent;