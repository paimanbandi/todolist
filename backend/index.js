/**
 * @author paiman <hub@paiman.id>
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const addTodo = require('./todos/add_todo');
const editTodo = require('./todos/edit_todo');
const getTodo = require('./todos/get_todo');
const deleteTodo = require('./todos/delete_todo');
const displayTodos = require('./todos/display_todos');

app.post('/add-todo', async (req, res) => {
  addTodo.addTodo(req, res);
});

app.put('/edit-todo', async (req, res) => {
  editTodo.editTodo(req, res);
});

app.get('/get-todo', async (req, res) => {
  getTodo.getTodo(req, res);
});

app.delete('/delete-todo', async (req, res) => {
  deleteTodo.deleteTodo(req, res);
});

app.get('/display-todos', async (req, res) => {
  displayTodos.displayTodos(req, res);
});

const port = process.env.BE_PORT || 5001;
app.listen(port, () => console.log("todolist-backend running on port " + port));