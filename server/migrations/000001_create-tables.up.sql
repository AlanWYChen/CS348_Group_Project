CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL
);