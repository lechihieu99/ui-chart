import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import StudentBoard from '../components/StudentBoard';
import { getAllObject, getObject, removeObject } from '../redux/slice/object.slice';
import ModalAddObject from '../components/Modal/ModalAddObject';
import { Pencil, X } from '@phosphor-icons/react';


function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation()
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(0)

  const allObject = useSelector((state) => state.object.allObject)

  const statusAdd = useSelector((state) => state.object.statusAdd)
  const statusRemoveObject = useSelector((state) => state.object.statusRemoveObject)

  useEffect(() => {
    dispatch(getAllObject())
  }, [statusAdd, statusRemoveObject])

  // useEffect(() => {
  //   console.log(allObject?.data)
  // }, [allObject])

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    // Get the table and its rows
    const table = document.getElementById('myTable');
    const rows = table.getElementsByTagName('tr');

    // Loop through the rows and hide/show based on the search value
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('td');
      let rowContainsSearchValue = false;

      // Loop through the cells in the current row
      for (let j = 0; j < cells.length; j++) {
        const cellText = cells[j].textContent.toLowerCase();

        // Check if the cell text contains the search value
        if (cellText.includes(searchValue)) {
          rowContainsSearchValue = true;
          break;
        }
      }

      // Hide/show the row based on the search value
      row.style.display = rowContainsSearchValue ? '' : 'none';
    }
  }

  const handleDelete = (id) => {
    dispatch(removeObject({
      id: id
    }))
    const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '')
    dispatch(getObject({ id: pathnameSegments[1] }))
  }
  return (
    <>
      <div className='p-2'>
        <Header />
        <div className="md:grid md:grid-cols-12 md:gap-4">
          <div className="md:col-span-8">
            {/* Tool bar */}
            <div className="flex flex-col md:flex-row justify-between">
              {/* Search box */}
              <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-full md:w-2/3'>
                <i class="fa-solid fa-magnifying-glass p-3"></i>
                <input className='bg-white outline-0 border-0 focus:ring-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' onChange={handleSearch} />
              </div>
              {/* Buttons */}
              <div className='flex justify-center items-center mt-2 md:mt-0 gap-2 md:gap-0 md:justify-end'>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 md:ms-3 text-bold rounded-lg w-1/2 md:w-fit' onClick={() => setShow(true)}>Thêm đối tượng</button>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 md:ms-3 text-bold rounded-lg w-1/2 md:w-fit'>Export CV</button>
              </div>
            </div>
            {/* Table info */}
            <div className='w-full max-h-[61vh] md:max-h-full mt-3 md:mt-0 overflow-y-auto md:overflow-hidden md:h-fit'>
              <table id="myTable" className='w-full md:mt-3 stutable'>
                <thead className="sticky top-0 bg-[#c1c1c1] ">
                  <tr>
                    <id>{window.innerWidth > 768 ? 'Number' : 'N'}</id>
                    <td>Name</td>
                    <td>ID</td>
                    <td>{window.innerWidth > 768 ? 'Email Address' : 'Email'}</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {allObject?.data?.map((item, idx) => (
                    <tr key={item.id} onMouseEnter={() => setCurrent(idx)}>

                      <td className='p-2'>{idx + 1}</td>
                      <td className='p-2'>
                        <Link to={`/object/${item.id}`} className='flex items-center'>

                          <img src={item.url} alt="" className='w-10 h-10 rounded-full object-center object-cover' />

                          <span className='text-light ms-2 w-52'>{item.name}</span>
                        </Link>
                      </td>
                      <td>{item.id ? item.id : "None"}</td>
                      <td>{item.email}</td>
                      <td><div className="flex md:items-center justify-end md:justify-center gap-2">
                        <Link to={`/object/${item.id}`}>
                          <Pencil size={20} color='black' className="cursor-pointer" />
                        </Link>
                        {/* <LinkSimpleHorizontal size={20} color={`${item.data.length > 0 ? "black" : "gray"}`} /> */}
                        <X size={20} color='black' className="cursor-pointer" onClick={() => handleDelete(item.id)} />
                      </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </div>
          {/* Student Detail board */}
          <div className="w-full h-[15vh] overflow-hidden mt-2 md:h-full md:col-span-4">
            <StudentBoard
              page='dashboard'
              id={allObject?.data[current]?.id}
              name={allObject?.data[current]?.name}
              url={allObject?.data[current]?.url}
              classname={allObject?.data[current]?.class}
              gender={allObject?.data[current]?.gender}
              pointText={allObject?.data[current]?.pointText}
              ratioText={allObject?.data[current]?.ratioText}
              point={allObject?.data[current]?.point}
              ratio={allObject?.data[current]?.ratio}
            />
          </div>
        </div>
      </div>
      {
        show &&
        <ModalAddObject parent='' show={true} setShow={setShow} />
      }
    </>
  );
}

export default Dashboard