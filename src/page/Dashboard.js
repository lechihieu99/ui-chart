import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import StudentBoard from '../components/StudentBoard';
import ModalAddStudent from '../components/Modal/ModalAddStudent';


function Dashboard({ info, setInfo, allInfo, setAllInfo, currentStudent, setCurrentStudent }) {
  const students = useSelector(state => state.students);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    console.log(e.target.value)
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
  return (
    <>
      <div>
        <Header />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            {/* Tool bar */}
            <div className="flex justify-between">
              {/* Search box */}
              <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-2/3'>
                <i class="fa-solid fa-magnifying-glass p-3"></i>
                <input className='bg-white outline-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' onChange={handleSearch} />
              </div>
              {/* Buttons */}
              <div className='flex justify-end'>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 ms-3 text-bold rounded-lg' onClick={() => setShow(true)}>Thêm đối tượng</button>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 ms-3 text-bold rounded-lg'>Export CV</button>
              </div>
            </div>
            {/* Table info */}
            <table id="myTable" className='w-full mt-3 stutable'>
              <thead>
                <tr>
                  <id>Number</id>
                  <td>Name</td>
                  <td>ID</td>
                  <td>Email Address</td>
                  <td>Other</td>
                </tr>
              </thead>
              <tbody>
                {students.map((stu, idx) => (
                  <tr key={stu.id} onMouseOver={() => setCurrentStudent(idx)}>

                    <td className='p-2'>{stu.id}</td>
                    <td className='p-2'>
                      <Link to={`/object-user/${stu.id}`} className='flex items-center'>
                        <img src={stu.url} alt="" className='w-10 h-10 rounded-full object-center object-cover' />
                        <span className='text-light ms-2'>{stu.name}</span>
                      </Link>
                    </td>
                    <td>{stu.idObj ? stu.idObj : "None"}</td>
                    <td>{stu.email}</td>
                    <td>{stu.type ? stu.type : "None"}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          {/* Student Detail board */}
          <div className="col-span-4">
            <StudentBoard id={students[currentStudent].id} name={students[currentStudent].name} url={students[currentStudent].url} classname={students[currentStudent].class} gender={students[currentStudent].gender} />
          </div>
        </div>
      </div>
      {
        show &&
        <ModalAddStudent type='parent' show={true} setShow={setShow} students={students} info={info} setInfo={setInfo} allInfo={allInfo} setAllInfo={setAllInfo} currentStudent={currentStudent} />
      }
    </>
  );
}

export default Dashboard