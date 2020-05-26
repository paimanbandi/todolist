/**
 * @author paiman <hub@paiman.id>
 *
 */

const { knex } = require('../db');

module.exports = {
    deleteTodo: async function (req, res) {
        try {
            let id = req.body.id;
            if (typeof id !== 'number' && (id % 1) !== 0) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "[id] must has integer value."
                })
            } else {
                knex('todos').where({ id })
                    .delete().then(() => {
                        res.json({
                            status: "OK",
                            message: "Todo deleted successfully."
                        })
                    })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: "Internal Server Error",
                message: "Failed to delete the todo.",
                error: e.toString()
            });
        }
    }
}