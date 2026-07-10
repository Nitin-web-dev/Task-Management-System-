import { useState ,useEffect } from 'react'
import Login from './pages/Login';


function App() {
const [tasks, setTasks] = useState([]);

// console.log(tasks);
useEffect(() => {
  async function fetchtask() {
    try {
      const response = await fetch ("http://localhost:5000/");
      const data = await response.json();
      setTasks(data);
    }catch(error){
      console.log(error);
    }
  }

  // fetchtask();
},[]);

  return (
    <>
      <Login/>
    </>
  )
}


export default App
