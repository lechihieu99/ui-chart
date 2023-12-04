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
                <input className='bg-white outline-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
              </div>
              {/* Buttons */}
              <div className='flex justify-end'>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 ms-3 text-bold' onClick={() => setShow(true)}>Add student</button>
                <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 ms-3 text-bold'>Export CV</button>
              </div>
            </div>
            {/* Table info */}
            <table className='w-full mt-3 stutable'>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Student ID</td>
                  <td>Email Address</td>
                  <td>Class</td>
                  <td>Gender</td>
                </tr>
              </thead>
              <tbody>
                {students.map((stu, idx) => (
                  <tr key={stu.id} onMouseOver={() => setCurrentStudent(idx)}>
                    <td>
                      <Link to={`/object-user/${stu.id}`} className='flex items-center'>
                        <img src={stu.url} alt="" className='w-10 h-10 rounded-full object-center object-cover' />
                        <span className='text-light ms-2'>{stu.name}</span>
                      </Link>
                    </td>
                    <td>{stu.id}</td>
                    <td>{stu.email}</td>
                    <td>{stu.class}</td>
                    <td>{stu.gender}</td>
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
        <ModalAddStudent show={true} setShow={setShow} students={students} info={info} setInfo={setInfo} allInfo={allInfo} setAllInfo={setAllInfo} />
      }
    </>
  );
}

export default Dashboard