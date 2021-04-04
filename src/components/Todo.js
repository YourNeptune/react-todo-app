import {List, ListItem, ListItemText, ListItemAvatar, Modal, makeStyles, Button, Divider} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react'
import '../css/Todo.css'
import db from '../firebase'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const Todo = ({todo}) => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState(todo.todo)
    const classes = useStyles()

    const deleteTodo = () => {
        db.collection('todos').doc(todo.id).delete()
    }

    const toogleOpenState = (open) => {
        setOpen(!open)
    }

    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
            todo: input
        }, {merge: true})

        setOpen(false)
    }

    return (
    <>
        <Modal
            open={open}
            onClose={() => toogleOpenState(open)}
        >
            <div className={classes.paper}>
                <input value={input} onChange={e => setInput(e.target.value)}/>
                <Button onClick={updateTodo}>Save</Button>
            </div>
        </Modal>
        <div className='list_container'>
            <List className='todo_list'>
                <ListItem>
                    <ListItemText primary={todo.todo} secondary='Deadline ⏰' />
                </ListItem>
                <EditIcon onClick={() => toogleOpenState(open)}/>
                <HighlightOffIcon onClick={deleteTodo} />
            </List>
            <Divider/>
        </div>
    </>
    )
}

export default Todo
