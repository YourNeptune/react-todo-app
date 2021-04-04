import './App.css';
import {useState, useEffect} from 'react'
import { Button, FormControl, InputLabel, Input, Toolbar, AppBar } from '@material-ui/core'
import Todo from './components/Todo'
import db from './firebase'
import firebase from 'firebase'


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    setTodos([...todos, input])
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  },[])

  return (
    <div className="App">
      <div className='top-bar'>
        <AppBar position="fixed">
          <Toolbar>
            <h1 className='bar-title'>Todo App</h1>
          </Toolbar>
       </AppBar>
      </div>
 
      <form className='form'>
        <FormControl>
          <InputLabel>Add todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)}/>
        </FormControl>

        <Button variant="contained" color="primary" type='submit' onClick={addTodo} disabled={!input}>
          Add Todo
        </Button>
      </form>

      <div className='list_container'>
        {todos.map((todo) => (
            <Todo todo={todo}/>
        ))}
      </div>
    </div>
  );
}

export default App;
