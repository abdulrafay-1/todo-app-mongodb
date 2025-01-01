// import React, { useEffect, useRef, useState } from 'react'
// import TodoItem from './components/TodoItem'
// import axios from 'axios';

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [editableTodo, setEditableTodo] = useState();

//   const input = useRef()

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/v1/todo").then(({ data }) => {
//       console.log(data.data)
//       setTodos([...data.data])
//     })
//   }, [])

//   const addTodo = (e) => {
//     e.preventDefault()
//     if (!input.current.value.trim()) return;

//     if (editableTodo) {
//       axios.put(`http://localhost:3000/api/v1/todo/${editableTodo._id}`, {
//         title: input.current.value
//       })
//         .then(({ data }) => {
//           console.log(data)
//           const index = todos.findIndex(item => item._id === editableTodo._id);
//           todos[index].title = input.current.value
//           setTodos([...todos])
//           setEditableTodo(null)
//           input.current.value = ''
//         })
//         .catch(err => console.log(err))

//       return
//     }

//     axios.post("http://localhost:3000/api/v1/todo", {
//       title: input.current.value
//     }).then(({ data }) => {
//       console.log(data)
//       setTodos([data.todo, ...todos])
//     })
//       .catch(err => console.log(err))
//     input.current.value = ''
//   }

//   const deleteTodo = (id) => {
//     console.log(id)
//     axios.delete(`http://localhost:3000/api/v1/todo/${id}`)
//       .then(({ data }) => {
//         console.log(data)
//         const deleted = todos.filter(item => item._id != id);
//         setTodos([...deleted])
//       })
//       .catch(err => console.log(err))
//   }
//   const editTodo = (todo) => {
//     console.log(todo)
//     setEditableTodo(todo)
//     input.current.value = todo.title
//     input.current.select()
//   }

//   return (
//     <div>
//       <h1 className='text-center mb-10'>MY MERN Task APP</h1>
//       <div className="my-5">
//         <form onSubmit={addTodo}>
//           <input type="text" className='border' required ref={input} />
//           <button type="submit">submit</button>
//         </form>
//       </div>
//       <div>
//         {todos.map(item => (
//           <TodoItem
//             key={item._id}
//             title={item.title}
//             deletefnc={() => deleteTodo(item._id)}
//             editFnc={() => editTodo(item)} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./components/TodoItem";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editableTodo, setEditableTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const input = useRef();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(API_URL);
        setTodos(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.current.value.trim()) return;

    setLoading(true);
    try {
      if (editableTodo) {
        await axios.put(`${API_URL}/${editableTodo._id}`, {
          title: input.current.value,
        });

        todos[editableTodo.index].title = input.current.value
        setTodos([...todos])

        setEditableTodo(null);
      } else {
        const { data } = await axios.post(API_URL, { title: input.current.value });
        setTodos((prevTodos) => [...prevTodos, data.todo]);
      }
      input.current.value = "";
    } catch (err) {
      console.error(err);
      setError("Failed to add/update todo");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    } finally {
      setLoading(false);
    }
  };

  const editTodo = (todo, index) => {
    setEditableTodo({ ...todo, index });
    input.current.value = todo.title;
    input.current.focus();
    input.current.select();
  };

  const toggleCompleted = async (todo, index) => {
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/toggletodo/${todo._id}`, {
        isCompleted: todo.isCompleted,
      })
      todos[index] = data;
      setTodos([...todos])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">TaskFlow</h1>
        <p className="mt-2 text-lg">Effortless Task Management</p>
      </header>

      <main className="container mx-auto px-4">
        <div className="my-5 max-w-xl mx-auto">
          <form
            onSubmit={addTodo}
            className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-md"
          >
            <input
              type="text"
              ref={input}
              placeholder="Enter a task"
              className="flex-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-2 disabled:opacity-75 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {editableTodo ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {error && (
          <p className="text-center text-red-300 mt-4">
            {error}
          </p>
        )}

        <div className="mt-8 max-w-xl mx-auto space-y-4">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <TodoItem
                title={todo.title}
                loading={loading}
                key={todo._id}
                deleteFnc={() => deleteTodo(todo._id)}
                editFnc={() => editTodo(todo, index)}
                isCompleted={todo.isCompleted}
                toggleComplete={() => toggleCompleted(todo, index)}
              />
            ))
          ) : (
            <p className="text-center text-gray-200">No tasks to display</p>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
