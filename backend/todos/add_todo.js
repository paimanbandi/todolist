/**
 * @author paiman <hub@paiman.id>
 *
 */

const { knex } = require('../db');

module.exports = {
    addTodo: async function (req, res) {
        try {
            let todo = req.body.todo;
            if(typeof todo !== 'string'){
                res.status(400).json({
                    status: "Bad Request",
                    message: "[todo] must has string value."
                })
            }else{
                knex('todos').insert({
                    todo
                }).then(() => {
                    res.status(201).json({
                        status: "Created",
                        message: "Todo added successfully."
                    });
                })
            }
        }catch(e){
            console.error(e)
            res.status(500).json({
                status: "Internal Server Error",
                message: "Failed to add the todo.",
                error: e.toString()
            });
        }
    }
}