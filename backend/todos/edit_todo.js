/**
 * @author paiman <hub@paiman.id>
 *
 */

const { knex } = require('../db');

module.exports = {
    editTodo: async function (req, res) {
        try {
            let id = req.body.id;
            let todo = req.body.todo;
            if (typeof id !== 'number' && (id % 1) !== 0) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "[id] must has integer value."
                })
            } else if (typeof todo !== 'string') {
                res.status(400).json({
                    status: "Bad Request",
                    message: "[todo] must has string value."
                })
            } else {
                knex('todos').where({ id })
                    .update({ todo }).then(() => {
                        res.json({
                            status: "OK",
                            message: "Todo updated successfully."
                        })
                    })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: "Internal Server Error",
                message: "Failed to edit the todo.",
                error: e.toString()
            });
        }
    }
}