import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import "./App.css"


function TodoItem({ label, delete_todo }) {
    return (
        <div className="todo-item">
            <span className='todo-text'>{label}</span>
            <div className='deletetrash' onClick={delete_todo}>
                <FaRegTrashAlt />
            </div>
        </div>
    );
}





const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        obtenerTareas()
    }, [])

    const createUser = async () => {
        try {
            console.log("creando usuario")
            const raw = JSON.stringify([])
            const url = `https://playground.4geeks.com/apis/fake/todos/user/CatalinaArroyo`;
            const options = {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data);
            if (data.msg) {
                console.log("error")
                obtenerTareas()
            }

        }
        catch (error) {
            console.log(error.message)
        }
    }

    function borrarTodo(index) {
        const newTarea = todos.toSpliced(index, 1)
        setTodos(newTarea);
        actualizarTarea(newTarea)
    }
    function borrarTareas() {
        borrarTarea();
    }
    const obtenerTareas = () => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/CatalinaArroyo")
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data)
                if (data.msg) {
                    // aqui debo llamar a la funcion que crea usuario
                    createUser()
                } else {
                    setTodos(data)
                }

            })
    }
    const actualizarTarea = async (todos) => {
        try {
            const raw = JSON.stringify(todos) // no detecta la variable de todoInput
            const url = `https://playground.4geeks.com/apis/fake/todos/user/CatalinaArroyo`;
            const options = {
                method: 'PUT',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data);
        }
        catch (error) {
            console.log(error.msg)
        }
    }
    const borrarTarea = async () => {
        try {
            const url = `https://playground.4geeks.com/apis/fake/todos/user/CatalinaArroyo`;
            const options = {
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data);
            if (data.msg) {
                // aqui debo llamar a la funcion que crea usuario
                createUser()
            }
        }
        catch (error) {
            console.log(error.msg)
        }
    }

    return (
        <div className='container-fluid'>


            <form onSubmit={(ev) => {
                ev.preventDefault();

                if (todoInput.length > 0) {
                    const todosActual = [...todos, {
                        label: todoInput,
                        done: false
                    }]
                    setTodos(todosActual)

                    console.log(todosActual);
                    actualizarTarea(todosActual);
                    setTodoInput("");
                }
            }}
                className='container flex column align-items-center justify-content-start'>

                <h1>To Do List</h1>
                <input className='form-control form-control-lg'
                    type="text"
                    placeholder='Que necesitas hacer?'
                    aria-label="todo list input field"
                    value={todoInput}
                    onChange={(ev) => setTodoInput(ev.target.value)}
                />
                {todos.map((item, index) =>
                    <TodoItem key={index} label={item.label}

                        delete_todo={() => borrarTodo(index)}
                    />)}


                <small>{todos.length} Deberes restantes</small>
                <small>{todos.length == 0 ? ", agregue una tarea" : ""}</small>
                <div className="row justify-content-end">
                    <button type="button" className="boton col-2" onClick={() => borrarTareas()}>Borrar todas las tareas</button>
                </div>



            </form>
        </div>

    )
}

export default App;