import React, { useEffect, useState } from 'react'
import { GoPlus, GoTrash } from "react-icons/go";


export const TodoList = () => {
  const storedData = JSON.parse(localStorage.getItem("items"))

  const [data, setData] = useState((storedData) ? storedData : []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data))
  }, [data])

  const handleCreateTodo = () => {
    setData([
      ...data,
      { name: `New Todo`, done: false }
    ]);
  }

  const handleCheckTodo = (index) => {
    const newData = [...data];
    newData[index].done = !data[index].done
    setData(newData);
  }

  const handleEditTodo = (index, name, done) => {

    const newData = [...data];
    newData[index].name = name;
    setData(newData)
  }

  const handleDeleteTodo = (index) => {
    console.log("asdf")
    const newData = [...data];
    delete newData[index]

    setData(newData)
  }

  return (
    <>
      <div>Todos:</div>
      {
        data.map((item, index) => {
          if (item) {
            return ( 
              <TodoItem 
                key={index} 
                id={index} 
                name={item.name} 
                done={item.done} 
                handleCheckTodo={() => handleCheckTodo(index)} 
                handleEditTodo={(name) => handleEditTodo(index, name)}
                handleDeleteTodo={() => handleDeleteTodo(index)}
              >
                
              </TodoItem>)
          }
        })
      }
      <button onClick={handleCreateTodo} className='PlusButton'>
        Create
        <GoPlus color='white' size={22}/>
      </button>

    </>
  )
}

const TodoItem = ({ name, done, handleCheckTodo, handleEditTodo, handleDeleteTodo}) => {
  return (
    <div className='TodoItem' >
      {
        (!done) ? (
          <input value={name} className="TodoText" onChange={(inp) => handleEditTodo(inp.target.value)} />
        ) : (
          <input defaultValue={name} className='TodoDone TodoText' />
        )
      }
      <input type='checkbox' checked={done} onChange={handleCheckTodo}></input>
      <button onClick={() => handleDeleteTodo()} className='DeleteButton'><GoTrash color='black' size={22}/></button>
    </div>
  );
}


