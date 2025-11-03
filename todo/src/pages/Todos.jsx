import './Todos.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Row from '../components/Row'
import Aurora from '../components/Aurora';
import { useUser } from '../context/useUser'

const url = "http://localhost:3001"


export default function Todos() {

    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])
    const { user } = useUser()

     useEffect(() => {
        const headers = {headers: {Authorization: user.token}}
        axios.get(url, headers)
            .then(response => {
                setTasks(response.data)
        })
            .catch(error => {
                alert(error.response.data ? error.response.data.message : error)
        })
        }, [user.token])

    const addTask = () => {
        const headers = {headers: {Authorization: user.token}}
        const newTask = { description: task }

        axios.post(url + "/create", {task: newTask}, headers)
            .then(response => {
                setTasks([...tasks,response.data])
                setTask('')
        })
            .catch(error => {
                alert(error.response ? error.response.data.error.message : error)
        })

    }

    const deleteTask = (deleted) => {
        const headers = {headers: {Authorization: user.token}}
        axios.delete(url + "/delete/" + deleted, headers)
            .then(response => {
                setTasks(tasks.filter(item => item.id !== deleted))
        })
            .catch(error => {
                alert(error.response ? error.response.data.error.message : error)
        })
    }
    
	return (
        <>
        <Aurora
				colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
				blend={0.5}
				amplitude={1.0}
				speed={0.5}
			/>
        <div className="todos-container">
            <div className="cards">
                <div className="card">
                    <h1>Todos</h1>
                    <form>
                        <input
                        placeholder="Add new task"
                        value = {task}
                        onChange = {(e) => setTask(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter"){
                                e.preventDefault()
                                addTask()
                            }
                        }}
                        />
                    </form>
                    <ul>
                        {
                        tasks.map(item => (
                            <Row item={item} key = {item.id} deleteTask={deleteTask}/>
                        ))
                    }
                    </ul>
                </div>
                    <div className="card"></div>
                </div>
            </div>
        </>
	);
}
