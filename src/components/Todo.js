import {List, ListItem, ListItemText, Modal, makeStyles, Button, Divider, Slide} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react'
import db from '../firebase'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        width: '11em',
        height: '4em',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
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
            className='centered_modal'
        >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <div className={classes.paper}>
                <input value={input} onChange={e => setInput(e.target.value)}/>
                <Button onClick={updateTodo}>Save</Button>
            </div>
        </Slide>
        </Modal>
        
        <List className='todo_list'>
            <ListItem>
                <ListItemText primary={todo.todo} secondary={`⏰ Deadline: ${todo.ddl}`} />
            </ListItem>
            <p className='mark_done'>Mark as done</p>
            <EditIcon className='edit_icon' onClick={() => toogleOpenState(open)}/>
            <HighlightOffIcon className='delete_icon' onClick={deleteTodo} />
        </List>
        <Divider/>
   
    </>
    )
}

export default Todo
