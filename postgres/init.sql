/**
 * @author paiman <hub@paiman.id>
 *
 */
CREATE DATABASE todolist;
GRANT ALL PRIVILEGES ON DATABASE todolist TO paiman;
\c todolist;
CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    todo TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);