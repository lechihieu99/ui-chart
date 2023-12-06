import { Modal } from "flowbite-react";
import React, { useState } from "react";

import Dropdown from 'react-dropdown';

const options = [
    { value: 'file', label: 'File phương tiện' },
    { value: 'string', label: 'Dữ liệu chữ' },
];

const ModalAddProperitiesChild = ({ show, setShow, properitiesChildList, setProperitiesChildList }) => {

    const [type, setType] = useState(options[0])
    const handleChangeType = (e) => {
        setType(e)
    }
    const handleAddProperities = () => {
        const proName = document.getElementById('proChildName')?.value
        const proType = document.getElementById('proChildType')?.value

        const newArray = [...properitiesChildList, {
            file: type?.value,
            name: proName
        }]
        setProperitiesChildList(newArray)
        setShow(false)
    }


    return (
        <>
            <Modal size='5xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm thuộc tính
                </Modal.Header>
                <Modal.Body>

                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Tên thuộc tính:</span>
                            <input type="text" id="proChildName" className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">Viết tắt type của thuộc tính:</span>
                            <input type="text" id="proChildType" className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center">
                        <button type="submit" className="py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full outline-0 cursor-pointer" onClick={handleAddProperities}>
                            <span className="text-white">Thêm</span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddProperitiesChild;