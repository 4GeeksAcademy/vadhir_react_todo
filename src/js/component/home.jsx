import React, { useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    };

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">Cosas por hacer</h1>
            <ul className="task-list mt-3">
                <li className="task-item">
                    <input 
                        type="text" 
                        className="form-control task-input" 
                        placeholder="¿Qué necesito hacer?"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={addTask}
                    />
                </li>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item d-flex justify-content-between align-items-center">
                        {task}
                        <button className="btn btn-sm btn-delete" onClick={() => deleteTask(index)}>X</button>
                    </li>
                ))}
                <li className="task-item task-count">{tasks.length} tareas pendientes</li>
            </ul>
        </div>
    );
};

export default Home;




