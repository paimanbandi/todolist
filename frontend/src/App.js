/**
 * @author paiman <hub@paiman.id>
 *
 */

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { apiHost } from './global';
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        todo: '',
        todoAdd: '',
        items: [],
        message: '',
        isEdited: false,
        selected: null
    }

    this.displayTodos = this.displayTodos.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleSubmitToAdd = this.handleSubmitToAdd.bind(this)
    this.handleSubmitToEdit = this.handleSubmitToEdit.bind(this)
    this.openEditTodo = this.openEditTodo.bind(this)
    this.handleChangeToAdd = this.handleChangeToAdd.bind(this)
    this.handleChangeToEdit = this.handleChangeToEdit.bind(this)
}

componentDidMount() {
    this.displayTodos()
}

async displayTodos() {
    const method = 'get'
    const url = apiHost + 'display-todos'
    const crossdomain = true
    const { todo } = this.state

    axios({
        method,
        url,
        crossdomain,
        data: { todo },
    }).then(response => {
        console.log(response)
        this.setState({ message: response.data.message });
        if (response.status === 200) {
            this.setState({ items: response.data.data || [] })
        }
    }).catch(function (error) {
        console.log(error)
    });
}

async addTodo() {
    const method = 'post'
    const url = apiHost + 'add-todo'
    const crossdomain = true
    const todo = this.state.todoAdd

    if (todo === '') {
        this.setState({ message: "Todo can't be empty!" });
    } else {
        axios({
            method,
            url,
            crossdomain,
            data: { todo },
        }).then(response => {
            this.setState({ todoAdd: '', message: response.data.message });
            if (response.status === 201) {
                this.displayTodos()
            }
        })
            .catch(function (error) {
                console.log(error)
            });
    }
}

handleSubmitToAdd = (event) => {
    event.preventDefault()
    this.addTodo()
}

handleSubmitToEdit = (event) => {
    event.preventDefault()
    this.setState({ id: document.getElementById("id").value }, () => {
        this.editTodo()
    })
}

handleChangeToEdit = (event) => {
    this.setState({ [event.target.name]: event.target.name === 'id' ? parseInt(event.target.value) : event.target.value })
}

handleChangeToAdd = (event) => {
    this.setState({ todoAdd: event.target.value })
}

openEditTodo = (selected, todo) => {
    this.setState({ selected, todo })
}

async editTodo() {
    const method = 'put'
    const url = apiHost + 'edit-todo'
    const crossdomain = true
    const { id, todo } = this.state

    if (todo === '') {
        this.setState({ message: "Todo can't be empty!" });
    } else {
        axios({
            method,
            url,
            crossdomain,
            data: { id, todo },
        }).then(response => {
            this.setState({ todo: '', message: response.data.message });
            if (response.status === 200) {
                this.setState({ selected: null }, () => {
                    this.displayTodos()
                })
            }
        })
            .catch(function (error) {
                console.log(error)
            });
    }
}

async deleteTodo(id) {
    const method = 'delete'
    const url = apiHost + 'delete-todo'
    const crossdomain = true

    if (typeof id !== 'number' && (id % 1) !== 0) {
        this.setState({ message: "Invalid id!" });
    } else {
        axios({
            method,
            url,
            crossdomain,
            data: { id },
        }).then(response => {
            this.setState({ message: response.data.message });
            if (response.status === 200) {
                this.displayTodos()
            }
        })
            .catch(function (error) {
                console.log(error)
            });
    }
}

render() {

    const { todo, todoAdd, items, selected } = this.state;

    const List =

        (
            <ul>
                {items.map((item, index) => <div key={index}>  {selected === item.id ?
                    <li>
                        <form onSubmit={this.handleSubmitToEdit}>
                            <input id='id' defaultValue={item.id} hidden />
                            <input name='todo' placeholder='Todo' value={todo} onChange={this.handleChangeToEdit} />
                            <button >Edit</button> <button onClick={() => this.deleteTodo(item.id)} >Delete</button>
                        </form>
                    </li>
                    :
                    <li>{item.todo}<button onClick={() => this.openEditTodo(item.id, item.todo)} >Edit</button> <button onClick={() => this.deleteTodo(item.id)} >Delete</button></li>
                }
                </div>
                )}
            </ul>
        )


    return (
        <div>
            <h2>Add Todo</h2>
            <form onSubmit={this.handleSubmitToAdd}>
                <input name='todoAdd' placeholder='Todo' value={todoAdd} onChange={this.handleChangeToAdd} />
                <button>Add</button>
            </form>

            {List}
        </div>
    );
}
}

export default App;
