"use client"
import React, { FormEvent } from 'react'

import { useState } from 'react'
function Addtodo() {
  const [todo,setTodo] = useState("")
  const handleFormSubmit =(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("")
  }
  return (
    <>
    
    <form onSubmit ={handleFormSubmit}>
        <div className="form-container">
            <div className="text">
                <input type="text" placeholder="Write Name of the Item" value={todo} onChange={(event) =>setTodo(event.target.value)} />
            </div>
            <div className="dropdown">
                <label for="cars">Choose a car:</label>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <button type='submit'>Add</button>
        </div>
    </form>
    </>
    
    
  )
}

export default Addtodo