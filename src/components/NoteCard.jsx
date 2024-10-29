import React from 'react'

const NoteCard = () => {
  return (
    <div className='bg-yellow-400 w-96 p-7 rounded-2xl shadow-md cursor-pointer duration-700 hover:scale-105 shadow-yellow-400'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, corporis, quibusdam eos quis explicabo corrupti assumenda a optio qui error obcaecati ratione veniam, ullam ipsum voluptate suscipit id quam. Fuga, odio incidunt.
        <div className="button-divs flex gap-3">

        <button className='bg-black p-2 rounded-xl text-green-600 font-bold border-2 border-green-400'>Change</button>
        <button className='bg-black p-2 rounded-xl text-red-600 font-bold border-2 border-red-400'>Delete</button>
      
        </div>
    </div>
  )
}

export default NoteCard