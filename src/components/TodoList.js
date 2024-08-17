import React, { useEffect, useState, useCallback } from 'react';
import { GoPlus, GoTrash } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoModal } from './CreateTodoModal';
import { createPortal } from 'react-dom';

export const TodoList = () => {
  const storedData = localStorage.getItem("todos");

  const [data, setData] = useState((storedData) ? JSON.parse(storedData) : []);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data))
  }, [data])

  const handleCreateTodo = (name, description, date) => {
    setData([
      ...data,
      {
        name: name,
        dueUntil: date,
        id: uuidv4(),
        done: false,
        description: description,
      }])

    console.log(data)
  }


const handleCheckTodo = (index) => {
  const newData = [...data];
  newData[index].done = !data[index].done
  setData(newData);
}


const handleEditName = useCallback((index, name) => {
  setData(prevData => {
    const newData = [...prevData];
    newData[index].name = name;
    return newData;
  });
}, []);

const handleEditDescription = useCallback((index, description) => {
  setData(prevData => {
    const newData = [...prevData];
    newData[index].description = description;
    return newData;
  });
}, []);

const handleDeleteTodo = (index) => {
  const newData1 = data.slice(0, index);
  const newData2 = data.slice(index + 1, data.length);

  setData(newData1.concat(newData2));
}

if (!data) {
  return <div>no items</div>
}

return (
  <div className='w-2/4 flex flex-col'>
    {
      createPortal(
        <CreateTodoModal displayState={displayModal} exitModal={() => setDisplayModal(false)} handleCreateTodo={(name, date, description) => handleCreateTodo(name, date, description)}></CreateTodoModal>,
        document.body
      )}
    <div>Todos:</div>
    {data.map((item, index) => (
      <TodoItem
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
        done={item.done}
        handleCheckTodo={() => handleCheckTodo(index)}
        handleEditName={(name) => handleEditName(index, name)}
        handleEditDescription={(description) => handleEditDescription(index, description)}
        handleDeleteTodo={() => handleDeleteTodo(index)}
      />
    ))}
    <button onClick={() => setDisplayModal(true)} className='PlusButton'>
      Create
      <GoPlus color='white' size={22} />
    </button>
  </div>
);
}

const TodoItem = ({ name, id, description, done, handleCheckTodo, handleEditName, handleEditDescription, handleDeleteTodo }) => {
  return (
    <div className='flex items-center justify-between py-2 px-4 my-2 bg-gray-100 rounded-xl'>
      <div className='flex flex-col flex-grow max-w-full'>
        <input
          value={name}
          className={`outline-none font-semibold bg-transparent ${done ? "line-through text-gray-400" : ""}`}
          onChange={(inp) => handleEditName(inp.target.value)}
        />
        <textarea
          value={description}
          className={`resize-none bg-transparent outline-none overflow-hidden ${done ? "text-gray-400" : ""}`}
          rows={2}
          onChange={(inp) => handleEditDescription(inp.target.value)}
        />
      </div>
      <div className='flex items-center space-x-2 ml-4'>
        <input type='checkbox' checked={done} onChange={handleCheckTodo} />
        <button onClick={handleDeleteTodo} className="h-8 w-8 flex justify-center items-center rounded-full transition duration-300 ease-in-out hover:bg-gray-300">
          <GoTrash color='black' size={22} />
        </button>
      </div>
    </div>
  );
}

