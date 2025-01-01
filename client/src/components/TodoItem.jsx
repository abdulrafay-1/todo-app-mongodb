import React from 'react'

const TodoItem = ({ title, loading, deleteFnc, editFnc, isCompleted, toggleComplete }) => {
    return (
        <div className="flex justify-between items-center text-black bg-white rounded-lg p-4 shadow-md">

            <input type="checkbox" disabled={loading} checked={isCompleted} onChange={toggleComplete} className='w-4 h-4 accent-blue-700 disabled:opacity-75 mr-2 cursor-pointer' id="" />

            <p className={`flex-1 text-md ${isCompleted && "line-through"}`}>{title}</p>
            <div className="flex items-center gap-2">
                <button
                    disabled={loading}
                    onClick={editFnc}
                    className="text-sm disabled:opacity-75 bg-gray-500 hover:bg-gray-600 p-2 rounded-sm text-indigo-600 hover:text-indigo-800"
                >
                    <img src="./edit.svg" width='20px' height='20px' alt="edit" />
                </button>
                <button
                    disabled={loading}
                    onClick={deleteFnc}
                    className="text-sm disabled:opacity-75 bg-red-500 hover:bg-red-600 p-2 rounded-sm text-red-600 hover:text-red-800"
                >
                    <img src="./trash.svg" width='22px' height='22px' alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default TodoItem