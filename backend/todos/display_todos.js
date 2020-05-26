/**
 * @author paiman <hub@paiman.id>
 *
 */

const { knex } = require('../db');

module.exports = {
    displayTodos: async function (req, res) {
        try {
            knex('todos').select("*").orderBy("id", "asc").then((data) => {
                res.json({
                    status: "OK",
                    message: "Todos displayed successfully.",
                    data
                });
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: "Internal Server Error",
                message: "Failed to display todos.",
                error: e.toString()
            });
        }
    }
}