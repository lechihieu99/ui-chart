import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentBoard from "../components/StudentBoard";
import { ArrowLeft, Plus, Info, Pencil, LinkSimpleHorizontal, X } from '@phosphor-icons/react'
import ModalAddObject from "../components/Modal/ModalAddObject";

import Image1 from '../asset/images/image.jpg'
import ModalInformation from "../components/Modal/ModalInformation";
const students = [
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
];

const objectUser = [
  {
    id: '1',
    name: 'Giáo trình ABC',
    point: 100,
    ratio: '100%',
    reviewPer: 'Nguyễn Văn A',
    reviewId: 'D5PP6612',
    reliability: 5,
    result: 'Tốt',
    data: [
      {
        id: 1245,
        name: 'Image 1',
        url: Image1
      }
    ]
  }
]

const AddProjectPage = () => {
  const [show, setShow] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const [info, setInfo] = useState()

  const showModalInfo = (item) => {
    setInfo(item)
    setShowInfo(true)
  }

  const changeFile = (e) => {
    console.log(e)
  }
  return (
    <>
      <div className="w-full h-screen">
        <Header />
        <div className="grid grid-cols-12 gap-4">
          <div className="flex justify-center items-center cursor-pointer">
            <ArrowLeft size={24} color='white' weight='bold' />
          </div>
          <div className="col-span-8">
            {/* Tool bar */}
            <div className="flex justify-between">
              {/* Search box */}
              <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-2/3'>
                <i class="fa-solid fa-magnifying-glass p-3"></i>
                <input className='bg-white outline-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
              </div>
            </div>
          </div>
        </div>
        {/* Student Detail board */}
        <div className="flex w-full pt-4 pb-4" style={{ height: 'calc(100% - 80px)' }}>
          <div className="w-1/4 h-full">
            <StudentBoard id={students[0].id} name={students[0].name} url={students[0].url} classname={students[0].class} gender={students[0].gender} />
          </div>
          <div className="w-3/4">
            <span className=" font-semibold">Thêm đối tượng cho <span className="text-[#7D7D7D]">{students[0].id} - {students[0].name}</span></span>
            <div className="w-full mt-2 p-4 bg-[rgba(255,255,255,0.5)] rounded-xl">
              {objectUser.map((item, idx) => (
                <div className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex justify-between items-center rounded-xl mb-2 hover:border-1 hover:border-black ${info && "border-1 border-black"}`}>
                  <div className="cursor-pointer" onClick={() => setInfo(item)}>{item.id}. {item.name}</div>
                  <div>Điểm số: {item.point} điểm</div>
                  <div>Tỷ trọng: {item.ratio}</div>
                  <div className="flex items-center justify-center gap-2">
                    <Info size={20} color='black' className="cursor-pointer" onClick={() => showModalInfo(item)} />
                    <Pencil size={20} color='black' className="cursor-pointer" />
                    <LinkSimpleHorizontal size={20} color='black' className="cursor-pointer" />
                    <X size={20} color='black' className="cursor-pointer" />
                  </div>
                </div>
              ))}
              <div className="w-full bg-[rgba(177,177,177,0.4)] flex justify-center items-center cursor-pointer rounded-full pt-[3px] pb-[3px]"
                onClick={() => setShow(true)}
              >
                <Plus size={24} color='white' />
              </div>
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
              <span>Tài sản/dữ liệu của đối tượng</span>
              <label for="file" className="w-full bg-[rgba(255,255,255,0.4)] mt-2 pt-8 pb-8 rounded-xl flex justify-center items-center cursor-pointer">
                {info ? (
                  <>
                    <Plus size={20} color="black" />
                  </>
                ) : (
                  <span className="text-gray-400">Vui lòng thêm đối tượng để thực hiện bổ sung tài sản/dữ liệu của đối tượng</span>

                )}
              </label>
              <input type="file" id="file" name="file" className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input>
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
              <span>Data dữ liệu theo dạng JSON:</span>
              <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center">
                <span>{`{
                      “547030” : {}
                  }`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddObject show={show} setShow={setShow} />
      <ModalInformation data={info} show={showInfo} setShow={setShowInfo} />
    </>
  )
}

export default AddProjectPage;