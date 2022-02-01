BEGIN;

-- Remove existing tables and repopulate db when script runs
DROP TABLE IF EXISTS users, posts, sessions CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    caption TEXT NOT NULL,
    img BYTEA,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);



INSERT INTO users (username, email, password) VALUES (
    'Grace Hopper',
    'gracehopper@gmail.com',
    'secretpassword'
);

INSERT INTO posts (caption, img, user_id)  VALUES (
    'Greatest post ever!!!!',
    '534543543',
    1
);

INSERT INTO sessions (sid, data) VALUES (
    'sghjgas56a4s653a',
    '{
        "name": "Grace Hopper",
        "email": "gracehopper@gmail.com"
    }'
);


COMMIT;