import React from 'react';
import Header from '../components/Header';
import {Link, NavLink} from "react-router-dom";
import StudentBoard from '../components/StudentBoard';


function Dashboard() {
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
  return (
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
              <button className='btn-shadow-style bg-white border border-1 border-black px-2 py-1 ms-3 text-bold'>Add student</button>
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
              {students.map(stu => (
                <tr key={stu.id}>
                  <td >
                    <Link to="/" className='flex items-center'>
                      <img src={stu.url} alt="" className='w-10 h-10 rounded-full object-center' />
                      <span className='text-light text-black ms-2'>{stu.name}</span>
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
          <StudentBoard id={students[0].id} name={students[0].name} url={students[0].url} classname={students[0].class} gender={students[0].gender} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard