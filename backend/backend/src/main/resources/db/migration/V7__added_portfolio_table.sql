CREATE TABLE portfolio (
                           id SERIAL PRIMARY KEY,
                           coin_id VARCHAR(100) NOT NULL,
                           amount NUMERIC(20, 8) NOT NULL DEFAULT 0.00000000,
                           user_id BIGINT NOT NULL,
                           CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);
