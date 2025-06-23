CREATE TABLE payment_methods (
                                 id SERIAL PRIMARY KEY,
                                 user_id BIGINT NOT NULL,
                                 type VARCHAR(10) NOT NULL,
                                 phone_number VARCHAR(20),
                                 network VARCHAR(20),
                                 name_on_card VARCHAR(100),
                                 card_number VARCHAR(20),
                                 expiration VARCHAR(10),
                                 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users(id)
);
