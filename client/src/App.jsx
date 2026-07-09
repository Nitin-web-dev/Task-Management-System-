import { useState ,useEffect } from 'react'


function App() {
const [tasks, setTasks] = useState([]);

console.log(tasks);
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

  fetchtask();
},[]);

  return (
    <>
      <h1>Task management system</h1>
      <p>comming soon...</p>
    </>
  )
}


export default App
