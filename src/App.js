import './App.css';
import {useState, useEffect} from 'react'
import { Button, FormControl, InputLabel, Input, Toolbar, AppBar, TextField } from '@material-ui/core'
import Todo from './components/Todo'
import db from './firebase'
import firebase from 'firebase'


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [ddl, setDDL] = useState( new Date().toISOString().slice(0, 16))

  const addTodo = (e) => {
    e.preventDefault()
    setTodos([...todos, {todo: input}])
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      ddl: ddl.slice(0, 10) + ' at ' + ddl.slice(11)
    })
    setInput('')
  }

  const handleDateChange = (e) => {
    setDDL (e.target.value)
  }

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, ddl: doc.data().ddl})))
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

        <TextField
          id="datetime-local"
          label="DDL"
          type="datetime-local"
          // defaultValue="2021-01-24T10:30"
          value={ddl}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
      />

        <Button variant="contained" color="primary" type='submit' onClick={addTodo} disabled={!input}>
          Add Todo
        </Button>
      </form>

      <ul className='list_container'>
        {todos.map((todo) => (
            <li key={todo.id} style={{listStyle:'none'}} className='todo'>
              <Todo todo={todo}/>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
