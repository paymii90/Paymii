-- V4__create_transaction_table.sql
CREATE TABLE transaction (

                             id BIGSERIAL PRIMARY KEY,
                             user_id BIGINT REFERENCES "user"(id),
                             coin_id VARCHAR(64) NOT NULL,
                             coin_symbol VARCHAR(16) NOT NULL,
                             coin_name VARCHAR(64) NOT NULL,
                             amount NUMERIC(18,8) NOT NULL,
                             price_at_transaction NUMERIC(18,8),
                             details VARCHAR(255),
                             type VARCHAR(16) NOT NULL,
                             timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
