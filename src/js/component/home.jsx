import React, { useState, useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

        // Crear función para crear usuario
        const createUser = async (userName) => {
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (response.ok) {
                    console.log(`Usuario '${userName}' creado`);
                } else {
                    const errorData = await response.json();
                    console.error("Error al crear el usuario:", errorData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        
        // Función para eliminar todas las tareas
        const deleteUser = async (userName) => {
            try {
                const response = await fetch("https://playground.4geeks.com/todo/users/Vadhir", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (response.ok) {
                    console.log(`Usuario '${userName}' eliminado`);
                } else {
                    const errorData = await response.json();
                    console.error("Error al eliminar el usuario:", errorData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Función para elimianr solo una tarea
        const deleteTask = async (taskId) => {
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        
                if (response.ok) {
                    console.log(`Tarea con ID '${taskId}' eliminada`);
                    getTasks();
                } else {
                    const errorData = await response.json();
                    console.error("Error al eliminar la tarea:", errorData);
                }
            } catch (error) {
                console.error(error);
            }
        };           


    const getTasks = () => {
        fetch("https://playground.4geeks.com/todo/users/Vadhir")
        .then(response => response.json())
        .then(data => {
            console.log(data, "Todo marcha bien, creo.");
            if (data && Array.isArray(data.todos)) {
                setTasks(data.todos.map(task => ({ id: task.id, label: task.label })));
            } else {
                console.error("Formato extraño:", data);
            }
        })
        .catch(error => console.error(error));
    }
    
    useEffect(() => {
        const initializeUser = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/todo/users/Vadhir");
                if (response.ok) {
                    console.log("Usuario 'Vadhir' ya existe.");
                    getTasks();
                } else {
                    await createUser("Vadhir");
                    getTasks();
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        initializeUser();
    }, []);
    

    const syncTasksWithServer = (updatedTasks) => {
        fetch("https://playground.4geeks.com/todo/todos/Vadhir", {
            method: "POST",
            body: JSON.stringify(updatedTasks),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => {
              console.log(resp.ok, "True: salió bien o, False: salió mal");
              console.log(resp.status);
              return resp.json();
          })
          .then(data => {
              console.log(data);
              getTasks();
            })
          .catch(error => {
              console.error(error);
          });
    };

    const addTask = (e) => {
        if (e.key !== "Enter" || newTask.trim() === "") return
            const task  = {label : newTask, is_done : false};
            syncTasksWithServer(task);
            setNewTask("");                     
    };

    const deleteAllTasks = async () => {
        await deleteUser("Vadhir");
        setTasks([]);
        await createUser("Vadhir");
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
                   <li key={task.id} className="task-item d-flex justify-content-between align-items-center">
                   {task.label}
                   <button className="btn btn-sm btn-delete" onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                ))}
                <li className="task-item task-count">
                    {tasks.length === 0 
                        ? "Sin tareas pendientes, añade una." 
                        : `${tasks.length} tarea${tasks.length > 1 ? 's' : ''} pendiente${tasks.length > 1 ? 's' : ''}`}
                </li>
             </ul>
            <div className="sheetTwo task-list"/>
            <div className="sheetThree task-list"/>
            <button className="btn btn-danger mt-3" onClick={deleteAllTasks}>Eliminar todas las tareas</button>
        </div>
    );
};

export default Home;
