CREATE TYPE transaction_type_enum AS ENUM (
    'SEND', 'RECEIVE', 'DEPOSIT', 'WITHDRAW', 'BUY', 'SELL', 'CONVERT'
    );

CREATE TABLE transaction (
                             id SERIAL PRIMARY KEY,
                             user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             coin_id INTEGER NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
                             amount NUMERIC(20,8) NOT NULL,
                             details TEXT,
                             type transaction_type_enum NOT NULL,
                             timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
