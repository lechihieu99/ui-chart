import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentBoard from "../components/StudentBoard";
import { ArrowLeft, Plus, Info, Pencil, LinkSimpleHorizontal, X, CircleNotch } from '@phosphor-icons/react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PDF from '../asset/images/pdf_icon.svg'
import { Draggable } from 'react-drag-and-drop';

import Chart from "../components/Chart";

import JSONPretty from 'react-json-pretty';
import { ToggleSwitch } from "flowbite-react";

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import ModalAddObject from "../components/Modal/ModalAddObject";
import { addDataObject, getAllChildren, getDataObject, getObject, removeDataObject, removeObject } from "../redux/slice/object.slice";

const AddProjectPage = () => {
  const statusAdd = useSelector((state) => state.object.statusAdd)
  const object = useSelector((state) => state.object.object)
  const children = useSelector((state) => state.object.children)
  const dataObject = useSelector((state) => state.object.dataObject)
  const statusEdit = useSelector((state) => state.object.statusEdit)
  const statusData = useSelector((state) => state.object.statusData)
  const statusRemoveData = useSelector((state) => state.object.statusRemoveData)
  const statusRemoveObject = useSelector((state) => state.object.statusRemoveObject)

  const navigate = useNavigate();
  const location = useLocation()
  const [show, setShow] = useState(false)

  const [indexItem, setIndexItem] = useState()
  const [info, setInfo] = useState()
  const [path, setPath] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    setPath(pathnameSegments[1])
    dispatch(getObject({ id: pathnameSegments[1] }))
  }, [statusEdit])

  useEffect(() => {
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    setPath(pathnameSegments[1])
    dispatch(getObject({ id: pathnameSegments[1] }))
    dispatch(getAllChildren({ parent: pathnameSegments[1] }))
    dispatch(getDataObject({ parentId: pathnameSegments[1] }))
  }, [location.pathname])

  // useEffect(() => {
  //   console.log(dataObject)
  // }, [dataObject?.data])

  useEffect(() => {
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    dispatch(getDataObject({ parentId: pathnameSegments[1] }))
  }, [statusData, statusRemoveData])

  useEffect(() => {
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    setPath(pathnameSegments[1])
    dispatch(getAllChildren({ parent: pathnameSegments[1] }))
  }, [statusAdd, statusRemoveObject])

  const changeFile = async (e) => {
    const files = document.getElementById('file').files;
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')

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

        arr?.map((item) => {
          dispatch(addDataObject({
            parentId: pathnameSegments[1],
            name: item.item,
            type: item.type,
            dataFile: item.data
          }))
        })
      }

      reader.readAsDataURL(file);
    })
  }

  const handleDelete = (id) => {
    dispatch(removeObject({
      id: id
    }))
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    dispatch(getObject({ id: pathnameSegments[1] }))
  }

  const handleSelectItem = (item, idx) => {
    setIndexItem(idx)
    setInfo(item)
  }

  const handleDeleteImage = (item) => {
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')

    dispatch(removeDataObject({
      parentId: pathnameSegments[1],
      dataFile: item.data
    }))
    dispatch(getObject({ id: pathnameSegments[1] }))
    dispatch(getDataObject({ parentId: pathnameSegments[1] }))
  }
  return (
    <>
      <div className="w-full md:h-screen overflow-y-auto">
        <Header />
        <div className="grid grid-cols-12 gap-4">
          <div onClick={() => navigate(-1)} className="flex justify-center items-center cursor-pointer">
            <ArrowLeft size={24} color='white' weight='bold' />
          </div>
          <div className="col-span-11 md:col-span-8">
            {/* Tool bar */}
            <div className="flex justify-between">
              {/* Search box */}
              <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-full md:w-2/3'>
                <i class="fa-solid fa-magnifying-glass p-3"></i>
                <input className='bg-white outline-0 border-0 focus:ring-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
              </div>
            </div>
          </div>
        </div>
        {/* Student Detail board */}
        <div className="flex flex-col md:flex-row w-full pt-4 pb-4">
          <div className="w-full md:w-1/4 h-full">
            <StudentBoard
              id={object?.data[0]?.id}
              name={object?.data[0]?.name}
              url={object?.data[0]?.url}
              classname={object?.data[0]?.class}
              gender={object?.data[0]?.gender}
              pointText={object?.data[0]?.pointText}
              ratioText={object?.data[0]?.ratioText}
              point={object?.data[0]?.point}
              ratio={object?.data[0]?.ratio}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </div>
          <div className="w-full mt-2 md:mt-0 md:w-3/4">
            <div className="w-full flex justify-between items-center">
              <span className=" font-semibold">Thêm đối tượng cho <span className="text-[#7D7D7D]">{object?.data[0]?.id} - {object?.data[0]?.name}</span></span>
              {/* <div className={`py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full mr-2`}>
                <span className="text-white text-center">Lưu thay đổi</span>
              </div> */}
            </div>
            <div className="w-full mt-2 p-4 bg-[rgba(255,255,255,0.5)] rounded-xl">
              {children ? children?.data?.map((item, idx) => (
                <Draggable type="components" data={item.id}>
                  <div key={idx} className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex flex-col md:flex-row justify-between md:items-center rounded-xl mb-2 hover:text-black ${indexItem === idx ? "text-black" : "text-gray-400"}`}>
                    <div className="cursor-pointer md:w-[40%]" onClick={() => handleSelectItem(item, idx)}>{idx + 1}. {item.name}</div>
                    <div className="md:w-[20%]">Điểm số: {item.point} điểm</div>
                    <div className="md:w-[15%]">Tỷ trọng: {item.ratio} %</div>
                    <div className="flex md:items-center justify-end md:justify-center gap-2">
                      <Link to={`/object/${item.id}`}>
                        <Pencil size={20} color='black' className="cursor-pointer" />
                      </Link>
                      {/* <LinkSimpleHorizontal size={20} color={`${item.data.length > 0 ? "black" : "gray"}`} /> */}
                      <X size={20} color='black' className="cursor-pointer" onClick={() => handleDelete(item.id)} />
                    </div>
                  </div>
                </Draggable>
              )) : (
                <></>
              )}
              <div className="w-full bg-[rgba(177,177,177,0.4)] flex justify-center items-center cursor-pointer rounded-full pt-[3px] pb-[3px]"
                onClick={() => setShow(true)}
              >
                <Plus size={24} color='white' />
              </div>
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

              {/* Biểu đồ Chart*/}
              <span>Data dữ liệu biểu đồ của đối tượng:</span>
              <div className={`w-full overflow-hidden bg-white py-16 pl-16 my-2 rounded-xl flex justify-start items-center`}>
                {children?.data?.length > 0 && (
                  <span>
                    <Chart />
                  </span>
                )}

              </div>
              {/* Tài sản dữ liệu */}
              <span>Tài sản/dữ liệu của đối tượng: </span>
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

                {dataObject?.data?.length > 0 ? (
                  <>
                    <div className="w-full h-full flex flex-wrap p-8 gap-4 md:gap-8">
                      {dataObject && dataObject?.data?.map((item, idx) => (
                        <div className="relative">
                          <PhotoProvider>
                            <PhotoView src={item.data} >
                              <img id="preview" key={idx} src={item.type === 'application/pdf' ? PDF : item.data} className="h-32 w-32 object-fit rounded-lg shadow-xl" />
                            </PhotoView>
                          </PhotoProvider>
                          <div className="p-[3px] rounded-full flex justify-center items-center bg-gray-700 absolute -top-2 -right-2 cursor-pointer" onClick={() => handleDeleteImage(item)}>
                            <X size={12} color='white' />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="file" className="h-32 w-32 flex justify-center items-center bg-yellow-200 cursor-pointer">
                        <Plus size={20} color="black" />
                      </label>

                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor="file" className="w-full h-full flex pt-8 pb-8 justify-center items-center cursor-pointer">
                      <Plus size={20} color="black" />
                    </label>
                  </>
                )}

              </div>
              {/*  */}
              <input type="file" id="file" name="file" multiple className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input>

              {/* <input type="file" id="file" name="file" multiple className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input> */}
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
              {/* Danh sách dữ liệu */}
              <span>Data dữ liệu theo dạng JSON:</span>
              {/* <div className="my-2 flex items-center gap-4">
                <span>Hiện JSON tổng: </span>
                <ToggleSwitch checked={isSwitch} onChange={setIsSwitch} />
              </div> */}

              <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center overflow-x-auto">
                <JSONPretty id="json-pretty" data={{ ...object?.data[0], data: dataObject?.data[0] }}></JSONPretty>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddObject parent={path} show={show} setShow={setShow} />
    </>
  )
}

export default AddProjectPage;