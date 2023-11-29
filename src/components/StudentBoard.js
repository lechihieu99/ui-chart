import React from 'react'

function StudentBoard({ id, url, name, classname, gender }) {
    return (
        <div className='flex flex-col items-center space-y-3 w-5/6 h-full mx-auto shadow-style p-6 bg-white'>
            <span>{id}</span>
            <img src={url} alt="" className='w-40 h-40 rounded-full object-center object-cover' />
            <span className="text-bold text-center text-xl">{name}</span>
            <span className='color-gray-400 text-center'>{classname}</span>
            <div>
                <strong>About</strong>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eveniet, enim delectus similique totam error cumque quas possimus numquam ea illum obcaecati facilis aut expedita quaerat illo. Sed, unde dolore.</p>
            </div>
            <div className='grid grid-cols-12'>
                <div className="col-span-6">
                    <strong>Age</strong>
                    <p>17</p>
                </div>
                <div className="col-span-6">
                    <strong>Gender</strong>
                    <p>{gender}</p>
                </div>

            </div>

        </div>
    )
}

export default StudentBoard