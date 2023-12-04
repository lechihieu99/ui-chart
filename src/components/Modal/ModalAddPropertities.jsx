import { Modal } from "flowbite-react";
import React from "react";

const ModalAddProperities = ({ show, setShow }) => {
    return (
        <>
            <Modal show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm thuộc tính
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Điểm số:</span>
                            <input type="text" id="point" className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">Tỷ trọng:</span>
                            <input type="text" id="ratio" className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalAddProperities;