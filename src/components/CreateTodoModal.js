import React, { useEffect, useState } from 'react'
import { GoX, GoPlus, GoStopwatch } from 'react-icons/go'

export const CreateTodoModal = ({ displayState, exitModal, handleCreateTodo }) => {
  const getDate = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    setDate(getDate)
    setName("")
    setDescription("")
  }, [displayState])

  const [date, setDate] = useState(getDate);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (displayState === false) return null

  return (
    <>
      <div className='ModalOverlay' onClick={exitModal}></div>
      <div className='ModalWindow'>
        <div className='flex-row flex justify-between items-center'>
          <div className='text-xl font-semibold items-center'>Create a todo</div>
          <button onClick={exitModal} className='bg-gray-100 rounded-full p-2 cursor-default hover:bg-gray-300 transition duration-300 ease-in-out '><GoX></GoX></button>
        </div>

        <div className='my-4'>
          <div className='flex my-4 whitespace-nowrap items-center justify-between'>
            <input
              placeholder='Todo name'
              className='outline-none bg-gray-100 w-2/4 px-4 py-3 mr-4 rounded-xl'
              value={name}
              onChange={(inp) => setName(inp.target.value)}

            />
            <div className='flex flex-row items-center font-medium'>
              {/* <GoStopwatch className='mr-2' size={24}></GoStopwatch> */}
              <div className='text-2xl mr-1'>⏱️</div>
              
              Due until:
              <input
                type='date'
                className='outline-none rounded-xl px-4 font-bold'
                value={date}
                onChange={(inp) => setDate(inp.target.value)}
              />
            </div>
          </div>
          <textarea
            value={description}
            onChange={(inp) => setDescription(inp.target.value)}
            placeholder='Description...'
            className='resize-none bg-gray-100 overflow-hidden w-full  px-4 py-3 outline-none rounded-xl '
          />

          <button
            onClick={() => handleCreateTodo(name, description, date)}
            className='PlusButton'
          >
            Create
            <GoPlus color='white' size={22} />
          </button>

        </div>
      </div>
    </>
  )
}
