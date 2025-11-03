import { pool } from '../helpers/db.js'

const selectAllTasks = async (userEmail) => {
    return await pool.query(
        'SELECT * FROM task WHERE user_id = (SELECT id FROM account WHERE email = $1)',
        [userEmail]
    )
}

const insertTask = async (description, userEmail) => {
    return await pool.query(
        'INSERT INTO task (description, user_id) VALUES ($1, (SELECT id FROM account WHERE email = $2)) RETURNING *',
        [description, userEmail]
    )
}

const removeTask = async (id, userEmail) => {
    return await pool.query(
        'DELETE FROM task WHERE id = $1 AND user_id = (SELECT id FROM account WHERE email = $2)',
        [id, userEmail]
    )
}

export { selectAllTasks, insertTask, removeTask }
